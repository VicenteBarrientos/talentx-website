/**
 * Refreshes the portfolio project screenshots in public/images/projects/.
 *
 *   npm run shots
 *
 * Drives an already-installed Chrome through puppeteer-core, so nothing large
 * is downloaded. Override the binary with CHROME_PATH if yours lives elsewhere.
 *
 * Screenshots go stale as the products change — rerun this rather than
 * hand-editing images, and keep the frame sizes here so every card matches.
 */
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "projects");

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].filter(Boolean);

// 16:10 keeps every card's aspect box identical. Mapulengua is mobile-first, so
// it gets a squarer frame and is cropped to 16:10 by the card's object-cover.
const TARGETS = [
  { id: "fundosmart", url: "https://fundosmart.com/" },
  { id: "condosync", url: "https://www.condosync.cl" },
  { id: "talentx", url: "https://talentxrecruiting.com/" },
  { id: "resumex", url: "https://resumex.talentxrecruiting.com" },
  { id: "osornofactory", url: "https://osorno-ai-forge.vercel.app/" },
  { id: "mapulengua", url: "https://mapulengua.vercel.app/", width: 900, height: 900 },
];

const executablePath = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));

if (!executablePath) {
  console.error("No Chrome found. Set CHROME_PATH to your Chrome binary.");
  process.exit(1);
}

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--hide-scrollbars"],
});

let failed = 0;

for (const target of TARGETS) {
  const page = await browser.newPage();
  // dpr 1 on purpose: the card renders these ~640px wide, so a 1440px capture is
  // already ~2x there. Capturing at dpr 2 quadruples the bytes for no visible gain.
  await page.setViewport({
    width: target.width ?? 1440,
    height: target.height ?? 900,
    deviceScaleFactor: 1,
  });

  try {
    const response = await page.goto(target.url, { waitUntil: "networkidle2", timeout: 60_000 });
    const status = response?.status() ?? 0;

    // Never overwrite a good screenshot with an error page. A down site would
    // otherwise be captured and committed as if it were the product.
    if (status < 200 || status >= 300) {
      failed += 1;
      console.error(`${target.id.padEnd(14)} ${status}  kept the existing image`);
      await page.close();
      continue;
    }

    // Let fonts, hero imagery and entrance animations settle before capturing.
    await new Promise((resolve) => setTimeout(resolve, 3500));
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((resolve) => setTimeout(resolve, 600));
    await page.screenshot({ path: join(OUT, `${target.id}.webp`), type: "webp", quality: 78 });
    console.log(`${target.id.padEnd(14)} ${status}`);
  } catch (error) {
    failed += 1;
    console.error(`${target.id.padEnd(14)} FAILED  ${error.message}  kept the existing image`);
  }

  await page.close();
}

await browser.close();
process.exit(failed > 0 ? 1 : 0);
