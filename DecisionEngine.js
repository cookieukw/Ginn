export default class DecisionEngine {
  constructor(store) {
    this.store = store;
    this.ignoredFeatures = new Set();
    
    // Heurística: Pesos de relevância para evitar perguntas técnicas
    this.weights = {
      'Fórmula Dental': 0.1,
      'Estratégia Reprodutiva': 0.1,
      'Bioma': 0.5,
      'Período de Gestação': 0.5,
      'Frequência Cardíaca': 0.1,
      'Longevidade': 0.8,
      'Expectativa de Vida': 0.8,
      'Tamanho': 1.0,
      'Dieta': 1.0,
      'Habitat': 1.0,
      'Reprodução': 1.0,
      'Locomoção': 1.0,
      'Cor': 0.7,
      'Clima Preferido': 0.9,
      'Ciclo de Atividade': 0.9,
      'Comunicação': 0.9,
      'Comportamento Territorial': 0.8,
      'Migração': 0.8
    };
  }

  calculateEntropy(candidates) {
    if (candidates.length === 0) return 0;
    // Como cada animal é único na lista, a probabilidade de cada um é 1/N
    // p = 1/N, H = - Σ (1/N * log2(1/N)) = log2(N)
    return Math.log2(candidates.length);
  }

  getBestQuestion() {
    const candidates = this.store.activeCandidates;
    const totalCount = candidates.length;
    if (totalCount <= 1) return null;

    const parentEntropy = this.calculateEntropy(candidates);
    const featureCounts = this.store.getFeatureCounts();
    
    let bestFeature = null;
    let maxGain = -1;

    Object.keys(featureCounts).forEach(featureKey => {
      if (this.ignoredFeatures.has(featureKey)) return;
      if (this.store.answers[featureKey] !== undefined) return;

      const yesCount = featureCounts[featureKey];
      const noCount = totalCount - yesCount;

      // Se a pergunta não divide o grupo (todos sim ou todos não), o ganho é zero
      if (yesCount === 0 || noCount === 0) return;

      const pYes = yesCount / totalCount;
      const pNo = noCount / totalCount;

      const childrenEntropy = (pYes * Math.log2(yesCount)) + (pNo * Math.log2(noCount));
      const gain = parentEntropy - (parentEntropy - childrenEntropy); // Simplified IG for this use case
      
      // Aplicar peso da heurística
      const attrBase = featureKey.split('_')[0];
      const weight = this.weights[attrBase] || 1.0;
      const weightedGain = childrenEntropy * weight; // We want to minimize childrenEntropy, so maximize weighted version?
      
      // Correção: Queremos o split mais próximo de 50/50. 
      // O split 50/50 maximiza a entropia dos filhos se virmos como incerteza, 
      // mas na verdade queremos que pYes e pNo sejam próximos de 0.5.
      // Information Gain = H(Parent) - [ (N_yes/N)*H(Yes) + (N_no/N)*H(No) ]
      // Aqui, H(Yes) = log2(yesCount).
      
      const score = (1 - Math.abs(pYes - 0.5)) * weight;

      if (score > maxGain) {
        maxGain = score;
        bestFeature = featureKey;
      }
    });

    return bestFeature;
  }

  ignoreFeature(featureKey) {
    this.ignoredFeatures.add(featureKey);
  }
}

