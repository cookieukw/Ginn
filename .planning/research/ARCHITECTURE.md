# Arquitetura: Magic Jinn

Esta pesquisa descreve a estrutura de componentes e fluxo de dados para o motor de adivinhação e a interface do usuário.

## Componentes do Sistema

### 1. `DataManager` (O Conhecimento)
Responsável por carregar o `animals.json` e indexar as perguntas.
- **Entrada**: Arquivo JSON.
- **Saída**: Matriz de características e candidatos ativos.
- **Responsabilidade**: Manter a lista de animais remanescentes e calcular as frequências de cada característica neles.

### 2. `DecisionEngine` (O Cérebro)
Interface principal entre o estado do jogo e a escolha da próxima pergunta.
- **Cálculo de Ganho de Informação**: Para cada característica disponível, o motor calcula qual delas divide os animais sobreviventes de forma mais próxima de 50/50.
- **Lógica de Resposta**:
    - "Sim" → Filtrar animais com essa característica.
    - "Não" → Filtrar animais SEM essa característica.
    - "Talvez" / "Não sei" → Penalizar animais sem remover (manter probabilidade mas reduzir "ranking").
- **Loop 10+5+5**: Gerencia o contador de perguntas e dispara o palpite baseado na confiança estatística.

### 3. `GameController` (O Fluxo)
Orquestra o estado do jogo.
- Estados: `MENU`, `QUESTIONING`, `GUESSING`, `RESULT`.
- Faz o intermédio entre o Jinn (UI) e o motor de decisão.

### 4. `JinnView` (A Interface)
Componente visual do personagem e balões de fala.
- **Animações**: CSS keyframes para o gato Jinn.
- **Inputs**: Botões dinâmicos de resposta.
- **Premium Glassmorphism**: Camadas de UI com `backdrop-filter: blur()`.

## Fluxo de Dados
1. `DataManager` indexa os animais.
2. `DecisionEngine` escolhe a 1ª pergunta.
3. Usuário responde → `DecisionEngine` filtra os candidatos.
4. Repetir 10 vezes.
5. Se `questionsCount == 10`, `GameController` solicita o melhor candidato.
6. Se o usuário confirmar o erro, `GameController` adiciona mais 5 rodadas.

## Ordem Sugerida de Build
1. `animals.json` Parser e Indexer.
2. `DecisionEngine` (Testes de CLI para ver se ele adivinha rápido).
3. `GameController` (Estrutura básica de telas).
4. `JinnView` (Polish visual e CSS).

---
*Last updated: 2026-04-03*
