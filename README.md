# CantaX Engineering

Independent mechanical-design and technical-documentation initiative based in Cantabria, Spain.

**Website preview:** https://aaronexposito0-creator.github.io/cantax-engineering-web/  
**LinkedIn:** https://www.linkedin.com/company/146767950/  
**Contact:** cantaxengineering@gmail.com

## What this repository contains

A responsive, dependency-free static website showcasing:

- Parametric CAD and mechanical design support
- Manufacturing drawings and technical documentation
- Bill of Materials and CAD revision workflows
- Technical project enquiry wizard

It is a developing **one-person independent initiative**, not an incorporated engineering company. Concept graphics and academic work must not be presented as completed customer contracts.

## Running locally

Open `index.html` in your browser or serve the directory using:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Enquiry delivery

The `brief.html` wizard offers four routes:

1. **Send enquiry online** — after the visitor reads and acknowledges the privacy notice, posts the project description and contact details to external relay **FormSubmit** using HTTPS. It sends the information to the public inbox above once the mailbox-owner has activated the endpoint via FormSubmit's confirmation email. **Activation and end-to-end mail delivery have not yet been verified**.
2. **Open email app** — constructs a `mailto:` draft; the visitor must still send it.
3. **Copy enquiry** — clipboard only.
4. **Download .txt** — local file only.

The web site itself has no server database or file-upload mechanism. Do not ask customers to submit proprietary CAD files or confidential designs via a public form. If real engineering work begins, establish a separate secure file exchange and confidentiality terms.

### One-time FormSubmit activation

Using **fictional nonconfidential** test data, go to `brief.html`, complete the wizard, acknowledge external processing and choose **Send enquiry online**. FormSubmit may present a CAPTCHA and will send an activation email to `cantaxengineering@gmail.com`. The mailbox owner must personally open and approve that confirmation message. **Then send a second test enquiry** and verify that it actually arrives.

If the activation email is missing, check Spam or contact FormSubmit support. Until that is complete, do not advertise online delivery as tested.

## Recommended no-cost business hosting

**GitHub Pages is for project/demo preview**, and GitHub prohibits using Pages as free hosting for operating a business.

For a real services-business site, deploy these same static files to **Cloudflare Pages Free** (not Workers Paid or a free trial). Cloudflare supports static asset requests free and without periodic manual renewal under its current plan terms.

After creating a Cloudflare account, choose:
```
Workers & Pages → Create → Pages → Connect to Git
Repository: aaronexposito0-creator/cantax-engineering-web
Production branch: main
Framework: None / static HTML
Build command: (leave blank)
Build output directory: /
```
Follow Cloudflare's current interface for any renamed fields. Once you have a new `*.pages.dev` URL, update LinkedIn and website canonical/share references as needed.

## Updating the site locally

```sh
git pull
# edit files...
git add .
git commit -m "Describe the website update"
git push
```

Do not commit secrets, API credentials, customer files or internal company drawings.

## Before accepting paid client work

- Confirm correct tax / self-employment classification and any professional authorization, insurance or registration required for the exact project.
- Finalize Spanish website legal identification and privacy disclosures.
- Confirm trademark/name availability.
- Publish **original, verifiable CAD portfolio files** and accurately distinguish demonstrations from customer work.
- Verify the end-to-end enquiry flow.

© 2026 CantaX Engineering — independent project.
