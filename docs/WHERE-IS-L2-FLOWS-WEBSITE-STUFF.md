# L² Flows website — where everything is (for new chat)

**Copy the sections below into a new chat so it can find all L² Flows website–related files and context.**

---

## Website projects (this folder — on Desktop)

**Parent folder:** `/Users/lukakraljevic/Desktop/L2-Flows-Website/`

- **lsquaredflows-frontend/** — main React site (live + chatbot)
- **l2-flows-website/** — alternate vanilla site

---

## Main L² Flows website (live marketing site + chatbot)

**Path:** `lsquaredflows-frontend/` (inside L2-Flows-Website)
**Full path:** `/Users/lukakraljevic/Desktop/L2-Flows-Website/lsquaredflows-frontend/`

- **Tech:** React (Create React App), React Router, Framer Motion, react-icons  
- **Run:** `cd lsquaredflows-frontend && npm start` → http://localhost:3000  
- **Build:** `npm run build` → output in `build/`  
- **Own Git repo:** yes — push from inside this folder only  

**Important files and folders:**
- `src/App.js` — routes (home, privacy, terms)
- `src/NewHomePage.js` — main landing page + chatbot widget (webhook: lsquaredflows.app.n8n.cloud)
- `src/NewDesign.css` — main styles (L² Flows theme)
- `src/ChatbotTermsModal.js` + `ChatbotTermsModal.css` — chatbot terms
- `src/PrivacyPolicy.js`, `src/TermsOfService.js` — legal pages
- `src/logohere.png` — logo asset
- `src/background.png` — hero background
- `public/index.html` — HTML shell, meta, OG tags
- `public/manifest.json`, `public/robots.txt`, `public/logo192.png`, `public/logo512.png`
- `scripts/check-safe-push.sh` — pre-push guard
- `scripts/L2-FLOWS-TEASER-10-15s.md` — video teaser script (10–15 s)  
- `package.json` — deps and scripts (including `safe-push-check`)  
- `README.md` — CRA readme  

**Live site:** https://www.lsquaredflows.agency/  
**Chatbot webhook:** https://lsquaredflows.app.n8n.cloud/webhook/lsquared-chat  

---

## Alternate / older L² Flows website

**Path:** `l2-flows-website/` (inside L2-Flows-Website)
**Full path:** `/Users/lukakraljevic/Desktop/L2-Flows-Website/l2-flows-website/`

- **Tech:** Vanilla HTML/CSS/JS (no React)  
- **Key files:** `index.html`, `script.js`, `styles.css` at repo root; `src/`, `public/`  
- **Own Git repo:** yes  

Use this when the chat needs to compare or work on the non-React version.

---

## Root-level docs (still in CURRENT_FUTURE)

These stay in: `/Users/lukakraljevic/Desktop/work/LsquaredXXX/CURRENT_FUTURE/`

- `CHANGELOG.md` — L² Flows Customer Support Chatbot and website changes (CORS, webhook, n8n)
- `README.md` — CURRENT_FUTURE overview; L² Flows business, live projects, links
- `GITHUB-SAFE-PUSH.md` — push rules; lsquaredflows-frontend has its own repo (now in Desktop/L2-Flows-Website)
- `OWNERSHIP-AND-RULES.md` — mentions lsquaredflows-frontend in “no junk” rules

---

## L² Flows business and chatbot context (in CURRENT_FUTURE)

Path: `/Users/lukakraljevic/Desktop/work/LsquaredXXX/CURRENT_FUTURE/personal-ai-brain/`

- `personal-ai-brain/reference-library/l2-flows-complete-knowledge-base.md` — full product/pricing/sales knowledge
- `personal-ai-brain/reference-library/CONTEXT_GUIDE.md` — system context
- `personal-ai-brain/l2-flows-sales-materials/` — sales docs (EN/HR/ES)
- `personal-ai-brain/unified-intelligence/strategic-recommendations/l2-flows-pricing-sales-docs.md` — pricing and sales
- `personal-ai-brain/n8n-automation-specialist/production-systems/` — production workflows (including CS bot)

**n8n:** https://lsquaredflows.app.n8n.cloud  
**Customer Support Bot workflow:** webhook path `lsquared-chat`; CORS for https://www.lsquaredflows.agency  

---

## Quick search hints for the new chat

- **Website UI/copy:** search in `lsquaredflows-frontend/src/` (especially `NewHomePage.js`, `NewDesign.css`)
- **Chatbot logic and webhook:** `lsquaredflows-frontend/src/NewHomePage.js` (fetch to n8n webhook, terms modal)
- **Legal pages:** `lsquaredflows-frontend/src/PrivacyPolicy.js`, `TermsOfService.js`
- **Public assets:** `lsquaredflows-frontend/public/`
- **Teaser / video script:** `lsquaredflows-frontend/scripts/L2-FLOWS-TEASER-10-15s.md`
- **Changelog for website/chatbot:** root `CHANGELOG.md` and any notes in README
- **Pricing and positioning:** `personal-ai-brain/reference-library/l2-flows-complete-knowledge-base.md` and `l2-flows-pricing-sales-docs.md`

---

## One-line context you can paste

> L² Flows website: main app is in `Desktop/L2-Flows-Website/lsquaredflows-frontend/` (React). Alternate site in `Desktop/L2-Flows-Website/l2-flows-website/` (vanilla). Chatbot uses n8n webhook lsquared-chat at lsquaredflows.app.n8n.cloud. Business knowledge still in CURRENT_FUTURE: `personal-ai-brain/reference-library/l2-flows-complete-knowledge-base.md` and `personal-ai-brain/unified-intelligence/strategic-recommendations/l2-flows-pricing-sales-docs.md`. Root `CHANGELOG.md` and `README.md` in CURRENT_FUTURE have website/chatbot history. Website folder: `/Users/lukakraljevic/Desktop/L2-Flows-Website/`. CURRENT_FUTURE: `/Users/lukakraljevic/Desktop/work/LsquaredXXX/CURRENT_FUTURE/`.
