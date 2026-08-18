#!/usr/bin/env python3
"""Remove light/low-saturation background from decorative PNGs -> real alpha.
A pixel is made transparent if it is bright AND low-saturation (i.e. white/grey background).
Gold/colored decoration (high saturation) is preserved regardless of brightness."""
import sys
from PIL import Image

SAT = 46      # max-min channel diff below this = "grey/white" -> clear (if also bright)
BRIGHT = 165  # max channel above this = bright enough to be background

def clear(path):
    im = Image.open(path).convert('RGBA')
    w, h = im.size
    px = im.load()
    out = im.copy()
    op = out.load()
    cleared = transp = 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = op[x, y]
            mn, mx = min(r, g, b), max(r, g, b)
            if mx > BRIGHT and (mx - mn) < SAT:
                op[x, y] = (r, g, b, 0)
                cleared += 1
            else:
                transp += 1
    out.save(path)
    print(f"{path}: transparent={cleared} opaque={transp} ({round(100*cleared/(w*h),1)}% cleared)")

if __name__ == '__main__':
    for p in sys.argv[1:]:
        clear(p)
