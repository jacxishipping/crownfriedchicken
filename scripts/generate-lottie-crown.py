#!/usr/bin/env python3
"""Generate a standalone Lottie JSON of the Crown Fried Chicken crown-drawing
animation. Reusable in emails, socials, GIFs, etc.

Animation (33 frames @ 30fps = 1.1s, matching the HeroLoader's crown-draw timing):
  - Frame 0-33: outline crown path "draws" itself via trim-path start 0→100
  - Frame 27-33: base rectangle scaleX 0→1
  - Frame 36-42: jewels 1, 2, 3 scale 0→1 (staggered 6 frames apart)
  - Frame 45: hold final state
Total duration: ~1.5s, looping=false (one-shot intro animation).

Output: /home/z/my-project/download/crown-draw.json
"""
import json
from pathlib import Path

OUT = Path("/home/z/my-project/download/crown-draw.json")

# Crown path vertices (from public/crown.svg, viewBox 0 0 100 80):
# M6 22 L24 36 L34 8 L42 28 L50 4 L58 28 L66 8 L76 36 L94 22 L86 70 L14 70 Z
VERTICES = [
    (6, 22), (24, 36), (34, 8), (42, 28), (50, 4),
    (58, 28), (66, 8), (76, 36), (94, 22), (86, 70), (14, 70),
]
# Closed path (Z back to start)

# For straight-line segments, in/out tangents are zero vectors.
TANGENT_ZERO = [0, 0]


def make_vertex(x: float, y: float) -> dict:
    return {"i": TANGENT_ZERO, "o": TANGENT_ZERO, "v": [x, y]}


def make_path_shape() -> dict:
    """Single closed path covering the crown outline."""
    return {
        "ty": "sh",  # shape path
        "ks": {
            "a": 0,  # not animated
            "k": {
                "i": [TANGENT_ZERO for _ in VERTICES],  # in tangents
                "o": [TANGENT_ZERO for _ in VERTICES],  # out tangents
                "v": [[x, y] for x, y in VERTICES],     # vertices
                "c": True,                                # closed
            },
        },
        "nm": "Crown Path",
    }


def make_stroke() -> dict:
    """Red stroke, 3px wide, round caps and joins."""
    return {
        "ty": "st",  # stroke
        "c": {  # color — RGBA in 0..1. #C90012 = (201, 0, 18) / 255
            "a": 0,
            "k": [201 / 255, 0 / 255, 18 / 255, 1],
        },
        "o": {"a": 0, "k": 100},  # opacity
        "w": {"a": 0, "k": 3},     # width
        "lc": 2,                    # line cap: 2 = round
        "lj": 2,                    # line join: 2 = round
        "ml": 4,                    # miter limit
        "nm": "Crown Stroke",
    }


def make_trim() -> dict:
    """Trim path — animates the start from 0 to 100 over frames 0-33, drawing
    the crown outline progressively."""
    return {
        "ty": "tm",  # trim path
        # Start: animated 0 → 100 (the visible end sweeps across the path)
        "s": {
            "a": 1,  # animated
            "k": [
                {"t": 0,  "s": [0],   "i": {"x": [0.42], "y": [1]}, "o": {"x": [0.58], "y": [0]}},
                {"t": 33, "s": [100]},
            ],
        },
        # End: static at 100 (full path length)
        "e": {"a": 0, "k": 100},
        # Offset: static 0
        "o": {"a": 0, "k": 0},
        # Trim multiple shapes: 1 = simultaneously
        "m": 1,
        "nm": "Crown Trim",
    }


def make_transform(
    px: float = 0, py: float = 0,
    ax: float = 0, ay: float = 0,
    sx: float = 100, sy: float = 100,
    rotation: float = 0, opacity: int = 100,
) -> dict:
    """Group transform — all static by default."""
    return {
        "p": {"a": 0, "k": [px, py]},      # position
        "a": {"a": 0, "k": [ax, ay]},      # anchor
        "s": {"a": 0, "k": [sx, sy, 100]},  # scale (Z=100 for 2D)
        "r": {"a": 0, "k": rotation},        # rotation
        "o": {"a": 0, "k": opacity},        # opacity
    }


def make_crown_outline_layer() -> dict:
    """Shape layer with the crown outline + stroke + trim-path animator."""
    return {
        "ddd": 0,
        "ind": 1,  # layer index
        "ty": 4,   # 4 = shape layer
        "nm": "Crown Outline",
        "ks": make_transform(px=0, py=0, ax=0, ay=0, sx=100, sy=100),
        "shapes": [
            {
                "ty": "gr",  # group
                "nm": "Crown Outline Group",
                "it": [
                    make_path_shape(),
                    make_stroke(),
                    make_trim(),
                    # Group transform (required as last item in `it`)
                    {
                        "ty": "tr",
                        **make_transform(px=0, py=0, ax=0, ay=0, sx=100, sy=100),
                    },
                ],
            }
        ],
        "ip": 0,   # in point (frame)
        "op": 45,  # out point (frame)
        "st": 0,   # start time (frame)
        "bm": 0,   # blend mode: 0 = normal
    }


