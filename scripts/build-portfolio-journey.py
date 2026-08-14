from __future__ import annotations

import argparse
import hashlib
import os
import tempfile
from fractions import Fraction
from pathlib import Path

import av
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]

TRAVERSAL_SIZE = (1280, 720)
TRAVERSAL_FPS = 12
TRAVERSAL_CRF = 23

JOURNEY_SIZE = (960, 540)
JOURNEY_WEBP_QUALITY = 66

AMBIENT_SIZE = (1024, 576)
AMBIENT_FPS = 24
AMBIENT_SECONDS = 5
AMBIENT_CROSSFADE_SECONDS = 1
AMBIENT_CRF = 29


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Build every matched TalentX portfolio journey asset from one "
            "source clip. Requires PyAV and Pillow."
        )
    )
    parser.add_argument("source", type=Path, help="Path to the source MP4")
    return parser.parse_args()


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest().upper()


def primary_video_stream(container: av.container.InputContainer) -> av.video.VideoStream:
    videos = [stream for stream in container.streams if stream.type == "video"]
    if not videos:
        raise RuntimeError("The source contains no video stream")

    # Generated MP4s can carry a single-frame MJPEG cover alongside the actual
    # H.264 movie. Duration in seconds plus frame count selects the movie stream.
    return max(
        videos,
        key=lambda stream: (
            float((stream.duration or 0) * stream.time_base),
            stream.frames or 0,
        ),
    )


def add_h264_stream(
    container: av.container.OutputContainer,
    *,
    size: tuple[int, int],
    fps: int,
    crf: int,
    keyint: int,
) -> av.video.VideoStream:
    stream = container.add_stream("libx264", rate=fps)
    stream.width, stream.height = size
    stream.pix_fmt = "yuv420p"
    stream.options = {
        "crf": str(crf),
        "preset": "slow",
        "profile": "main",
        "x264-params": f"keyint={keyint}:min-keyint={keyint}:scenecut=0",
    }
    return stream


def encode_image(
    image: Image.Image,
    *,
    stream: av.video.VideoStream,
    container: av.container.OutputContainer,
    index: int,
    fps: int,
) -> None:
    frame = av.VideoFrame.from_image(image)
    frame.pts = index
    # The MP4 muxer changes stream.time_base after the first packet. Input frame
    # timestamps must remain in the encoder's stable frame-rate time base.
    frame.time_base = Fraction(1, fps)
    for packet in stream.encode(frame):
        container.mux(packet)


def flush_stream(
    stream: av.video.VideoStream, container: av.container.OutputContainer
) -> None:
    for packet in stream.encode():
        container.mux(packet)


def eased_blend(start: Image.Image, end: Image.Image, progress: float) -> Image.Image:
    progress = max(0.0, min(1.0, progress))
    smooth = progress * progress * (3 - 2 * progress)
    return Image.blend(start, end, smooth)


