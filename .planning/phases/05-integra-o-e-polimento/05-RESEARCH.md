# Pesquisa Técnica: Phase 05 - Integração e Polimento

Esta pesquisa foca na finalização da lógica de jogo (loop 10+5+5) e no polimento da experiência do usuário (UX).

## Descobertas Principais

### 1. Fluxo de Palpites (Interatividade)
Atualmente, o `GameController` muda para o estado `GUESSING`, mas a UI não troca os botões de resposta ("Sim", "Não", "Não Sei") pelos botões de confirmação do palpite ("Acertou!", "Errou").
- **Solução**: Criar um novo contêiner de botões `#guess-controls` que aparece apenas no estado de palpite.

### 2. Lógica de 2ª e 3ª Chance
O motor já suporta os incrementos de +5 perguntas.
- **GAME-02/03**: Se o usuário clicar em "Errou" no palpite, o `GameController` deve receber o sinal para continuar perguntando até atingir o próximo limite (15, depois 20).

### 3. Tela de Derrota (GAME-04)
Após o 3º erro, o Jinn deve admitir a derrota.
- **UX**: Mostrar um campo de input ou uma lista para o usuário dizer qual era o animal, e o Jinn reage com uma frase de "aprendizado" (mesmo que não salve permanentemente na V1).

### 4. Polimento Visual
- **Transições**: Adicionar um efeito de "Flash" ou "Glow" mais intenso quando o Jinn acerta.
- **Sons (Opcional)**: Se for simples, adicionar efeitos sonoros curtos de "pop" e "sucesso".

## Recomendações de Implementação

| Elemento | Detalhe Técnico | Notas |
|------------|-----------------|-------|
| **Guess UI** | State-driven buttons | Alternar entre botões de resposta e botões de confirmação. |
| **Win/Loss States** | Modal ou Overlay Glass | Uma mensagem final em tela cheia com botão de "Jogar Novamente". |
| **Confetti/Glow** | CSS Keyframes | Efeito visual para a vitória. |

## Riscos Detectados
- **Complexidade do Loop**: Garantir que o contador de perguntas não reinicie incorretamente entre os palpites.
- **Input de Derrota**: O usuário pode digitar qualquer coisa; o Jinn deve reagir de forma genérica se o animal não estiver na base.

---
*Pesquisa concluída em: 2026-04-04*
