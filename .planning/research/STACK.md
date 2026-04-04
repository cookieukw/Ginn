# Pesquisa de Stack: Magic Jinn

Esta pesquisa define a stack tecnológica ideal para o projeto Magic Jinn, focando em performance, facilidade de implementação da lógica de entropia e estética "WOW" moderna.

## Stack Recomendada (2025 Standard)

| Camada | Tecnologia | Racional | Confiança |
|--------|------------|----------|-----------|
| **Frontend** | Vanilla JavaScript (ES6+) | Máximo controle sobre animações e lógica sem overhead de frameworks. | Alta |
| **Estilização** | Vanilla CSS (Modern CSS) | Uso de CSS Custom Properties (Variables), Flexbox/Grid e Glassmorphism. | Alta |
| **Data Format** | JSON | Formato nativo para a base de dados `animals.json`. | Alta |
| **Logic Core** | Probabilistic Entropy Engine | Baseado em Ganho de Informação para seleção de perguntas. | Alta |

## Detalhes Técnicos

### Por que Vanilla JS/CSS?
Para um projeto "simples mas moderno" como este, frameworks como React ou Vue podem adicionar complexidade desnecessária à manipulação direta do DOM necessária para animações de personagens e transições de estado fluidas. O foco será em:
- **CSS Transitions/Animations**: Para a "respiração" do personagem e transições de tela.
- **Async/Await**: Para o fluxo do jogo (carregar dados, processar resposta, animar).

### Estrutura de Dados
A base de dados será carregada uma única vez. Como o dataset é pequeno (~100 itens), todo o processamento pode ser feito em memória no cliente.

## O que NÃO usar e por quê
- **TailwindCSS**: Embora popular, para efeitos complexos de Glassmorphism e animações customizadas, o CSS puro permite uma sintaxe mais limpa e expressiva neste contexto específico.
- **External Decision Tree Libs**: Grande parte da diversão e precisão do Jinn vem do ajuste fino do algoritmo de escolha de perguntas; bibliotecas genéricas podem ser rígidas demais.

---
*Last updated: 2026-04-03*
