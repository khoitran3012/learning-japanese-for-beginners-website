#!/usr/bin/env python3
"""Raster PWA icons matching the geometric 明 favicon."""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path("/workspace/.grok")
NAVY = (47, 65, 88)
PAPER = (244, 239, 230)


def draw_mark(size: int) -> Image.Image:
    im = Image.new("RGB", (size, size), NAVY)
    d = ImageDraw.Draw(im)
    s = size / 32.0

    def rect(x, y, w, h, fill):
        d.rectangle(
            (round(x * s), round(y * s), round((x + w) * s) - 1, round((y + h) * s) - 1),
            fill=fill,
        )

    rect(4, 6, 10, 20, PAPER)
    rect(7, 9, 4, 5, NAVY)
    rect(7, 18, 4, 5, NAVY)
    rect(18, 6, 10, 20, PAPER)
    rect(21, 8, 4, 4, NAVY)
    rect(21, 14, 4, 4, NAVY)
    rect(21, 20, 4, 4, NAVY)
    return im


def main() -> None:
    for size, name in ((192, "icon-192.png"), (512, "icon-512.png"), (180, "apple-touch-icon.png")):
        im = draw_mark(size)
        path = ROOT / name
        im.save(path, "PNG", optimize=True)
        print(f"wrote {path} {im.size}")


if __name__ == "__main__":
    main()
