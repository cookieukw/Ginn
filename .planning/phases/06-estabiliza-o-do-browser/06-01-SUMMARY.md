---
phase: 6
plan: 1
subsystem: Browser Stability
tags: [vite, browser, node, dual-env, path]
requires: [DataManager, main.js]
provides: [DataManager.js, index.html, main.js]
tech-stack:
  added: [/* @vite-ignore */ dynamic imports]
  patterns: [Dual-Environment ESM Loading]
key-files:
  modified: [DataManager.js, index.html, main.js, test-parser.js, test-engine.js]
key-decisions:
  - "Uso de /* @vite-ignore */ para isolar o 'fs' do processo de build do Vite."
  - "Normalização de caminhos para caminhos relativos (sem '/') para maior compatibilidade com servidores estáticos."
  - "Conversão de todos os carregadores de dados para Async para suportar importações dinâmicas e fetch."
requirements-completed: [UI-01, UI-02, GAME-01]
duration: 10 min
completed: 2026-04-04
---

# Phase 6 Plan 1: Estabilização do Browser Summary

Corrigimos os erros de inicialização que impediam o Magic Jinn de rodar no navegador. O problema principal era a dependência direta do módulo `fs` do Node.js, que agora é carregado de forma preguiçosa e isolada do browser.

## O que foi construído
- **DataManager Env-Agnostic**: O carregador de dados agora detecta se está no Browser ou Node. No Browser, ele usa `fetch`; no Node, ele usa `fs` (via importação dinâmica ignorada pelo Vite).
- **Paths Corrigidos**: Mudamos de caminhos absolutos (`/animals.json`) para relativos (`animals.json`) para garantir que o Vite e outros servidores de arquivos sirvam os assets corretamente do diretório `public`.
- **Testes Sincronizados**: Atualizamos `test-parser.js` e `test-engine.js` para lidar com o novo paradigma assíncrono de carregamento de dados.

## Desvios do Plano
- **Vite Ignore**: Adicionamos explicitamente o comentário `/* @vite-ignore */` para evitar que o bundler tente resolver o módulo `fs` mesmo dentro de um bloco condicional, o que é necessário para ESM no browser.

## Próximos Passos
- **Project Stability**: O jogo agora deve carregar perfeitamente com `npm run dev`.

## Self-Check: PASSED
