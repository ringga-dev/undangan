#!/usr/bin/env python3
"""Remove light/near-white background from decorative PNGs -> real alpha transparency.
Flood-fill from all edge pixels; any pixel within TOL color-distance of an already-cleared
edge pixel becomes transparent. Gold/colored decoration (far from light bg) is preserved."""
import sys
from PIL import Image
from collections import deque

TOL = 38  # color distance threshold (0-441). lower = stricter (keeps more decoration)

def dist(a, b):
    return ((a[0]-b[0])**2 + (a[1]-b[1])**2 + (a[2]-b[2])**2) ** 0.5

def clear(path):
    im = Image.open(path).convert('RGBA')
    w, h = im.size
    px = im.load()
    cleared = [[False]*w for _ in range(h)]
    q = deque()
    # seed: all edge pixels are background
    for x in range(w):
        for y in (0, h-1):
            if not cleared[y][x]:
                cleared[y][x] = True; q.append((x, y))
    for y in range(h):
        for x in (0, w-1):
            if not cleared[y][x]:
                cleared[y][x] = True; q.append((x, y))
    while q:
        x, y = q.popleft()
        for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
            nx, ny = x+dx, y+dy
            if 0 <= nx < w and 0 <= ny < h and not cleared[ny][nx]:
                if dist(px[x, y][:3], px[nx, ny][:3]) < TOL:
                    cleared[ny][nx] = True
                    q.append((nx, ny))
    # apply alpha
    out = im.copy()
    op = out.load()
    for y in range(h):
        for x in range(w):
            if cleared[y][x]:
                r, g, b, a = op[x, y]
                op[x, y] = (r, g, b, 0)
    out.save(path)
    # stats
    alpha = [op[x, y][3] for y in (0, h//2, h-1) for x in (0, w//2, w-1)]
    transp = sum(1 for a in alpha if a == 0)
    print(f"{path}: saved. sample alpha corners/center = {alpha} (transparent={transp}/{len(alpha)})")

if __name__ == '__main__':
    for p in sys.argv[1:]:
        clear(p)
