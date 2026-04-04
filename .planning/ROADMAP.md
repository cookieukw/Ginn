# Roadmap: Magic Jinn

## Overview
A jornada do Magic Jinn começa com a estruturação do conhecimento dos animais em uma matriz de probabilidade, seguida pela implementação do cérebro de entropia que escolhe as perguntas. Depois, daremos vida ao Jinn com uma interface moderna e falas em Português, culminando na integração final com o loop de jogo 10+5+5.

## Phases

- [x] **Phase 1: Fundação e Dados** - Setup do parser de animais e estrutura de dados. (completed 2026-04-04)
- [x] **Phase 2: Motor de Decisão** - Implementação do algoritmo de entropia e lógica de filtragem. (completed 2026-04-04)
- [x] **Phase 3: Shell da Interface** - Criação da estrutura HTML/CSS com Glassmorphism. (completed 2026-04-04)
- [x] **Phase 4: Personagem e Feedback** - Animações do Jinn e sistema de diálogos em Português. (completed 2026-04-04)
- [x] **Phase 5: Integração e Polimento** - Loop 10+5+5 completo e refinamentos visuais. (completed 2026-04-04)

## Phase Details

### Phase 1: Fundação e Dados
**Goal**: Carregar todos os animais e preparar o motor para consultas.
**Depends on**: Nothing
**Requirements**: CORE-01
**Success Criteria**:
  1. O sistema carrega `animals.json` sem erros.
  2. Todos os 22 atributos de cada animal são acessíveis programaticamente.
  3. Existe uma lista inicial de "Candidatos Ativos".
**Plans**: 1 plan

Plans:
- [x] 01-01: Implementar AnimalParser e DataStore.

### Phase 2: Motor de Decisão
**Goal**: O "cérebro" do Jinn escolhendo perguntas inteligentes.
**Depends on**: Phase 1
**Requirements**: CORE-02, CORE-03, CORE-04, GAME-01
**Success Criteria**:
  1. O sistema sugere a pergunta com maior ganho de informação primeiro.
  2. Responder "Sim" ou "Não" reduz a lista de candidatos corretamente.
  3. Respostas incertas ("Talvez") não eliminam animais, apenas reduzem seu peso.
**Plans**: 2 plans

Plans:
- [x] 02-01: Implementar algoritmo de Entropia (Shannon Entropy).
- [ ] 02-02: Implementar lógica de filtragem probabilística para incertezas.

### Phase 3: Shell da Interface
**Goal**: O esqueleto visual do jogo.
**Depends on**: Nothing (Paralelo à Phase 2)
**Requirements**: UI-01, UI-02
**Success Criteria**:
  1. O layout Glassmorphism é visível no browser.
  2. O design é responsivo em resoluções de desktop e mobile.
**Plans**: 1 plan

Plans:
- [x] 03-01: Criar index.html e base CSS (Glassmorphism design system).

### Phase 4: Personagem e Feedback
**Goal**: Dar alma ao Jinn.
**Depends on**: Phase 3
**Requirements**: CHAR-01, CHAR-02, CHAR-03, UI-03
**Success Criteria**:
  1. O personagem (Gato Jinn) está visível e possui animações de "respiração".
  2. Balões de fala aparecem em Português com transições suaves.
**Plans**: 2 plans

Plans:
- [x] 04-01: Implementar JinnView e animações CSS.
- [ ] 04-02: Implementar sistema de diálogos e internacionalização (PT).

### Phase 5: Integração e Polimento
**Goal**: O jogo completo e funcional.
**Depends on**: Phase 2, Phase 4
**Requirements**: GAME-02, GAME-03, GAME-04
**Success Criteria**:
  1. O loop 10+5+5 funciona de ponta a ponta.
  2. O Jinn adivinha corretamente animais comuns em menos de 10 perguntas.
  3. O jogo admite derrota com graciosidade após 3 palpites errados.
**Plans**: 1 plan

Plans:
- [x] 05-01: Integrar Motor, UI e Fluxo de Jogo Final.

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Fundação e Dados | 1/1 | Complete    | 2026-04-04 |
| 2. Motor de Decisão | 1/1 | Complete    | 2026-04-04 |
| 3. Shell da Interface | 1/1 | Complete    | 2026-04-04 |
| 4. Personagem e Feedback | 1/1 | Complete    | 2026-04-04 |
| 5. Integração e Polimento | 1/1 | Complete   | 2026-04-04 |

---
*Roadmap defined: 2026-04-03*
