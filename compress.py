from PIL import Image
import os

base = "E:\\个人网站\\pic"

photos = [
    "照片展示\\流星2.jpg",
    "照片展示\\流星1.jpg",
    "照片展示\\DSC09198-1.JPG",
    "照片展示\\DSC01708-1.JPG",
    "照片展示\\1780071501759.jpg",
    "照片展示\\mmexport1768918568845.jpg",
    "头像.jpg"
]

for relpath in photos:
    path = os.path.join(base, relpath)
    if not os.path.exists(path):
        print(f"SKIP: {relpath}")
        continue
    old = os.path.getsize(path)
    try:
        img = Image.open(path)
        w, h = img.size
        if max(w, h) > 2000:
            ratio = 2000 / max(w, h)
            img = img.resize((int(w*ratio), int(h*ratio)), Image.LANCZOS)
        img.save(path, "JPEG", quality=70, optimize=True, progressive=True)
        new = os.path.getsize(path)
        print(f"{relpath}: {old//1024}KB -> {new//1024}KB ({new*100//old}%)")
        img.close()
    except Exception as e:
        print(f"FAIL {relpath}: {e}")

# Compress memes over 500KB
print("\n--- 梗图 ---")
meme_dir = os.path.join(base, "梗图")
for f in os.listdir(meme_dir):
    path = os.path.join(meme_dir, f)
    if not os.path.isfile(path):
        continue
    size = os.path.getsize(path)
    if size < 500000:
        continue

    name, ext = os.path.splitext(f)
    ext = ext.lower()

    try:
        img = Image.open(path)
        w, h = img.size

        if ext in ('.jpg', '.jpeg', '.png', '.webp'):
            if max(w, h) > 1200:
                ratio = 1200 / max(w, h)
                img = img.resize((int(w*ratio), int(h*ratio)), Image.LANCZOS)

            if ext == '.png':
                # Convert PNG to JPEG
                outpath = os.path.join(meme_dir, name + ".jpg")
                if img.mode == 'RGBA':
                    img = img.convert('RGB')
                img.save(outpath, "JPEG", quality=70, optimize=True)
                if outpath != path:
                    os.remove(path)
                new = os.path.getsize(outpath)
            else:
                img.save(path, "JPEG", quality=70, optimize=True, progressive=True)
                new = os.path.getsize(path)

            print(f"{f}: {size//1024}KB -> {new//1024}KB")

        img.close()
    except Exception as e:
        print(f"SKIP {f}: {e}")

print("\nDone!")
