# Sumário de Pesquisa: Magic Jinn

Esta pesquisa consolida as descobertas sobre a stack tecnológica, funcionalidades, arquitetura e possíveis armadilhas para o projeto do jogo de adivinhação de animais.

## Principais Descobertas

### 1. O Motor de Decisão (Cérebro do Jinn)
O segredo para um jogo de adivinhação eficiente não é uma árvore estática, mas um **motor de entropia probabilitista**.
- **Information Gain**: Cada pergunta deve tentar dividir o conjunto de animais (Dataset: ~100 animais) pela metade.
- **Respostas Incertas**: O jogo deve ser resiliente a respostas de "Talvez" ou "Não sei", usando pesos de probabilidade em vez de exclusão binária.

### 2. A Experiência do Usuário (O Personagem Jinn)
Solicitada uma interface moderna e "WOW", a estética será baseada em **Glassmorphism** e animações CSS fluidas. O personagem Jinn (um gato) será a interface principal, conduzindo o usuário em Português.

### 3. Loop 10+5+5
A mecânica de jogo terá 3 chances principais de acerto (após 10, 15 e 20 perguntas), garantindo que, mesmo com animais parecidos, o Jinn tenha tempo para filtrar as nuances finais.

## Próximos Passos Recomendados

| Passo | Objetivo | Relação |
|-------|----------|---------|
| **Definir Requisitos** | Converter esta pesquisa em tarefas de implementação. | Imediata |
| **Criar Roadmap** | Estruturar fases de desenvolvimento (Core → UI → Polish). | Sequencial |
| **Implementar Engine** | Criar o algoritmo de entropia primeiro. | Crítico |
| **Desenvolver UI** | Criar a interface Glassmorphism. | Visual |

## Bibliografia e Referências
- Pesquisas sobre o algoritmo do Akinator.
- Princípios de Teoria da Informação (Entropia de Shannon).
- Modern Web Design Trends (2025 Glassmorphism UI patterns).

---
*Last updated: 2026-04-03*
