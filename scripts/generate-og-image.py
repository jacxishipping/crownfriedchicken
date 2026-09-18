#!/usr/bin/env python3
"""Generate a branded 1200x630 OG/social share image for Crown Fried Chicken.

Loads /public/og-template.html via the running Next.js dev server, waits for
Google Fonts to fully load, then screenshots it as a 1200x630 PNG to
/public/og-share.png.
"""
import asyncio
import sys
from pathlib import Path

from playwright.async_api import async_playwright

OUT = Path("/home/z/my-project/public/og-share.png")
URL = "http://localhost:3000/og-template.html"
WIDTH, HEIGHT = 1200, 630


async def main() -> int:
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(
            viewport={"width": WIDTH, "height": HEIGHT},
            device_scale_factor=1,
        )
        page = await ctx.new_page()
        # Navigate and wait for fonts + images to fully load
        await page.goto(URL, wait_until="networkidle")
        # Give Google Fonts an extra beat to swap in
        await page.wait_for_function(
            "document.fonts && document.fonts.status === 'loaded'",
            timeout=15_000,
        )
        # Ensure all <img> finished decoding
        await page.evaluate(
            """() => Promise.all(
              [...document.images].map(img =>
                img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })
              )
            )"""
        )
        await page.wait_for_timeout(500)
        await page.screenshot(path=str(OUT), type="png", omit_background=False, clip={"x":0,"y":0,"width":WIDTH,"height":HEIGHT})
        await browser.close()
    size = OUT.stat().st_size
    print(f"Wrote {OUT} ({size:,} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
