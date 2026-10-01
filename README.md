# GAPTHREAD

> **“Cross-Domain Performance Governance for Multi-Site Hospitality”**

GapThread is a UK-focused, API-first B2B SaaS performance-governance platform designed primarily for multi-site hospitality operators (such as QSR brands, fast-casual restaurants, coffee & bakery chains, casual dining groups, and franchise estates).

---

## Key Characteristics & Compliance Rules

1. **Frontend-Only**: No backend, no server-side database, no authentication, and no login/signup.
2. **Local Storage Persistence**: Pilot requests are stored directly in the browser's `localStorage` under the key:
   ```json
   "gapthreadPilotSubmissions"
   ```
   Submissions are appended as JSON objects without overwriting existing entries.
3. **No Fabricated Data**:
   - Zero invented customer logos, revenue statistics, or fake partnerships.
   - All operational walkthroughs are explicitly designated as illustrative examples.
   - Pricing tiers (Essentials, Growth, Enterprise) correspond directly to the business plan with no fabricated numerical £ amounts.
4. **Blank Favicon**: `<link rel="icon" href="data:,">` is used as instructed.
5. **British English**: Consistent UK spelling across the interface (*organisational, normalises, prioritise, behaviour, etc.*).
6. **No Vision or Mission Sections**: Focused exclusively on operational architecture, problem-to-solution governance, modules, and review rhythm.

---

## Core Operational Model: The Performance Thread

GapThread does not replace specialist tools for labour scheduling, inventory, EPOS, food safety, or guest feedback. It provides the connective governance layer above them:

$$\text{KPI} \longrightarrow \text{Target} \longrightarrow \text{Actual} \longrightarrow \text{Variance} \longrightarrow \text{Root Cause} \longrightarrow \text{Action} \longrightarrow \text{Owner} \longrightarrow \text{Deadline} \longrightarrow \text{Verification} \longrightarrow \text{Learning}$$

---

## File Structure

```
GAPTHREAD/
├── index.html            # Main semantic HTML5 landing page
├── css/
│   └── styles.css        # Enterprise design system (Navy, Slate, Amber, Responsive)
├── js/
│   └── app.js            # FAQ accordion, localStorage pilot form, modal & interactivity
├── server.js             # Optional zero-dependency static preview server
└── package.json          # Node scripts ("npm start")
```

---

## How to Run & View

### Option 1: Direct File Opening
Double click or open `index.html` directly in any modern web browser (`Chrome`, `Edge`, `Safari`, `Firefox`). Everything runs locally without a build step.

### Option 2: Local Static Server
If you have Node.js installed:
```bash
npm start
```
Then visit [http://localhost:3000](http://localhost:3000) in your web browser.

---

## Inspecting Stored Pilot Requests

1. Open the landing page.
2. Open your browser Developer Tools (`F12` or right click -> **Inspect**).
3. Navigate to **Application** -> **Storage** -> **Local Storage**.
4. Inspect the key `gapthreadPilotSubmissions`.
