---
phase: 5
slug: integra-o-e-polimento
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-04
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for the game loop and final polish.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Visual Browser Check |
| **Config file** | none |
| **Quick run command** | `npm run dev` |
| **Full suite command** | Lighthouse performance audit |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After Guess UI (Yes/No buttons):** Functional check on click.
- **After 2nd & 3rd Guess logic:** Full loop walkthrough (manual).
- **After Loss screen:** Input field check.
- **Before Ship:** Final UI/UX review at 60fps.

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | GAME-02 | functional | (manual browser) | ❌ W0 | ⬜ pending |
| 05-01-02 | 01 | 1 | GAME-03 | functional | (manual browser) | ❌ W0 | ⬜ pending |
| 05-01-03 | 01 | 2 | GAME-04 | visual | (manual browser) | ❌ W0 | ⬜ pending |
| 05-01-04 | 01 | 3 | UI-03 | visual | (manual browser) | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `jinn_character_v2` (opcional: animação de vitória).
- [ ] `DialogueManager` final audit — checking all loss/win phrases.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Loop 10+5+5 | GAME-02/03 | Game feel | Simular 3 palpites errados seguidos. |
| Admissão de Derrota | GAME-04 | UX flow | Verificar se o Jinn pede o animal correto. |

---

## Validation Sign-Off

- [ ] All tasks have Wave 0 dependencies
- [ ] Sampling continuity: verified after every loop milestone
- [ ] Final UI audit covers all glassmorphism filters
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
