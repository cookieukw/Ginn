# Phase 2: Motor de Decisão - Context

**Gathered:** 2026-04-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Esta fase entrega a inteligência lógica do jogo, incluindo a escolha de perguntas baseada em entropia e o controle do fluxo de jogo (vencedor/derrota) em Português.

</domain>

<decisions>
## Implementation Decisions

### Motor de Decisão (Core Logic)
- **Heurística de Perguntas**: O algoritmo deve evitar perguntas "técnicas demais" (ex: Fórmula Dental, Estratégia Reprodutiva) no início do jogo. Essas perguntas devem ter um peso reduzido ou ser usadas apenas como desempate final.
- **Simplificação de Respostas**: Removida a opção "Talvez". As opções válidas são: **Sim**, **Não** e **Não Sei**.
- **Tratamento do "Não Sei"**: Se o usuário responder "Não Sei", o algoritmo deve simplesmente ignorar esse atributo para o cálculo atual e passar para a próxima melhor pergunta, mantendo o pool de candidatos intacto.

### Fluxo de Jogo (Game Loop)
- **10+5+5 Structure**: 
  - Após 10 perguntas: Primeiro palpite.
  - Se errado: +5 perguntas e Segundo palpite.
  - Se errado: +5 perguntas e Terceiro palpite final.
- **Transições**: O Jinn deve usar frases desafiadoras para anunciar os palpites (ex: "Hum... sinto que você está pensando em um... [Animal]! Acertei?").

### Tom de Voz e Persona
- **Estilo**: Desafiador e informal. O Jinn deve parecer confiante e um pouco travesso, mas sem ser rude.
- **Idioma**: Português Brasileiro (PT-BR).

### the agent's Discretion
- **D-01**: A implementação exata do cálculo de ganho de informação (Shannon Entropy).
- **D-02**: As frases randômicas do Jinn para manter a experiência variada.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- [.planning/PROJECT.md](file:///home/cookie/Documents/Projetos/Ginn/.planning/PROJECT.md) — Visão geral e requisitos CORE.
- [.planning/REQUIREMENTS.md](file:///home/cookie/Documents/Projetos/Ginn/.planning/REQUIREMENTS.md) — IDs CORE-02, CORE-03, CORE-04, GAME-01.

### Data Contracts
- [DataManager.js](file:///home/cookie/Documents/Projetos/Ginn/DataManager.js) — Estrutura de features binárias geradas.
- [DataStore.js](file:///home/cookie/Documents/Projetos/Ginn/DataStore.js) — Lógica de filtragem de candidatos.

</canonical_refs>

<specifics>
## Specific Ideas
- **Blacklist de Atributos**: Criar uma lista de atributos "técnicos" que são ignorados ou penalizados no cálculo da melhor pergunta se houverem alternativas melhores.

</specifics>

<deferred>
## Deferred Ideas
- **Aprendizado**: Ensinar novos animais ao Jinn se ele perder 3 vezes (v2).
- **Ranking**: Sistema de pontuação baseado na rapidez da adivinhação.

</deferred>

---

*Phase: 02-motor-de-decis-o*
*Context gathered: 2026-04-03*
