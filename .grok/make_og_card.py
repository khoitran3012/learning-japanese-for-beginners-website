#!/usr/bin/env python3
"""Akari OG share card: exact gothic 明 + title lockup on washi paper."""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path("/workspace/.grok")
FONTS = ROOT / "fonts"
OUT = ROOT / "og-card-raw.png"

PAPER = (244, 239, 230)  # #f4efe6
INK = (28, 25, 23)  # #1c1917
NAVY = (47, 65, 88)  # #2f4158
SEAL = (143, 58, 50)  # #8f3a32
W, H = 1200, 630


def load_jp(size: int, weight: str = "Bold") -> ImageFont.FreeTypeFont:
    if weight == "Bold":
        path = FONTS / "NotoSansJP-Bold.otf"
    else:
        path = FONTS / "NotoSansJP-Regular.otf"
    return ImageFont.truetype(str(path), size)


def load_vi(size: int, medium: bool = True) -> ImageFont.FreeTypeFont:
    name = "BeVietnamPro-Medium.ttf" if medium else "BeVietnamPro-Regular.ttf"
    return ImageFont.truetype(str(FONTS / name), size)


def washi(w: int, h: int, seed: int = 26126) -> Image.Image:
    rng = np.random.default_rng(seed)
    yy, xx = np.indices((h, w))
    blotch = (
        5.0 * np.sin(xx / 210.0 + 0.4)
        + 4.0 * np.sin(yy / 95.0)
        + 3.0 * np.sin((xx * 0.7 + yy) / 160.0)
        + 2.2 * np.sin(xx / 55.0 + yy / 80.0)
    )
    noise = rng.normal(0, 4.2, (h, w, 3))
    # slightly warmer in the corners
    vignette = ((xx - w / 2) / (w / 1.2)) ** 2 + ((yy - h / 2) / (h / 1.15)) ** 2
    base = np.array(PAPER, dtype=np.float32)
    rgb = base + blotch[:, :, None] + noise - vignette[:, :, None] * 7.0
    rgb = np.clip(rgb, 0, 255).astype(np.uint8)
    im = Image.fromarray(rgb, "RGB").convert("RGBA")
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for _ in range(1400):
        x = int(rng.integers(0, w))
        y = int(rng.integers(0, h))
        length = float(rng.uniform(10, 48))
        angle = float(rng.normal(0.05, 0.28))
        x2 = x + int(length * math.cos(angle))
        y2 = y + int(length * math.sin(angle))
        shade = int(rng.integers(168, 214))
        a = int(rng.integers(14, 38))
        d.line((x, y, x2, y2), fill=(shade - 8, shade - 18, shade - 32, a), width=1)
    # a few longer darker fibers
    for _ in range(80):
        x = int(rng.integers(0, w))
        y = int(rng.integers(0, h))
        length = float(rng.uniform(40, 110))
        angle = float(rng.uniform(-0.2, 0.25))
        x2 = x + int(length * math.cos(angle))
        y2 = y + int(length * math.sin(angle))
        d.line((x, y, x2, y2), fill=(196, 184, 168, 28), width=1)
    im = Image.alpha_composite(im, overlay).convert("RGB")
    return im.filter(ImageFilter.GaussianBlur(radius=0.4))


def center_text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[float, float],
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
) -> tuple[int, int, int, int]:
    x, y = xy
    bbox = draw.textbbox((0, 0), text, font=font, anchor="lt")
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pos = (x - tw / 2 - bbox[0], y - th / 2 - bbox[1])
    draw.text(pos, text, font=font, fill=fill)
    return (int(pos[0]), int(pos[1]), int(pos[0] + tw), int(pos[1] + th))


def draw_tracked(
    draw: ImageDraw.ImageDraw,
    cx: float,
    cy: float,
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
    tracking: float = 4,
) -> tuple[int, int, int, int]:
    widths: list[int] = []
    bboxes = []
    for ch in text:
        bb = draw.textbbox((0, 0), ch, font=font, anchor="lt")
        bboxes.append(bb)
        widths.append(bb[2] - bb[0])
    total = sum(widths) + tracking * (len(text) - 1)
    x = cx - total / 2
    top = 10**9
    bottom = 0
    for ch, w, bb in zip(text, widths, bboxes):
        th = bb[3] - bb[1]
        pos = (x - bb[0], cy - th / 2 - bb[1])
        draw.text(pos, ch, font=font, fill=fill)
        top = min(top, pos[1])
        bottom = max(bottom, pos[1] + th)
        x += w + tracking
    return (int(cx - total / 2), int(top), int(cx + total / 2), int(bottom))


