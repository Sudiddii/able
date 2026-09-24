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

## Enquiry delivery

The public forms send enquiries to the approved Able inbox through FormSubmit's HTTPS form relay. No mailbox password or API secret is stored in browser code.

- Homepage product, sourcing and manufacturing enquiries use the `TRADE` stream and an `[ABLE TRADE]` email subject.
- Commerce AI enquiries use the `TECH` stream and an `[ABLE TECH]` email subject.
- The floating Ask Able form routes by the selected topic. It defaults to `TECH` on the Commerce AI page and `TRADE` elsewhere.
- Every message includes the source path and URL, submission time, UTM attribution and all visitor-supplied fields.
- The first submission triggers a FormSubmit activation email to the destination inbox. Delivery must be confirmed once from that email.
- FormSubmit states that submissions may be retained for 30 days. Publish a privacy notice and retention statement before promoting the form widely.

If a first-party API or CRM replaces FormSubmit, keep the same `TRADE` / `TECH` routing fields and move the destination and credentials into server-side environment variables.

The macOS GitHub auto-sync LaunchAgent may be unloaded during local review so changes are not pushed before approval.
