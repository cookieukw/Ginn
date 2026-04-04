# Pesquisa de Pitfalls: Magic Jinn

Esta pesquisa lista os erros comuns em jogos de adivinhação inteligentes e as estratégias para evitá-los no projeto Magic Jinn.

## Erros Comuns e Evitação

### 1. Perguntas Repetitivas ou Redundantes
- **Risco**: Perguntar "O seu animal voa?" e depois "Seu animal tem asas?".
- **Sinal de Alerta**: O ganho de informação cai drasticamente na segunda pergunta.
- **Prevenção**: A cada pergunta respondida, o sistema deve marcar as características correlacionadas e reduzir a prioridade de perguntas redundantes (ou eliminá-las se forem mutuamente exclusivas).

### 2. "Talvez" e "Não sei" Quebram o Filtro
- **Risco**: O usuário não sabe se o animal é vivíparo ou ovíparo. A remoção estrita do animal da lista matará o jogo.
- **Sinal de Alerta**: A lista de candidatos fica vazia antes da 10ª pergunta.
- **Prevenção**: Não remover o animal se a resposta for incerta. Em vez disso, reduzir o peso de probabilidade para aquele animal, mantendo-o como uma possibilidade de baixo ranking.

### 3. Falta de Feedback Visual (O Jogo Parece Travado)
- **Risco**: O processamento da entropia pode levar milissegundos, mas se o balão de fala do Jinn não mudar, o usuário não sente progresso.
- **Sinal de Alerta**: O usuário clica várias vezes no botão.
- **Prevenção**: Adicionar uma animação de "pensamento" (cat thinking bubble) e transições entre cada pergunta.

### 4. Animais Sem Diferenciação Suficiente
- **Risco**: No `animals.json`, "Vaca" e "Boi" podem ter as mesmas características.
- **Sinal de Alerta**: O motor fica travado em um loop de perguntas que não dividem mais nada.
- **Prevenção**: Se sobrar apenas 2-3 animais com as mesmas características, o Jinn deve disparar um palpite direto ou um diálogo especial ("Pensei em algo muito específico...").

## Mapeamento de Fase de Prevenção

| Pitfall | Fase de Correção | Estratégia |
|---------|------------------|------------|
| Perguntas Redundantes | Algoritmo Core | Matrix Cross-Correlation check |
| Incerteza do Usuário | Filtro Probabilístico | Soft-filtering Logic |
| Falta de Feedback | UI Animation | CSS Micro-interactions |
| Ambiguidade de Dados | Knowledge Base | Data Clean-up helper |

---
*Last updated: 2026-04-03*
