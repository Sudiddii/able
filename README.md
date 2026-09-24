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

A local launch agent runs `.automation/github-auto-sync.sh` every five minutes. It commits detected changes and pushes the active branch to GitHub using the macOS Keychain credential. Feature branches remain separate from `main` until they are reviewed and merged.

## Enquiry delivery configuration

The public forms currently prepare downloadable local briefs and do not transmit personal data. This is intentional until a secure destination is approved. A real submission path still requires:

- an approved destination email, CRM, or form endpoint;
- the server-side API URL and authentication/configuration method;
- confirmed reply-time wording;
- a published privacy notice and retention policy.

Do not add credentials to browser JavaScript. When a backend is supplied, both `#direction-form` and the floating Ask Able flow should use the same server-side adapter, validation and spam controls.

The macOS GitHub auto-sync LaunchAgent may be unloaded during local review so changes are not pushed before approval.