def build(source: Path) -> dict[str, int | str | float]:
    source = source.resolve(strict=True)
    if source.suffix.lower() != ".mp4":
        raise ValueError(f"Expected an MP4 source, got {source.name}")

    videos_dir = ROOT / "public" / "videos"
    images_dir = ROOT / "public" / "images"
    journey_dir = images_dir / "journey"

    with tempfile.TemporaryDirectory(prefix=".journey-build-", dir=ROOT) as raw_temp:
        temp = Path(raw_temp)
        temp_frames = temp / "journey"
        temp_frames.mkdir()

        traversal_path = temp / "vicente-portfolio-traversal.mp4"
        ambient_path = temp / "vicente-portfolio-world.mp4"
        opening_path = temp / "vicente-portfolio-opening.webp"
        destination_path = temp / "vicente-portfolio-destination.webp"
        poster_path = temp / "vicente-portfolio-world.webp"

        first_image: Image.Image | None = None
        last_image: Image.Image | None = None
        ambient_frames: list[Image.Image] = []
        next_sample_time = Fraction(0, 1)
        sample_step = Fraction(1, TRAVERSAL_FPS)
        sample_index = 0

        with av.open(
            str(traversal_path), "w", options={"movflags": "+faststart"}
        ) as traversal_output:
            traversal_stream = add_h264_stream(
                traversal_output,
                size=TRAVERSAL_SIZE,
                fps=TRAVERSAL_FPS,
                crf=TRAVERSAL_CRF,
                # This is a regeneration master, not the served scrub surface.
                keyint=TRAVERSAL_FPS * 2,
            )

            with av.open(str(source)) as source_container:
                source_stream = primary_video_stream(source_container)
                for decoded in source_container.decode(source_stream):
                    if decoded.time is None or decoded.pts is None:
                        continue

                    frame_time = Fraction(decoded.pts) * decoded.time_base
                    image: Image.Image | None = None

                    if frame_time < AMBIENT_SECONDS:
                        image = decoded.to_image()
                        ambient_frames.append(
                            image.resize(AMBIENT_SIZE, Image.Resampling.LANCZOS)
                        )

                    if frame_time < next_sample_time:
                        continue

                    if image is None:
                        image = decoded.to_image()
                    traversal_image = image.resize(
                        TRAVERSAL_SIZE, Image.Resampling.LANCZOS
                    )
                    journey_image = image.resize(JOURNEY_SIZE, Image.Resampling.LANCZOS)

                    if first_image is None:
                        first_image = traversal_image.copy()
                    last_image = traversal_image.copy()

                    encode_image(
                        traversal_image,
                        stream=traversal_stream,
                        container=traversal_output,
                        index=sample_index,
                        fps=TRAVERSAL_FPS,
                    )
                    journey_image.save(
                        temp_frames / f"f_{sample_index + 1:03d}.webp",
                        "WEBP",
                        quality=JOURNEY_WEBP_QUALITY,
                        method=6,
                    )
                    sample_index += 1
                    next_sample_time += sample_step

            flush_stream(traversal_stream, traversal_output)

        if first_image is None or last_image is None or sample_index == 0:
            raise RuntimeError("No journey frames were decoded from the source")
        if len(ambient_frames) < AMBIENT_FPS * AMBIENT_SECONDS:
            raise RuntimeError(
                f"Source is too short for the {AMBIENT_SECONDS}s ambient loop"
            )

        # Keep exactly five seconds. The final second eases into the exact first
        # frame, eliminating the hard cut when the touch/fallback video repeats.
        ambient_frames = ambient_frames[: AMBIENT_FPS * AMBIENT_SECONDS]
        fade_frames = AMBIENT_FPS * AMBIENT_CROSSFADE_SECONDS
        fade_start = len(ambient_frames) - fade_frames
        for index in range(fade_start, len(ambient_frames)):
            progress = (index - fade_start) / max(1, fade_frames - 1)
            ambient_frames[index] = eased_blend(
                ambient_frames[index], ambient_frames[0], progress
            )

        with av.open(
            str(ambient_path), "w", options={"movflags": "+faststart"}
        ) as ambient_output:
            ambient_stream = add_h264_stream(
                ambient_output,
                size=AMBIENT_SIZE,
                fps=AMBIENT_FPS,
                crf=AMBIENT_CRF,
                keyint=AMBIENT_FPS * 2,
            )
            for index, image in enumerate(ambient_frames):
                encode_image(
                    image,
                    stream=ambient_stream,
                    container=ambient_output,
                    index=index,
                    fps=AMBIENT_FPS,
                )
            flush_stream(ambient_stream, ambient_output)

        first_image.save(opening_path, "WEBP", quality=88, method=6)
        first_image.save(poster_path, "WEBP", quality=84, method=6)
        last_image.save(destination_path, "WEBP", quality=88, method=6)

        replacements = {
            traversal_path: videos_dir / traversal_path.name,
            ambient_path: videos_dir / ambient_path.name,
            opening_path: images_dir / opening_path.name,
            destination_path: images_dir / destination_path.name,
            poster_path: images_dir / poster_path.name,
        }
        for built, destination in replacements.items():
            os.replace(built, destination)

        previous_frames = temp / "previous-journey"
        if journey_dir.exists():
            journey_dir.rename(previous_frames)
        try:
            temp_frames.rename(journey_dir)
        except Exception:
            if previous_frames.exists() and not journey_dir.exists():
                previous_frames.rename(journey_dir)
            raise

    frame_bytes = sum(path.stat().st_size for path in journey_dir.glob("f_*.webp"))
    traversal_output_path = videos_dir / "vicente-portfolio-traversal.mp4"
    ambient_output_path = videos_dir / "vicente-portfolio-world.mp4"
    return {
        "source": str(source),
        "source_sha256": sha256(source),
        "journey_frames": sample_index,
        "journey_fps": TRAVERSAL_FPS,
        "journey_duration_seconds": round((sample_index - 1) / TRAVERSAL_FPS, 3),
        "journey_frame_bytes": frame_bytes,
        "traversal_bytes": traversal_output_path.stat().st_size,
        "ambient_bytes": ambient_output_path.stat().st_size,
    }


def main() -> None:
    args = parse_args()
    summary = build(args.source)
    for key, value in summary.items():
        print(f"{key}: {value}")


if __name__ == "__main__":
    main()
