import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import DataManager from './DataManager.js';
import DataStore from './DataStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test animals.json loading
try {
  const dataPath = path.join(__dirname, 'oldData', 'animals.json');
  console.log(`Loading from ${dataPath}...`);
  
  const manager = new DataManager();
  const animals = manager.load(dataPath);
  
  assert(animals.length >= 40, 'Dataset too small');
  
  const features = manager.getFeatures();
  console.log(`Detected ${features.length} unique binary features.`);
  assert(features.length > 0, 'No features detected');
  
  // Test first animal (Cachorro)
  const dog = animals.find(a => a.name === 'Cachorro');
  console.log(`Dog Features: ${Object.keys(dog.features).join(', ')}`);
  assert(dog.features['Dieta_Omnívoro'] === 1, 'Dog should be Omnívoro');
  assert(dog.features['Reprodução_Vivíparo'] === 1, 'Dog should be Vivíparo');
  
  // Test DataStore
  const store = new DataStore(animals);
  console.log(`Store Initial Count: ${store.getCandidateCount()}`);
  assert(store.getCandidateCount() === animals.length, 'Initial count mismatch');
  
  // Filter for Vivíparo
  store.filter('Reprodução_Vivíparo', 1);
  console.log(`Count after Vivíparo filter: ${store.getCandidateCount()}`);
  assert(store.getCandidateCount() < animals.length, 'Filter should reduce count');
  
  // Filter for Omnívoro
  store.filter('Dieta_Omnívoro', 1);
  console.log(`Count after Omnívoro filter: ${store.getCandidateCount()}`);
  
  console.log('✅ DataManager and DataStore verified (ESM).');
  
} catch (err) {
  console.error('❌ Test failed:', err.message);
  console.error(err.stack);
  process.exit(1);
}
