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

1. **Send enquiry online** — **HIDDEN / BLOCKED** because real inbox delivery has not been verified. The public Web3Forms access key is configured but `CANTAX_WEB3FORMS_DELIVERY_VERIFIED = false` is the required safety gate. Enable only after actual inbox receipt and checking the intended destination. Free tier currently advertises 250 requests/month; conditions may change.
2. **Open email app** — constructs a `mailto:` draft; the visitor must still send it.
3. **Copy enquiry** — clipboard only.
4. **Download .txt** — local file only.

The web site itself has no server database or file-upload mechanism. Do not ask customers to submit proprietary CAD files or confidential designs via a public form. If real engineering work begins, establish a separate secure file exchange and confidentiality terms.

### One-time Web3Forms setup

1. The inbox owner goes to https://web3forms.com/ and requests a free access key for `cantaxengineering@gmail.com`. This requires a message sent to the inbox.
2. The public key is already in `site-config.js`; confirm the intended recipient email and verify that Web3Forms stores and actually forwards the trial request.
3. Perform a test using the provider's dashboard test facility with only fictional details. Check both Web3Forms submission records and actual receipt at cantaxengineering@gmail.com. **Do not enable the website button if no message arrives.**
4. Only after successful end-to-end delivery, set `CANTAX_WEB3FORMS_DELIVERY_VERIFIED = true`, deploy and do another live-website test. Confirm Spanish/EU legal notices and GDPR documentation.

Until tested, only the existing email-app link is known to open a draft successfully; no direct online delivery is guaranteed.

## Recommended no-cost business hosting

**GitHub Pages is for project/demo preview**, and GitHub prohibits using Pages as free hosting for operating a business.

For a real services-business site, deploy these same static files to **Cloudflare Pages Free** (not Workers Paid or a free trial). Cloudflare supports static asset requests free and without periodic manual renewal under its current plan terms.

After creating a Cloudflare account, choose:
```
Workers & Pages → Create → Pages → Connect to Git
Repository: aaronexposito0-creator/cantax-engineering-web
Production branch: main
Framework: None / static HTML
Build command: exit 0
Build output directory: . (repository root, where index.html exists)
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

## Engineering case study: CX-01 (Revision A)

- Public technical presentation: [CX-01](cx01.html)
- Technical source package: [projects/cx-01/](projects/cx-01/README.md)
- OpenSCAD configurable geometry, machine-readable DXF outlines, dimensional SVG reference, BOM and analytical geometry checks.
- Preliminary concept only: dimensions/geometric constraints are documented; physical clearance, structural loading, fabrication tolerances and prototype fit are **not tested or certified**.

## International account research

- Thirty initial accounts are recorded as **researched, not contacted** in Airtable base **CantaX Engineering | International Pipeline**.
- A broader original target shortlist is also in [business-development/international-targets.md](business-development/international-targets.md).
- No unsolicited messages, LinkedIn follows or claims of commercial clients have been made in this work session.

## Four independently inspectable portfolio demonstrations

- **CX-01**: [adjustable mounting fixture](cx01.html), OpenSCAD source + 2D DXF, geometry, reference drawing and BOM.
- **AX-02**: [two-rail screw-driven positioning concept](ax02.html), OpenSCAD model, ideal lead-screw kinematics, component list, JSON specification and consistency checks.
- **MX-03**: [marine pivoting instrument mount](mx03.html), OpenSCAD motion concept, kinematic envelope, part register and explicit marine design risks.
- **DT-04**: [working BOM Revision Auditor](bom-tool.html), local-only CSV comparison, readable JavaScript, sample datasets and unit tests. No network transmission from the tool.

These are independent demonstrations, not fabricated products, commercially commissioned designs, validated production drawings or engineering certifications. AX-02 and MX-03 geometry checks are **not** verification of loads, fatigue, clearances of real purchased components or tolerances.

## Go-to-market preparation

- [Deployment and legal readiness checklist](DEPLOYMENT.md).
- [International pipeline: 30 research targets](business-development/targets-30.csv).
- [Four-week controlled outreach plan](business-development/launch-plan.md).
- [Three human-review email templates and launch post](business-development/outreach-drafts.md).
- Airtable base **CantaX Engineering | International Pipeline** holds 30 distinct targets. **No outreach messages were sent** in this work session.

**Deployment note:** GitHub Pages has publishing build quotas and can serve stale site versions until processing catches up; only repository source code has been fully inspected, not every published page/browser path end to end.

## Fifth demonstration: TS-05 (20 October 2026)

- **[Try TS-05 Tolerance Stack-up Explorer](ts05.html)** — signed 1D dimension chain; exact worst-case interval; reproducible modelled uniform-error Monte Carlo simulation; histogram and CSV export.
- **[Technical method and exclusions](projects/ts-05/README.md)** · **[Logic tests](projects/ts-05/tests.js)** · **[Source JavaScript](ts05.js)**.
- A GitHub Actions workflow in [engineering-qa.yml](.github/workflows/engineering-qa.yml) tests TS-05, DT-04 and the three CAD verification scripts on pushes. Its 20 October 2026 run completed successfully.
- TS-05 is an independent interactive study, **not a validated manufacturing/process-capability report**.

## First five account-specific B2B approaches (unsent)

- [Targeted technical pilot offers, evidence links and three personalized email drafts](business-development/priority-5-outreach-2026-10-20.md).
- Airtable now records public business email, source URL, small prospective pilot scope and contact-compliance gate on the five first-pass accounts.
- The linked Gmail account is personal rather than the intended CantaX business sender. No email has been sent. These drafts remain in repository text until appropriate business account, legal channel and buyer relevance are reviewed.

### Commercial launch blockers remain

GitHub Pages is only the temporary **technical portfolio preview**, not the business hosting solution. Choose approved commercial hosting and review relevant legal/privacy notices before treating it as an operating business website. Also test the intended recipient of the Web3Forms enquiry flow end-to-end before enabling direct submissions; the delivery gate intentionally stays false. Confirm applicable tax/invoicing and contract terms before paid work.
