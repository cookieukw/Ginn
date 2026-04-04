export default class DecisionEngine {
  constructor(store) {
    this.store = store;
    this.ignoredFeatures = new Set();

    this.weights = {
      dental_formula: 0.1,
      reproductive_strategy: 0.1,
      biome: 0.5,
      gestation_period: 0.5,
      heart_rate: 0.1,
      longevity: 0.8,
      lifespan: 0.8,
      size: 1.0,
      diet: 1.0,
      habitat: 1.0,
      reproduction: 1.0,
      locomotion: 1.0,
      color: 0.7,
      preferred_climate: 0.9,
      activity_cycle: 0.9,
      communication: 0.9,
      territorial_behavior: 0.8,
      migration: 0.8,
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