def make_base_rectangle_layer() -> dict:
    """The crown base rectangle (rect 14,70 → 86,76). Animated with scaleX 0→1
    starting at frame 27."""
    return {
        "ddd": 0,
        "ind": 2,
        "ty": 4,
        "nm": "Crown Base",
        "ks": {
            # Static transform — group transform handles the scale animation
            **make_transform(px=0, py=0, ax=0, ay=0, sx=100, sy=100),
            # Layer-level scale is animated (scaleX 0→100 over frames 27-33)
            "s": {
                "a": 1,
                "k": [
                    {"t": 27, "s": [0, 100, 100], "i": {"x": [0.42, 1, 1], "y": [1, 1, 1]}, "o": {"x": [0.58, 0, 0], "y": [0, 0, 0]}},
                    {"t": 33, "s": [100, 100, 100]},
                ],
            },
        },
        "shapes": [
            {
                "ty": "gr",
                "nm": "Crown Base Group",
                "it": [
                    {
                        "ty": "rc",  # rectangle
                        "p": {"a": 0, "k": [50, 73]},  # center (50,73)
                        "s": {"a": 0, "k": [72, 6]},    # size 72x6
                        "r": {"a": 0, "k": 0},            # corner radius
                        "nm": "Base Rect",
                    },
                    # Fill the base with the brand red (no stroke)
                    {
                        "ty": "fl",  # fill
                        "c": {"a": 0, "k": [201/255, 0, 18/255, 1]},
                        "o": {"a": 0, "k": 100},
                        "r": 1,  # fill rule: 1 = even-odd
                        "nm": "Base Fill",
                    },
                    # Group transform — anchor at rect center for the scale animation
                    {
                        "ty": "tr",
                        **make_transform(px=0, py=0, ax=50, ay=73, sx=100, sy=100),
                    },
                ],
            }
        ],
        "ip": 0,
        "op": 45,
        "st": 0,
        "bm": 0,
    }


def make_jewel_layer(ind: int, cx: float, cy: float, r: float, start_frame: int, nm: str) -> dict:
    """Small dark circle (jewel) that scales 0→1 over 6 frames starting at start_frame."""
    return {
        "ddd": 0,
        "ind": ind,
        "ty": 4,
        "nm": nm,
        "ks": {
            # Position the layer at the jewel center
            **make_transform(px=cx, py=cy, ax=0, ay=0, sx=100, sy=100),
            # Animate scale 0→100 over frames start_frame..start_frame+6
            "s": {
                "a": 1,
                "k": [
                    {"t": start_frame, "s": [0, 0, 100], "i": {"x": [0.42, 0.42, 1], "y": [1, 1, 1]}, "o": {"x": [0.58, 0.58, 0], "y": [0, 0, 0]}},
                    {"t": start_frame + 6, "s": [100, 100, 100]},
                ],
            },
        },
        "shapes": [
            {
                "ty": "gr",
                "nm": f"{nm} Group",
                "it": [
                    {
                        "ty": "el",  # ellipse
                        "p": {"a": 0, "k": [0, 0]},  # centered at the layer origin
                        "s": {"a": 0, "k": [r * 2, r * 2]},  # diameter
                        "nm": "Jewel Ellipse",
                    },
                    {
                        "ty": "fl",  # fill with dark color (#050505)
                        "c": {"a": 0, "k": [5/255, 5/255, 5/255, 1]},
                        "o": {"a": 0, "k": 100},
                        "r": 1,
                        "nm": "Jewel Fill",
                    },
                    {
                        "ty": "tr",
                        **make_transform(px=0, py=0, ax=0, ay=0, sx=100, sy=100),
                    },
                ],
            }
        ],
        "ip": 0,
        "op": 45,
        "st": 0,
        "bm": 0,
    }


def build_lottie() -> dict:
    """Compose the final Lottie animation JSON."""
    # Jewel positions from the original crown SVG.
    jewels = [
        (3, 50, 22, 3.4, 36, "Top Jewel"),
        (4, 26, 50, 3.2, 42, "Left Jewel"),
        (5, 74, 50, 3.2, 48, "Right Jewel"),
    ]
    jewel_layers = [
        make_jewel_layer(ind, cx, cy, r, start, nm)
        for ind, cx, cy, r, start, nm in jewels
    ]

    layers = [
        # Top-most layers first (Lottie draws bottom-up, so reverse):
        *jewel_layers[::-1],
        make_base_rectangle_layer(),
        make_crown_outline_layer(),
    ]

    return {
        "v": "5.7.4",  # Lottie schema version
        "fr": 30,      # framerate
        "ip": 0,        # in point
        "op": 45,      # out point (frame 45 = 1.5s)
        "w": 100,      # canvas width
        "h": 80,       # canvas height
        "nm": "Crown Fried Chicken — Crown Draw",
        "ddd": 0,      # not 3D
        "assets": [],  # no external assets
        "layers": layers,
        "meta": {
            "g": "Crown Fried Chicken",
            "a": "Crown Fried Chicken brand",
            "d": "Crown-drawing intro animation — reusable in emails/socials",
            "tc": "#C90012",
        },
    }


def main() -> int:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    data = build_lottie()
    OUT.write_text(json.dumps(data, indent=2), encoding="utf-8")
    size = OUT.stat().st_size
    print(f"Wrote {OUT} ({size:,} bytes, {len(data['layers'])} layers)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
