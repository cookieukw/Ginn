import assert from 'assert';
import DataManager from './DataManager.js';
import DataStore from './DataStore.js';
import DecisionEngine from './DecisionEngine.js';
import GameController from './GameController.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTestSuite() {
  try {
    const dataPath = path.join(__dirname, 'oldData', 'animals.json');
    const manager = new DataManager();
    const animals = await manager.load(dataPath);
    
    const store = new DataStore(animals);
    const engine = new DecisionEngine(store);
    const controller = new GameController(store, engine);

    console.log('--- Simulação de Jogo [Cachorro] ---');
    
    // Pergunta 1
    controller.start();
      const q1 = controller.getNextQuestion();
      console.log(`P1: ${q1.text}`);
      controller.answerQuestion('reproduction_Ovíparo', 0); // Cachorro não é ovíparo
      
      const q2 = controller.getNextQuestion();
      console.log(`P2: ${q2.text}`);
      controller.answerQuestion('size_Grande', 1); // Cachorro é grande
    console.log(`Candidatos restantes: ${store.getCandidateCount()}`);
    
    const guessObj = controller.getNextQuestion();
    if (guessObj.type === 'GUESS') {
      const guess = controller.getGuess();
      console.log(`Palpite do Jinn: ${guess.name}`);
      assert(guess.name === 'Cachorro', 'Deveria ser Cachorro');
    }

    console.log('✅ test-engine.js (ESM Async) aprovado.');

  } catch (err) {
    console.error('❌ Erro no teste:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

runTestSuite();
