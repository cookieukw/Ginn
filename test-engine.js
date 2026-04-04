import assert from 'assert';
import DataManager from './DataManager.js';
import DataStore from './DataStore.js';
import DecisionEngine from './DecisionEngine.js';
import GameController from './GameController.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const dataPath = path.join(__dirname, 'oldData', 'animals.json');
  const manager = new DataManager();
  const animals = manager.load(dataPath);
  
  const store = new DataStore(animals);
  const engine = new DecisionEngine(store);
  const controller = new GameController(store, engine);

  console.log('--- Simulação de Jogo [Cachorro] ---');
  
  // Pergunta 1
  let q = controller.getNextQuestion();
  console.log(`P1: ${q.text}`);
  
  // Simulação de respostas para chegar no Cachorro
  controller.answerQuestion('Tamanho_Médio a Grande', 1);
  controller.answerQuestion('Dieta_Omnívoro', 1);
  controller.answerQuestion('Locomoção_Quadrúpede', 1);
  
  console.log(`Candidatos restantes: ${store.getCandidateCount()}`);
  
  if (store.getCandidateCount() === 1) {
    const guess = controller.getGuess();
    console.log(`Palpite do Jinn: ${guess.name}`);
    assert(guess.name === 'Cachorro', 'Deveria ser Cachorro');
  }

  console.log('✅ test-engine.js (ESM) aprovado.');

} catch (err) {
  console.error('❌ Erro no teste:', err.message);
  process.exit(1);
}
