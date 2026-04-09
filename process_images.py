import os
import re
import subprocess
import urllib.parse

cwd = '/Volumes/nashiro-001/2026-wedding/lp-project'

def make_thumb(filepath, max_size=800):
    dirname = os.path.dirname(filepath)
    basename = os.path.basename(filepath)
    name, ext = os.path.splitext(basename)
    thumb_name = f"{name}-thumb{ext}"
    thumb_path = os.path.join(dirname, thumb_name)
    
    if not os.path.exists(thumb_path) and os.path.exists(filepath):
        # sips -Z preserves aspect ratio and scales until largest dimension == max_size
        subprocess.run(['sips', '-Z', str(max_size), filepath, '--out', thumb_path], stdout=subprocess.DEVNULL)
        print(f"Created thumb: {thumb_name}")
    return thumb_name

# ----------- 1. PROCESS SCRIPT.JS -----------
js_path = os.path.join(cwd, 'script.js')
with open(js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

def js_repl(m):
    orig = m.group(1)
    name = m.group(2)
    # create thumb
    orig_path = os.path.join(cwd, urllib.parse.unquote(orig))
    if os.path.exists(orig_path):
        thumb_name = make_thumb(orig_path, 600)
    else:
        thumb_name = orig # fallback if file not found locally
    return f"{{ src: '{thumb_name}', highres: '{orig}', name: '{name}' }}"

# Replace object literals in arrays
js_content = re.sub(r"\{\s*src:\s*'([^']+)',\s*name:\s*'([^']+)'\s*\}", js_repl, js_content)

# Update renderGrid function
js_content = js_content.replace(
    '<img src="${encodeURIComponent(img.src)}" alt="${img.name}" loading="lazy">',
    '<img src="${encodeURIComponent(img.src)}" data-highres="${encodeURIComponent(img.highres || img.src)}" alt="${img.name}" loading="lazy">'
)

# Update lightbox click logic
js_content = js_content.replace(
    "const imgSrc = e.target.getAttribute('src');",
    "const imgSrc = e.target.getAttribute('data-highres') || e.target.getAttribute('src');"
)

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js_content)
    print("Updated script.js")

# ----------- 2. PROCESS INDEX.HTML -----------
html_path = os.path.join(cwd, 'index.html')
with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

def html_repl(m):
    full_match = m.group(0)
    img_src = m.group(1)
    
    # decode URL encoded filenames for filesystem path
    orig_path = os.path.join(cwd, urllib.parse.unquote(img_src))
    
    # Only process large images (skip svg, gif, etc and small images if wanted. Just process jpg/png)
    if os.path.exists(orig_path) and orig_path.lower().endswith(('.jpg', '.jpeg', '.png')):
        # Let's use 800px max for HTML images since some are hero/large sections
        thumb_name = make_thumb(orig_path, 800)
        # We need to URL encode the thumb name as well
        # Safest way: replace the basename in the src with the thumb
        thumb_src = urllib.parse.quote(thumb_name)
        
        # We want to add data-highres attribute instead of just replacing it,
        # but only if data-highres isn't already there.
        if 'data-highres=' not in full_match:
            # Inject data-highres right after src
            new_match = full_match.replace(f'src="{img_src}"', f'src="{thumb_src}" data-highres="{img_src}"')
            return new_match
    return full_match

html_content = re.sub(r'<img[^>]+src="([^"]+)"[^>]*>', html_repl, html_content)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_content)
    print("Updated index.html")
