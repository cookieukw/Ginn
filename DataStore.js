export default class DataStore {
  constructor(animals) {
    this.allAnimals = animals;
    this.activeCandidates = [...animals];
    this.answers = {};
  }

  /**
   * Reinicia o estado para uma nova partida.
   * Limpa candidatos, respostas registradas e qualquer estado derivado.
   */
  reset() {
    this.activeCandidates = [...this.allAnimals];
    this.answers = {};
  }

  /**
   * Filtra candidatos com base na resposta do usuário para uma feature.
   * - Sim  (1):   mantém apenas animais que TÊM a feature.
   * - Não  (0):   mantém apenas animais que NÃO TÊM a feature.
   * - Talvez (0.5): não exclui ninguém.
   */
  filter(featureKey, response) {
    this.answers[featureKey] = response;

    if (response === 1) {
      this.activeCandidates = this.activeCandidates.filter(
        (a) => a.features[featureKey] === 1
      );
    } else if (response === 0) {
      this.activeCandidates = this.activeCandidates.filter(
        (a) => !a.features[featureKey]
      );
    }

    return this.activeCandidates.length;
  }

  getCandidateCount() {
    return this.activeCandidates.length;
  }

  /**
   * Retorna um mapa { featureKey -> count } de quantos candidatos ativos possuem cada feature.
   */
  getFeatureCounts() {
    const counts = {};
    for (const animal of this.activeCandidates) {
      for (const featureKey of Object.keys(animal.features)) {
        counts[featureKey] = (counts[featureKey] || 0) + 1;
      }
    }
    return counts;
  }

  removeCandidate(name) {
    this.activeCandidates = this.activeCandidates.filter(
      (c) => c.name !== name
    );
  }
}
