# Pesquisa Técnica: Phase 04 - Personagem e Feedback

Esta pesquisa foca em dar personalidade visual ao Magic Jinn, integrando o motor de jogo à interface via animações e diálogos dinâmicos.

## Descobertas Principais

### 1. Visual do Personagem (Gato Jinn)
Para o estilo Glassmorphism/Dark Mode moderno:
- **Estética**: Um gato místico, talvez com olhos brilhantes ou aura sutil, estilo semi-realista ou 3D estilizado.
- **Implementação**: Uma imagem gerada (PNG transparente) posicionada no centro, com camadas de CSS para brilho e sombra.

### 2. Animações CSS (Idle/Thinking)
- **Breathing**: `transform: translateY()` sutil combinado com `scale()` leve para simular respiração.
- **Thinking**: Um brilho pulsante nos olhos ou uma aura giratória lenta para indicar que o motor de entropia está "pensando" (embora seja instantâneo, a animação traz feedback).

### 3. Sistema de Diálogo (Bubble)
- **Transição**: Uso de `opacity` e `transform: scale()` para fazer o balão "surgir" do Jinn.
- **Efeito Digitação (Typewriter)**: Opcional, para aumentar a imersão na fala do Jinn.

## Recomendações de Implementação

| Componente | Detalhe Técnico | Notas |
|------------|-----------------|-------|
| **Jinn Image** | `generate_image` | Prompt: "A mystical, intelligent cat character, dark purple fur, glowing eyes, seated in a wise pose, floating, isometric 3D, high quality, transparent background". |
| **Animation Loop** | `requestAnimationFrame` ou CSS Keys | Focar em suavidade (Ease-in-out). |
| **Feedback UI** | CSS Transitions | Mudar de cor do botão ou brilho ao responder corretamente. |

## Riscos Detectados
- **Compatibilidade de Imagem**: Garantir que o fundo transparente da imagem gerada não conflite com o desfoque do Glassmorphism.
- **Sincronia**: O diálogo deve aparecer apenas após a animação de "pensar" se quisermos simular inteligência artificial real.

---
*Pesquisa concluída em: 2026-04-03*
