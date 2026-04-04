# Pesquisa Técnica: Phase 02 - Motor de Decisão

Esta pesquisa foca na implementação do algoritmo de Entropia de Shannon com suporte a pulo de perguntas e heurísticas de "usuário leigo".

## Descobertas Principais

### 1. Cálculo de Entropia com Heurística (Penalização)
Para evitar perguntas técnicas (ex: "Fórmula Dental"), usaremos um **Fator de Relevância**.
- **Fórmula**: `InformationGain(F) = ExpectedReduction(F) * RelevanceWeight(F)`
- **Atributos Técnicos**: Terão `RelevanceWeight = 0.1` (baixa prioridade).
- **Atributos Comuns**: (Tamanho, Habitat, Dieta) terão `RelevanceWeight = 1.0`.

### 2. Resposta "Não Sei"
Diferente de sistemas de ML puros que imputam dados, no Magic Jinn o "Não Sei" deve ser um **Skipper**.
- Quando o usuário não sabe, a pergunta é movida para uma `ignoredFeatures` list.
- O motor recalcula a próxima melhor pergunta entre as disponíveis, sem alterar o pool de animais.

### 3. Loop de Jogo 10+5+5
A lógica de transição proposta:
1.  **Estado "Perguntando"**: Seleciona e apresenta pergunta.
2.  **Estado "Palpite"**: Quando `count == 10` (e depois 15, 20), seleciona o animal com maior contagem interna ou o único restante.
3.  **Estado "Resultado"**: Verifica se o palpite está correto. Se não, incrementa a fase ou admite derrota.

## Recomendações de Implementação

| Componente | Responsabilidade | Lógica |
|------------|------------------|--------|
| **DecisionEngine** | Ranking de perguntas. | Shannon Entropy + Relevance Weight. |
| **GameController** | Máquina de estados 10+5+5. | Switch case de estados. |
| **DialogueManager** | Gerar frases em PT-BR. | Template strings com tom desafiador. |

## Riscos Detectados
- **Empate de Entropia**: Se várias perguntas tiverem o mesmo ganho, o sistema deve escolher a menos técnica.
- **Convergência Lenta**: Com apenas 47 animais, o Jinn pode chegar a um único animal em menos de 5 perguntas. O loop de 10 pode ser "longo demais" para alguns casos óbvios.

---
*Pesquisa concluída em: 2026-04-03*
