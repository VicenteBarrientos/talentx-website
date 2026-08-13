from __future__ import annotations

from pathlib import Path

import av
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "videos" / "vicente-portfolio-traversal.mp4"
OPENING = ROOT / "public" / "images" / "vicente-portfolio-opening.webp"
DESTINATION = ROOT / "public" / "images" / "vicente-portfolio-destination.webp"


def main() -> None:
    first_frame = None
    last_frame = None
    with av.open(str(SOURCE)) as container:
        stream = next(stream for stream in container.streams if stream.type == "video")
        for frame in container.decode(stream):
            if first_frame is None:
                first_frame = frame.to_image()
            last_frame = frame

    if first_frame is None or last_frame is None:
        raise RuntimeError(f"No video frames found in {SOURCE}")

    destination_image: Image.Image = last_frame.to_image()
    first_frame.save(OPENING, "WEBP", quality=88, method=6)
    destination_image.save(DESTINATION, "WEBP", quality=88, method=6)
    print(f"Wrote {OPENING} ({first_frame.width}x{first_frame.height})")
    print(f"Wrote {DESTINATION} ({destination_image.width}x{destination_image.height})")


if __name__ == "__main__":
    main()
