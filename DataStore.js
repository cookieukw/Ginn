class DataStore {
  constructor(animals) {
    this.allAnimals = animals;
    this.activeCandidates = [...animals];
    this.answers = {}; // featureKey: response (1=Yes, 0=No, 0.5=Maybe)
  }

  reset() {
    this.activeCandidates = [...this.allAnimals];
    this.answers = {};
  }

  filter(featureKey, response) {
    this.answers[featureKey] = response;
    
    // Simple filter: 
    // If Yes (1): Keep if animal has feature (1).
    // If No (0): Keep if animal does NOT have feature (0/null).
    // If Maybe (0.5) or Unknown: Don't exclude.
    
    if (response === 1) {
      this.activeCandidates = this.activeCandidates.filter(a => a.features[featureKey] === 1);
    } else if (response === 0) {
      this.activeCandidates = this.activeCandidates.filter(a => !a.features[featureKey]);
    }
    
    return this.activeCandidates.length;
  }

  getCandidateCount() {
    return this.activeCandidates.length;
  }

  getFeatureCounts() {
    const counts = {};
    this.activeCandidates.forEach(a => {
      Object.keys(a.features).forEach(featureKey => {
        counts[featureKey] = (counts[featureKey] || 0) + 1;
      });
    });
    return counts;
  }
}

module.exports = DataStore;
