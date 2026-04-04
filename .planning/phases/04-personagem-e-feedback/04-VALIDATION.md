---
phase: 4
slug: personagem-e-feedback
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-03
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for the character visuals and game feedback.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Visual Browser Check |
| **Config file** | none |
| **Quick run command** | `npm run dev` |
| **Full suite command** | CSS Animation Performance check |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After Jinn image generation:** Visual confirm.
- **After idle animation:** Smoothness check (60fps).
- **After thinking animation:** Trigger check on answer click.
- **Before Phase 5:** Full dialogue loop visual walkthrough.

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 0 | CHAR-01 | asset | `ls jinn.png` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | CHAR-01 | visual | (manual confirm) | ❌ W0 | ⬜ pending |
| 04-01-03 | 01 | 2 | CHAR-03 | functional | `node test-engine.js` | ❌ W0 | ⬜ pending |
| 04-01-04 | 01 | 3 | UI-03 | performance | (manual browser) | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `jinn.png` — clear, high quality character with transparency.
- [ ] `DialogueManager` updated — dynamic reactions for correct/incorrect guess.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Animação Idle | CHAR-01 | Sensação de vida | Observar o Jinn por 10s e ver se a respiração parece natural. |
| Tom de Fala | CHAR-02 | Qualidade do PT-BR | Ler 5-10 balões de fala e avaliar o tom desafiador. |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` or Wave 0 dependencies
- [ ] Sampling continuity: verified visual feel after each update
- [ ] Wave 0 covers the character art asset
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
