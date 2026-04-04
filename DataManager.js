import fs from 'fs';
import path from 'path';

export default class DataManager {
  constructor() {
    this.animals = [];
    this.binaryFeatures = new Set();
  }

  load(filePath) {
    const rawData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return this.parse(rawData);
  }

  async loadFromUrl(url) {
    const response = await fetch(url);
    const rawData = await response.json();
    return this.parse(rawData);
  }

  parse(rawData) {
    this.animals = rawData.map(entry => {
      const animal = {
        name: entry.animal,
        features: {}
      };

      entry.Características.forEach(([attr, value]) => {
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

