export default class DecisionEngine {
  constructor(store) {
    this.store = store;
    this.ignoredFeatures = new Set();

    this.weights = {
      "Fórmula Dental": 0.1,
      "Estratégia Reprodutiva": 0.1,
      Bioma: 0.5,
      "Período de Gestação": 0.5,
      "Frequência Cardíaca": 0.1,
      Longevidade: 0.8,
      "Expectativa de Vida": 0.8,
      Tamanho: 1.0,
      Dieta: 1.0,
      Habitat: 1.0,
      Reprodução: 1.0,
      Locomoção: 1.0,
      Cor: 0.7,
      "Clima Preferido": 0.9,
      "Ciclo de Atividade": 0.9,
      Comunicação: 0.9,
      "Comportamento Territorial": 0.8,
      Migração: 0.8,
    };
    this.lastCategories = []; // Fila circular das últimas 2 categorias
    this.maxHistory = 2;
  }

  recordCategory(category) {
    this.lastCategories.push(category);
    if (this.lastCategories.length > this.maxHistory) {
      this.lastCategories.shift();
    }
  }

  calculateEntropy(candidates) {
    if (candidates.length === 0) return 0;
    return Math.log2(candidates.length);
  }

  getBestQuestion() {
    const candidates = this.store.activeCandidates;
    const totalCount = candidates.length;
    if (totalCount <= 1) return null;

    const featureCounts = this.store.getFeatureCounts();

    let bestFeature = null;
    let maxGain = -1;

    Object.keys(featureCounts).forEach((featureKey) => {
      if (this.ignoredFeatures.has(featureKey)) return;
      if (this.store.answers[featureKey] !== undefined) return;

      const yesCount = featureCounts[featureKey];
      const noCount = totalCount - yesCount;
      if (yesCount === 0 || noCount === 0) return;

      const pYes = yesCount / totalCount;
      
      const attrBase = featureKey.split("_")[0];
      const weight = this.weights[attrBase] || 1.0;
      
      // Penalização de Categoria Repetida
      const isRepeat = this.lastCategories.includes(attrBase);
      const categoryPenalty = isRepeat ? 0.3 : 1.0;

      // Cálculo de score com Jitter (Aleatoriedade)
      const jitter = Math.random() * 0.05;
      const score = ((1 - Math.abs(pYes - 0.5)) * weight * categoryPenalty) + jitter;

      if (score > maxGain) {
        maxGain = score;
        bestFeature = featureKey;
      }
    });

    if (bestFeature) {
      const bestAttr = bestFeature.split("_")[0];
      this.recordCategory(bestAttr);
    }

    return bestFeature;
  }

  ignoreFeature(featureKey) {
    this.ignoredFeatures.add(featureKey);
  }

  reset() {
    this.ignoredFeatures.clear();
  }
}

