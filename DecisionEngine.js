export default class DecisionEngine {
  constructor(store) {
    this.store = store;
    this.ignoredFeatures = new Set();

    /**
     * Pesos por atributo.
     * Atributos com peso alto têm maior influência no score de uma pergunta.
     *
     * Nota: `longevity` foi unificado em `lifespan` — ambos representam
     * expectativa de vida e geravam redundância no score.
     */
    this.weights = {
      dental_formula:        0.1,
      reproductive_strategy: 0.1,
      biome:                 0.5,
      gestation_period:      0.5,
      heart_rate:            0.1,
      lifespan:              0.8,
      size:                  1.0,
      diet:                  1.0,
      habitat:               1.0,
      reproduction:          1.0,
      locomotion:            1.0,
      color:                 0.7,
      preferred_climate:     0.9,
      activity_cycle:        0.9,
      communication:         0.9,
      territorial_behavior:  0.8,
      migration:             0.8,
    };

    // Fila circular das últimas N categorias para penalizar repetição
    this.lastCategories = [];
    this.maxHistory = 2;
  }

  /**
   * Registra a categoria da última pergunta feita.
   * Mantém apenas os últimos `maxHistory` registros.
   */
  recordCategory(category) {
    this.lastCategories.push(category);
    if (this.lastCategories.length > this.maxHistory) {
      this.lastCategories.shift();
    }
  }

  /**
   * Extrai o nome do atributo (attr) de uma featureKey no formato "attr_value"
   * ou "attr_with_underscores_value".
   *
   * Exemplo: "preferred_climate_tropical" → "preferred_climate"
   *
   * Estratégia: verifica do maior prefixo ao menor qual bate com os pesos
   * conhecidos. Se nenhum bater, usa a string completa menos o último segmento.
   */
  extractAttr(featureKey) {
    const parts = featureKey.split('_');
    // Tenta do maior prefixo ao menor para achar o atributo conhecido
    for (let i = parts.length - 1; i >= 1; i--) {
      const candidate = parts.slice(0, i).join('_');
      if (this.weights[candidate] !== undefined) {
        return candidate;
      }
    }
    // Fallback: tudo menos o último segmento
    parts.pop();
    return parts.join('_');
  }

  /**
   * Escolhe a melhor pergunta a fazer com base nos candidatos ativos.
   *
   * Score de uma feature = (proximidade de 50/50) × peso × penalidade de categoria + jitter
   *
   * O jitter pequeno (0.01) serve apenas como desempate entre features com
   * scores idênticos, evitando que o algoritmo seja determinístico.
   *
   * @returns {string|null} featureKey da melhor pergunta, ou null se encerrar.
   */
  getBestQuestion() {
    const candidates = this.store.activeCandidates;
    const totalCount = candidates.length;
    if (totalCount <= 1) return null;

    const featureCounts = this.store.getFeatureCounts();

    let bestFeature = null;
    let maxScore = -1;

    for (const featureKey of Object.keys(featureCounts)) {
      if (this.ignoredFeatures.has(featureKey)) continue;
      if (this.store.answers[featureKey] !== undefined) continue;

      const yesCount = featureCounts[featureKey];
      const noCount = totalCount - yesCount;

      // Ignora features que não diferenciam nada (todos têm ou nenhum tem)
      if (yesCount === 0 || noCount === 0) continue;

      const pYes = yesCount / totalCount;
      const attr = this.extractAttr(featureKey);
      const weight = this.weights[attr] ?? 1.0;

      // Penalização por repetição de categoria recente
      const isRepeat = this.lastCategories.includes(attr);
      const categoryPenalty = isRepeat ? 0.3 : 1.0;

      // Jitter mínimo apenas para desempate — não deve inverter rankings
      const jitter = Math.random() * 0.01;
      const score = (1 - Math.abs(pYes - 0.5)) * weight * categoryPenalty + jitter;

      if (score > maxScore) {
        maxScore = score;
        bestFeature = featureKey;
      }
    }

    if (bestFeature) {
      this.recordCategory(this.extractAttr(bestFeature));
    }

    return bestFeature;
  }

  /**
   * Faz o engine ignorar uma feature nas próximas escolhas de pergunta.
   * Usado quando o usuário responde "Não Sei".
   */
  ignoreFeature(featureKey) {
    this.ignoredFeatures.add(featureKey);
  }

  /**
   * Reinicia todo o estado do engine para uma nova partida.
   */
  reset() {
    this.ignoredFeatures.clear();
    this.lastCategories = [];
  }
}
