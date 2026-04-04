# Pesquisa Técnica: Phase 01 - Fundação e Dados

Esta pesquisa foca na melhor forma de estruturar e indexar a base de dados `animals.json` (Categorias em Português) para alimentar o motor de entropia de Shannon.

## Descobertas Principais

### 1. Indexação Binária vs. Multi-categórica
Embora os atributos no JSON sejam categóricos (ex: `Tamanho: Grande`), o motor de decisão funciona melhor com **splits binários** (Sim/Não). 
- **Abordagem**: Transformar cada par `Atributo: Valor` em uma pergunta binária individual (ex: `Tamanho_Grande`, `Dieta_Carnívoro`).
- **Vantagem**: Simplifica o cálculo de Ganho de Informação e permite que o jogo siga o modelo clássico de "20 perguntas".

### 2. Estrutura do DataStore
Para suportar o loop de jogo 10+5+5, o `DataStore` deve:
- Manter uma **Matriz de Incidência**: Uma tabela onde as linhas são os animais e as colunas são as perguntas binárias (1 se o animal tem, 0 se não tem).
- Suportar **Filtragem Dinâmica**: Retornar rapidamente o subconjunto de animais que satisfazem as respostas dadas.
- Calcular **Frequência de Atributos**: Para os animais restantes, qual pergunta divide o grupo de forma mais equilibrada (P=0.5).

### 3. Tratamento de Dados Ausentes/Incertos
Alguns animais possuem "N/A" ou "Varia por espécie".
- **Estratégia**: No parser, esses valores devem ser marcados como "Desconhecido" (0.5 ou nulo), permitindo que o algoritmo de probabilidade não os descarte imediatamente se a pergunta for relevante.

## Recomendações de Implementação

| Componente | Responsabilidade | Tecnologia |
|------------|------------------|------------|
| **AnimalParser** | Converter JSON em Matriz Binária. | JS Object.keys/map |
| **DataStore** | Gerenciar o estado dos "Candidatos Ativos". | JS Set/Array |
| **EntropyHelper** | Função utilitária para calcular `-Σ (p * log2(p))`. | Math.log2 |

## Riscos Detectados
- **Dataset Pequeno**: Com ~100 animais, algumas perguntas podem ser "exclusivas" demais (eliminando 99% de uma vez). O motor deve priorizar perguntas que mantenham o maior número de animais possível no início.

---
*Pesquisa concluída em: 2026-04-03*
