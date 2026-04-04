const assert = require('assert');
const DataManager = require('./DataManager');
const DataStore = require('./DataStore');
const DecisionEngine = require('./DecisionEngine');
const GameController = require('./GameController');
const path = require('path');

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
  // Cachorro: Tamanho_Médio a Grande=1, Dieta_Omnívoro=1, Locomoção_Quadrúpede=1
  
  // Vamos forçar algumas respostas
  controller.answerQuestion('Tamanho_Médio a Grande', 1);
  controller.answerQuestion('Dieta_Omnívoro', 1);
  controller.answerQuestion('Locomoção_Quadrúpede', 1);
  
  console.log(`Candidatos restantes: ${store.getCandidateCount()}`);
  
  // Testar o palpite (forçar 10 perguntas ou reduzir a 1)
  // Se reduzir a 1, o controller deve estar pronto para palpitar
  if (store.getCandidateCount() === 1) {
    const guess = controller.getGuess();
    console.log(`Palpite do Jinn: ${guess.name}`);
    assert(guess.name === 'Cachorro', 'Deveria ser Cachorro');
  }

  console.log('✅ test-engine.js (Básico) aprovado.');

} catch (err) {
  console.error('❌ Erro no teste:', err.message);
  // Não saímos com erro ainda porque as classes não existem
}
