# CantaX Engineering — deployment checklist (zero-cost static hosting)

Last review: 2026-10-20.

## Current status

GitHub repository `main` contains a complete static website with concept case-study pages and an interactive BOM tool. GitHub Pages should be treated only as **project/portfolio preview**, not the primary hosting platform for commercial transactions. GitHub's published policy restricts use of Pages as free hosting for an online business.

**Commercial hosting migration is NOT YET COMPLETED.** The owner must authorize Cloudflare-to-GitHub repository access inside Cloudflare; no third-party account passwords are required by ChatGPT.

## Recommended Cloudflare Pages Free deployment

Use only the official dashboard at https://dash.cloudflare.com/.

1. Sign into the existing CantaX Cloudflare account.
2. Workers & Pages → Create application → Pages → **Import an existing Git repository**.
3. Grant Cloudflare access to exactly `aaronexposito0-creator/cantax-engineering-web`, not every repository unless deliberately intended.
4. Select repository and production branch `main`.
5. Framework: **None** (plain static HTML).
6. Build command: `exit 0` (Cloudflare's static-HTML documentation recommends this no-op).
7. Build output directory: `.` because `index.html` and other pages live at the repository root. Confirm the UI accepts current project-root notation; do not select a nonexistent `dist` folder.
8. Deploy with **Free** plan only; do not add a paid Workers/Pages plan or purchase a domain.
9. Test the resulting unique `*.pages.dev` site on desktop and mobile:
    - home, services, portfolio listing, CX-01, AX-02, MX-03, DT-04 tool, contact, legal, brief;
    - verify downloadable `.scad`, `.svg`, `.csv` assets;
    - test BOM compare and file export;
    - test direct mail link, confirm recipient;
    - verify the **unverified Web3Forms direct-send option remains hidden**.
10. When successful, update LinkedIn website URL and all outbound draft links to the new Cloudflare pages.dev URL; revise canonical/OG metadata then.
11. Validate actual legal provider identification, privacy/processor arrangements, cookie use, invoicing registration and engineering duty of care before accepting real paid work.

Cloudflare official guide: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/ . Free plan has build/file limits but supports simple static HTML sites.

## What has and hasn't been tested

Code-level audits completed in ChatGPT tools: source files exist in GitHub; JavaScript parse checks pass, nominal 2D kinematics tests pass, BOM import/compare/export unit scenarios pass, routes between main page and cases are present.

These are **not** a substitute for a browser/mobile QA run; the external page fetcher returned stale CX-01 content when checking newly added page URLs, so live Pages deployment remains unverified.

## Low-risk change publishing

```sh
git pull origin main
git status
```

Never commit client drawings, passwords or API secrets. Web3Forms browser-side public access key is intentionally public but must NOT be mistaken for the mailbox password. Avoid high commit frequency on GitHub Pages preview: the Pages default flow has a build soft limit and may show old content before publishing catches up.

## No irreversible action performed

No payments, company registration, domain purchase, Cloudflare account linking, LinkedIn messaging or cold email sends were done by this deployment documentation.
