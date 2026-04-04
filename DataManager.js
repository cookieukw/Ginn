const fs = require('fs');
const path = require('path');

class DataManager {
  constructor() {
    this.animals = [];
    this.binaryFeatures = new Set();
  }

  load(filePath) {
    const rawData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    this.animals = rawData.map(entry => {
      const animal = {
        name: entry.animal,
        features: {}
      };

      entry.Características.forEach(([attr, value]) => {
        // Normalization: 
        // 1. Separate multiple values if comma-separated
        // 2. Create binary keys: "Attr_Value"
        const values = value.split(',').map(v => v.trim());
        
        values.forEach(v => {
          if (v === 'N/A' || v === 'Não se aplica' || v === 'Variado') return;
          
          const featureKey = `${attr}_${v}`;
          animal.features[featureKey] = 1;
          this.binaryFeatures.add(featureKey);
        });
      });

      return animal;
    });

    return this.animals;
  }

  getFeatures() {
    return Array.from(this.binaryFeatures);
  }
}

module.exports = DataManager;
