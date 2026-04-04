# Magic Jinn: Animal Guessing Game

Um jogo de adivinhação de animais inspirado no brinquedo "Magic Jinn", onde um gato (ou outro personagem) tenta descobrir qual animal você está pensando através de perguntas estratégicas.

## Visão Geral

O jogo utiliza uma base de dados de animais (`animals.json`) e um algoritmo de árvore de decisão com probabilidade (estilo Akinator) para filtrar as opções conforme o usuário responde. O diferencial é a interface moderna com estética premium e a personalidade do personagem.

## Requisitos Core

### Validated
(Nenhum ainda — projeto em inicialização)

### Active
- [ ] **Mecânica de Adivinhação**: Algoritmo que escolhe a melhor pergunta baseada na redução de entropia (eliminando o maior número de animais).
- [ ] **Loop de Jogo (10+5+5)**:
    - 10 perguntas iniciais → 1º Palpite.
    - Se falhar: +5 perguntas → 2º Palpite.
    - Se falhar: +5 perguntas → 3º Palpite.
    - Se falhar: O jogo desiste e pergunta qual era o animal.
- [ ] **Interface Moderna**: Web app com Glassmorphism, animações sutis e paleta de cores harmoniosa.
- [ ] **Personagem Interativo**: Um gato (Jinn) que reage às respostas e conduz a conversa em Português.
- [ ] **Opções de Resposta**: "Sim", "Não", "Talvez", "Não sei".

### Out of Scope
- Backend complexo/Login de usuário (V1 será totalmente client-side).
- Edição da base de dados pelo usuário final (nesta fase).

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| **Plataforma Web (JS/CSS)** | Rapidez de desenvolvimento e facilidade de criar UIs "WOW" sem overhead. | — Pending |
| **Algoritmo de Entropia** | Garante que o jogo use o mínimo de perguntas possível para chegar ao resultado. | — Pending |
| **Idioma: Português** | Alinhado com a base de dados `animals.json` fornecida. | — Pending |

## Contexto Técnico

- **Knowledge Base**: `animals.json` (conferido, contém ~100 animais com 22 atributos cada).
- **Design System**: Foco em tons escuros e vibrantes (Dark Mode moderno) com efeitos de desfoque.

## Evolution
Este documento evolui nas transições de fase.

---
*Last updated: 2026-04-03 after initialization*
