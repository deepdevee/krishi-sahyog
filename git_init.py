import os
from pathlib import Path
from dulwich import porcelain

repo_dir = Path(r"c:\Users\ddeep\Downloads\stitch_krishi_sahyog_farmer_platform\krishi-sahyog-frontend")

print(f"Initializing Git repository at {repo_dir}...")
# Initialize repo
repo = porcelain.init(str(repo_dir))

# Add all files (porcelain.add automatically respects files in working directory)
print("Adding files to index...")
porcelain.add(str(repo_dir))

# Commit
commit_msg = b"feat: initial commit for KRISHI Sahyog farmer platform frontend\n\n- Consolidated 14 Stitch exports into 9 clean HTML pages\n- Implemented single-language switcher (EN/HI) with Noto Sans Devanagari font\n- Offline PWA with Service Worker, Web Manifest, and local font/Tailwind assets\n- Interactive scheme directory, scheme detail, scam verifier, and weather advisories\n- Client-side mock data and login/OTP flows"

author = b"Antigravity Agent <agent@antigravity.ai>"
commit_id = porcelain.commit(str(repo_dir), message=commit_msg, author=author, committer=author)

print(f"Initial commit successfully created: {commit_id.decode('ascii')}")

# Verify status
status = porcelain.status(str(repo_dir))
print("Repository status:")
print(f"Staged: {status.staged}")
print(f"Untracked: {status.untracked}")
