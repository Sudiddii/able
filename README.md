# Able Trading website

This repository contains the production-ready static website for Able Trading.

- `index.html` — homepage
- `products.html` — product categories
- `manufacturing.html` — factory capabilities and history
- `commerce-ai.html` — Wayfound Commerce AI
- `assets/` — the single canonical asset library used by every page

Serve the repository root when previewing or publishing the site. Generated exports,
duplicate output folders and ZIP archives are intentionally excluded from Git.

## Automatic GitHub sync

A local launch agent runs `.automation/github-auto-sync.sh` every five minutes. It commits detected changes and pushes the active branch plus `main` to GitHub using the macOS Keychain credential.
