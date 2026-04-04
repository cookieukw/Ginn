import assert from 'assert';
import path from 'path';
import { fileURLToPath } from 'url';
import DataManager from './DataManager.js';
import DataStore from './DataStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTest() {
  try {
    const dataPath = path.join(__dirname, 'oldData', 'animals.json');
    console.log(`Loading from ${dataPath}...`);
    
    const manager = new DataManager();
    const animals = await manager.load(dataPath);
    
    assert(animals.length >= 40, 'Dataset too small');
    
    const features = manager.getFeatures();
    console.log(`Detected ${features.length} unique binary features.`);
    assert(features.length > 0, 'No features detected');
    
    const dog = animals.find(a => a.name === 'Cachorro');
    console.log(`Dog Features: ${Object.keys(dog.features).join(', ')}`);
    assert(dog.features['diet_Omnívoro'] === 1, 'Dog should be Omnívoro');
    
    const store = new DataStore(animals);
    console.log(`Store Initial Count: ${store.getCandidateCount()}`);
    assert(store.getCandidateCount() === animals.length, 'Initial count mismatch');
    
    store.filter('reproduction_Vivíparo', 1);
    console.log(`Count after Vivíparo filter: ${store.getCandidateCount()}`);
    
    console.log('✅ DataManager and DataStore verified (ESM Async).');
    
  } catch (err) {
    console.error('❌ Test failed:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

runTest();
