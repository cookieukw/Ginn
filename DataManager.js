export default class DataManager {
  constructor() {
    this.animals = [];
    this.binaryFeatures = new Set();
  }

  // Node only: carregar via filesystem (será usado apenas nos testes locais)
  async load(filePath) {
    if (typeof window === 'undefined') {
      // Import dinâmico com @vite-ignore para evitar que o bundler do browser tente incluir o 'fs'
      try {
        const fs = await import(/* @vite-ignore */ 'fs');
        const rawData = JSON.parse(fs.default.readFileSync(filePath, 'utf8'));
        return this.parse(rawData);
      } catch (e) {
        console.error('Erro ao carregar via FS:', e);
        throw e;
      }
    } else {
      throw new Error('FileSystem não disponível no browser.');
    }
  }

  // Browser/Node 18+: carregar via URL
  async loadFromUrl(url) {
    const response = await fetch(url);
    const rawData = await response.json();
    return this.parse(rawData);
  }

  parse(rawData) {
    this.animals = rawData.map(entry => {
      const animal = {
        name: entry.name,
        features: {}
      };

      entry.features.forEach(([attr, value]) => {
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
