# Pesquisa de Funcionalidades: Magic Jinn

Esta pesquisa detalha o que torna um jogo de adivinhação estilo "Jinn" viciante e funcional, categorizando por prioridade.

## Categorias de Funcionalidades

### Table Stakes (Must-Have)
Essas são as funcionalidades essenciais para que o jogo sequer funcione como esperado.

- **Seleção de Pergunta Inteligente**: Algoritmo para escolher perguntas que eliminem ~50% dos candidatos em cada passo.
- **Diferenciação de Respostas**: Suporte para "Sim", "Não", "Talvez" e "Não sei".
- **Sistema de Loop de Tentativa (10+5+5)**: Mecânica central de adivinhação e falha com múltiplas chances.
- **Suporte a Língua Portuguesa**: Interface e lógica alinhadas com a base de dados.
- **Gestão de Candidatos**: Listar quais animais ainda estão "vivos" na memória do jogo.

### Differentiators (Better Than Basic)
O que fará o seu "Jinn" se destacar e ter a estética moderna pedida.

- **Interface Glassmorphism**: Uso de desfoque, transparência e sombras suaves para um visual "premium".
- **Diálogo Dinâmico do Personagem**: O cat (Jinn) reagirá com frases variadas dependendo se a pergunta está indo bem ou se ele está confuso.
- **Visualização de Progresso Animada**: Uma barra de progresso ou indicador de "certeza" do Jinn que cresce conforme ele se aproxima da resposta.
- **Gestão de Falha Inteligente**: Se o Jinn errar os 3 palpites, ele pergunta qual era o animal e armazena (mesmo que apenas nesta sessão) para melhorar.

### Anti-Features (Não fazer)
- **Login/Sincronização Cloud**: Focaremos 100% no local player individual.
- **Multiplayer**: Jogo estritamente single-player (usuário vs Jinn).

## Complexidade das Funcionalidades

| Funcionalidade | Complexidade | Dependência |
|----------------|--------------|-------------|
| Algoritmo de Entropia | Média a Alta | `animals.json` parser |
| Interface Glassmorphism | Média | CSS Engine |
| Loop 10+5+5 | Baixa | Game Core |
| Diálogo Dinâmico | Baixa | Personagem UI |

## Relação entre Funcionalidades
A fidelidade do palpite depende diretamente da qualidade da pergunta escolhida inicialmente. Se a 1ª pergunta for ruim, o loop de 10 perguntas pode não ser suficiente.

---
*Last updated: 2026-04-03*
