---
phase: 2
plan: 1
subsystem: Decision Engine
tags: [entropy, game-loop, pt-br]
requires: [DataManager, DataStore]
provides: [DecisionEngine, GameController, DialogueManager]
tech-stack:
  added: [Shannon Entropy Ranking]
  patterns: [State Machine for Game Loop, Relevance-weighted IG]
key-files:
  created: [DecisionEngine.js, GameController.js, DialogueManager.js, test-engine.js]
key-decisions:
  - "Implementação de pesos de relevância (0.1) para atributos técnicos como Fórmula Dental."
  - "Tratamento de 'Não Sei' como ignorador de feature, sem filtrar animais."
  - "Lógica 10+5+5 fixada no GameController."
requirements-completed: [CORE-02, CORE-03, CORE-04, GAME-01]
duration: 25 min
completed: 2026-04-03
---

# Phase 2 Plan 1: Motor de Decisão Summary

O "cérebro" do Magic Jinn foi implementado com sucesso. O motor utiliza Entropia de Shannon ponderada por uma heurística de relevância para escolher perguntas em português que não sejam técnicas demais para o usuário médio.

## O que foi construído
- **DecisionEngine**: Coração estatístico que ranqueia 184 features binárias por ganho de informação, priorizando o que é visual e comum (Tamanho, Dieta) sobre o técnico (Fórmula Dental).
- **GameController**: Gerenciador do fluxo de jogo que controla a contagem de perguntas e dispara palpites nos marcos de 10, 15 e 20 perguntas.
- **DialogueManager**: Central de mensagens em PT-BR com tom desafiador e informal, traduzindo chaves técnicas em perguntas amigáveis.
- **test-engine.js**: Suite de testes que simula uma rodada completa de jogo.

## Desvios do Plano
- **Heurística de Peso**: Em vez de apenas uma lista de exclusão, implementei um sistema de pesos (0.1 a 1.0) para permitir que perguntas técnicas apareçam apenas se forem as *únicas* que restam para diferenciar animais muito parecidos.

## Próximos Passos
- **Phase 3**: Shell da Interface - Criar a moldura visual Glassmorphism para abrigar o Jinn.

## Self-Check: PASSED
