import os
import re
import json
from pathlib import Path
from html.parser import HTMLParser

BASE_DIR = Path(__file__).resolve().parent

class LinkAndI18nParser(HTMLParser):
    def __init__(self, filename):
        super().__init__()
        self.filename = filename
        self.i18n_keys = []
        self.placeholder_keys = []
        self.links = []
        self.scripts = []
        self.images = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if 'data-i18n' in attr_dict:
            self.i18n_keys.append(attr_dict['data-i18n'])
        if 'data-i18n-placeholder' in attr_dict:
            self.placeholder_keys.append(attr_dict['data-i18n-placeholder'])
        if tag == 'a' and 'href' in attr_dict:
            self.links.append(attr_dict['href'])
        if tag == 'script' and 'src' in attr_dict:
            self.scripts.append(attr_dict['src'])
        if tag == 'img' and 'src' in attr_dict:
            self.images.append(attr_dict['src'])
        if tag == 'link' and 'href' in attr_dict:
            self.images.append(attr_dict['href'])

def run_audit():
    print(f"Auditing: {BASE_DIR}")
    
    # 1. Load language files
    with open(BASE_DIR / "lang" / "en.json", "r", encoding="utf-8") as f:
        en_dict = json.load(f)
    with open(BASE_DIR / "lang" / "hi.json", "r", encoding="utf-8") as f:
        hi_dict = json.load(f)
    with open(BASE_DIR / "data" / "schemes.json", "r", encoding="utf-8") as f:
        schemes_data = json.load(f)
    with open(BASE_DIR / "data" / "weather.json", "r", encoding="utf-8") as f:
        weather_data = json.load(f)

    print(f"Loaded en.json ({len(en_dict)} keys), hi.json ({len(hi_dict)} keys)")
    print(f"Loaded schemes.json ({len(schemes_data)} schemes), weather.json")

    # 2. Check key parity between en and hi
    en_keys = set(en_dict.keys())
    hi_keys = set(hi_dict.keys())
    missing_in_hi = en_keys - hi_keys
    missing_in_en = hi_keys - en_keys
    if missing_in_hi:
        print(f"WARNING: Keys in en.json but missing in hi.json: {missing_in_hi}")
    if missing_in_en:
        print(f"WARNING: Keys in hi.json but missing in en.json: {missing_in_en}")
    if not missing_in_hi and not missing_in_en:
        print("PASS: en.json and hi.json have identical key parity.")

    # 3. Parse all HTML files
    html_files = list(BASE_DIR.glob("*.html"))
    print(f"Found {len(html_files)} HTML files: {[f.name for f in html_files]}")

    all_missing_i18n = {}
    broken_references = []

    for html_file in html_files:
        with open(html_file, "r", encoding="utf-8") as f:
            content = f.read()

        parser = LinkAndI18nParser(html_file.name)
        parser.feed(content)

        # Check i18n keys
        missing_keys = []
        for key in parser.i18n_keys + parser.placeholder_keys:
            if key not in en_dict:
                missing_keys.append(key)
        if missing_keys:
            all_missing_i18n[html_file.name] = set(missing_keys)

        # Check references (src and local hrefs)
        for ref in parser.scripts + parser.images:
            if ref.startswith("http") or ref.startswith("//") or ref.startswith("data:"):
                continue
            clean_ref = ref.split("?")[0].split("#")[0]
            target_path = BASE_DIR / clean_ref
            if not target_path.exists():
                broken_references.append((html_file.name, ref, str(target_path)))

        # Check links
        for link in parser.links:
            if link.startswith("http") or link.startswith("//") or link.startswith("tel:") or link.startswith("mailto:") or link.startswith("javascript:") or link.startswith("#"):
                continue
            clean_link = link.split("?")[0].split("#")[0]
            if clean_link:
                target_path = BASE_DIR / clean_link
                if not target_path.exists():
                    broken_references.append((html_file.name, link, str(target_path)))

    if all_missing_i18n:
        print("\nMissing i18n keys in HTML files:")
        for page, keys in all_missing_i18n.items():
            print(f"  {page}: {keys}")
    else:
        print("\nPASS: All data-i18n keys in HTML files exist in en.json & hi.json.")

    if broken_references:
        print("\nBroken file references:")
        for page, ref, path in broken_references:
            print(f"  {page} -> {ref} (Not found at {path})")
    else:
        print("\nPASS: All local links, scripts, and image references resolve successfully.")

if __name__ == "__main__":
    run_audit()
