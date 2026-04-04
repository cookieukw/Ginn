# Requirements: Magic Jinn

**Defined:** 2026-04-03
**Core Value:** Um jogo de adivinhação de animais moderno e inteligente que desafia o usuário em Português.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### CORE: Motor de Adivinhação
- [x] **CORE-01**: O sistema deve carregar e indexar `animals.json` com sucesso.
- [x] **CORE-02**: O algoritmo deve calcular o ganho de informação (entropia) para cada característica.
- [x] **CORE-03**: O motor deve filtrar animais com base em respostas binárias ("Sim"/"Não").
- [x] **CORE-04**: O motor deve ajustar pesos probabilísticos para respostas incertas ("Talvez"/"Não sei").

### GAME: Loop e Estado
- [x] **GAME-01**: O jogo deve conduzir um loop inicial de exatamente 10 perguntas antes do 1º palpite.
- [x] **GAME-02**: Se o palpite estiver errado, o jogo deve adicionar +5 perguntas para um 2º palpite.
- [x] **GAME-03**: Se o 2º palpite estiver errado, o jogo deve adicionar +5 perguntas para um 3º palpite.
- [x] **GAME-04**: O jogo deve admitir derrota e solicitar o animal correto após 3 erros.

### UI: Interface Moderna
- [x] **UI-01**: A interface deve utilizar estética Glassmorphism (blur, transparência).
- [x] **UI-02**: O design deve ser responsivo e otimizado para web (mobile/desktop).
- [x] **UI-03**: Deve haver animações suaves de transição entre perguntas e palpites.

### CHAR: Personagem e Diálogo
- [x] **CHAR-01**: O personagem "Jinn" deve ser exibido visualmente com animações simples (idle/thinking).
- [x] **CHAR-02**: Todo o texto da interface e diálogos do Jinn devem estar em Português.
- [x] **CHAR-03**: O Jinn deve reagir com frases dinâmicas para manter o usuário engajado.

## v2 Requirements
Deferred to future release.

- **V2-01**: Sistema de "Aprendizado" persistente (salvar novos animais em um banco de dados).
- **V2-02**: Categorias adicionais (Objetos, Países, Personagens).
- **V2-03**: Dublagem de voz em Português.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Login de Usuário | Não é essencial para o valor central do jogo v1. |
| Ranking Global | Requer backend complexo, focado em experiência single-player. |
| Customização do Jinn | Deferir para v2 após validação do gameplay core. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CORE-01 | Phase 1 | Complete |
| CORE-02 | Phase 1 | Complete |
| CORE-03 | Phase 1 | Complete |
| CORE-04 | Phase 2 | Complete |
| GAME-01 | Phase 2 | Complete |
| GAME-02 | Phase 3 | Complete |
| GAME-03 | Phase 3 | Complete |
| GAME-04 | Phase 3 | Complete |
| UI-01 | Phase 4 | Complete |
| UI-02 | Phase 4 | Complete |
| UI-03 | Phase 4 | Complete |
| CHAR-01 | Phase 5 | Complete |
| CHAR-02 | Phase 5 | Complete |
| CHAR-03 | Phase 5 | Complete |

**Coverage:**
- v1 requirements: 14 total
- Mapped to phases: 14
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-03*
*Last updated: 2026-04-03 after initial definition*
