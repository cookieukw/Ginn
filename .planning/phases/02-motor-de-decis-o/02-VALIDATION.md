---
phase: 2
slug: motor-de-decis-o
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-03
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for the decision engine logic.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js Assert |
| **Config file** | none |
| **Quick run command** | `node test-engine.js` |
| **Full suite command** | `node test-engine.js` |
| **Estimated runtime** | ~2 seconds |

---

## Sampling Rate

- **After every task commit:** Run `node test-engine.js`
- **After every plan wave:** Run `node test-engine.js`
- **Before `/gsd-verify-work`:** Engine must reach 100% accuracy on mock data.

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | CORE-02 | unit | `node test-engine.js` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | CORE-03 | unit | `node test-engine.js` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 2 | GAME-01 | unit | `node test-engine.js` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `test-engine.js` — comprehensive test suite for entropy and game loop states.
- [ ] `mock-decisions.json` — edge cases for simulation.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Diálogo PT-BR | CORE-04 | Avaliar tom desafiador | Executar o motor e ler as mensagens impressas no console. |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
