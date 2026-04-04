---
phase: 3
slug: shell-da-interface
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-03
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for the UI shell.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Visual Browser Check |
| **Config file** | none |
| **Quick run command** | `npm run dev` |
| **Full suite command** | Lighthouse mobile report |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After layout creation:** Browser screenshot check
- **After glassmorphism implementation:** Browser screenshot check
- **Before Phase 4:** Responsive test at 375px (iPhone SE) and 1920px (Desktop).

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 0 | CORE | build | `ls package.json` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | UI-01 | visual | (manual screenshot) | ❌ W0 | ⬜ pending |
| 03-01-03 | 01 | 2 | UI-02 | visual | (manual screenshot) | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vite` setup — dev server working.
- [ ] ESM Refactor — current logic running in browser without errors.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Glass Effect | UI-01 | Visual feel | Abrir no Chrome e verificar desfoque do fundo. |
| Responsividade | UI-02 | Adaptação de tela | Usar DevTools (Device Toggle) para checar layout mobile. |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` or Wave 0 dependencies
- [ ] Sampling continuity: verified after every visual milestone
- [ ] Wave 0 covers ESM transition
- [ ] No watch-mode flags
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