def draw_hanko(base: Image.Image, cx: int, cy: int, size: int = 72) -> None:
    tile = Image.new("RGBA", (size + 8, size + 8), (0, 0, 0, 0))
    d = ImageDraw.Draw(tile)
    pad = 4
    d.ellipse((pad, pad, pad + size, pad + size), outline=SEAL + (235,), width=4)
    d.ellipse((pad + 6, pad + 6, pad + size - 6, pad + size - 6), outline=SEAL + (180,), width=1)
    font = load_jp(int(size * 0.52), "Bold")
    # 学 — learn
    bbox = d.textbbox((0, 0), "学", font=font, anchor="lt")
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (tile.width - tw) / 2 - bbox[0]
    ty = (tile.height - th) / 2 - bbox[1] + 1
    d.text((tx, ty), "学", font=font, fill=SEAL + (235,))
    rotated = tile.rotate(14, resample=Image.Resampling.BICUBIC, expand=True)
    px = cx - rotated.width // 2
    py = cy - rotated.height // 2
    base.paste(rotated, (px, py), rotated)


def draw_corners(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], arm: int = 18) -> None:
    x0, y0, x1, y1 = box
    w = 3
    # seal-red corner brackets
    for (x, y, dx, dy) in (
        (x0, y0, 1, 1),
        (x1, y0, -1, 1),
        (x0, y1, 1, -1),
        (x1, y1, -1, -1),
    ):
        draw.line((x, y, x + dx * arm, y), fill=SEAL, width=w)
        draw.line((x, y, x, y + dy * arm), fill=SEAL, width=w)


def compose() -> Image.Image:
    im = washi(W, H)
    draw = ImageDraw.Draw(im)

    outer = (36, 28, W - 37, H - 29)
    inner = (48, 40, W - 49, H - 41)
    draw.rectangle(outer, outline=NAVY, width=2)
    draw.rectangle(inner, outline=NAVY, width=1)
    draw_corners(draw, (inner[0] + 10, inner[1] + 10, inner[2] - 10, inner[3] - 10), arm=16)

    kanji_font = load_jp(248, "Bold")
    name_font = load_jp(56, "Bold")
    sub_font = load_vi(26, medium=True)

    # Measure lockup
    tmp = ImageDraw.Draw(Image.new("RGB", (1, 1)))
    k_bb = tmp.textbbox((0, 0), "明", font=kanji_font)
    n_bb = tmp.textbbox((0, 0), "Akari", font=name_font)
    s_bb = tmp.textbbox((0, 0), "Học tiếng Nhật từ số 0", font=sub_font)
    k_h = k_bb[3] - k_bb[1]
    n_h = n_bb[3] - n_bb[1]
    s_h = s_bb[3] - s_bb[1]
    rule_h = 2
    gap_k_rule = 18
    gap_rule_name = 18
    gap_name_sub = 14
    lock_h = k_h + gap_k_rule + rule_h + gap_rule_name + n_h + gap_name_sub + s_h
    top = int((H - lock_h) / 2) - 6

    cx = W / 2
    ky = top + k_h / 2
    kbox = center_text(draw, (cx, ky), "明", kanji_font, NAVY)

    rule_y = kbox[3] + gap_k_rule
    rule_w = 220
    draw.line((cx - rule_w / 2, rule_y, cx + rule_w / 2, rule_y), fill=NAVY, width=2)
    # small seal-red ticks on the rule
    draw.rectangle((cx - 5, rule_y - 4, cx + 5, rule_y + 5), fill=SEAL)

    ny = rule_y + gap_rule_name + n_h / 2 + 2
    nbox = draw_tracked(draw, cx, ny, "Akari", name_font, NAVY, tracking=5)

    sy = nbox[3] + gap_name_sub + s_h / 2 + 2
    center_text(draw, (cx, sy), "Học tiếng Nhật từ số 0", sub_font, INK)

    # Hanko to the right of 明, still inside the centered lockup
    draw_hanko(im, int(kbox[2] + 86), int((kbox[1] + kbox[3]) / 2) + 6, size=62)

    return im.convert("RGB")


def main() -> None:
    im = compose()
    assert im.size == (W, H)
    im.save(OUT, "PNG")
    print(f"wrote {OUT} {im.size}")


if __name__ == "__main__":
    main()
