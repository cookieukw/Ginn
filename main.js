import DataManager from './DataManager.js';
import DataStore from './DataStore.js';
import DecisionEngine from './DecisionEngine.js';
import GameController from './GameController.js';

// DOM Elements
const startButton = document.getElementById('start-button');
const dialogueBubble = document.getElementById('dialogue-bubble');
const startScreen = document.getElementById('start-screen');
const questionCard = document.getElementById('question-card');
const controls = document.getElementById('controls');
const jinnText = document.getElementById('jinn-text');
const questionText = document.getElementById('question-text');
const footer = document.getElementById('game-stats');
const counter = document.getElementById('question-counter');

const jinnImg = document.getElementById('jinn-img');

let controller;

async function initGame() {
  const manager = new DataManager();
  const animals = await manager.loadFromUrl('/animals.json');
  
  const store = new DataStore(animals);
  const engine = new DecisionEngine(store);
  controller = new GameController(store, engine);

  console.log('Jinn Initialized. Candidates:', store.getCandidateCount());
}

function startGame() {
  startScreen.classList.add('hidden');
  questionCard.classList.remove('hidden');
  controls.classList.remove('hidden');
  footer.classList.remove('hidden');

  const initialText = controller.start();
  showJinnMessage(initialText);
  updateUI();
}

function showJinnMessage(text) {
  // Animação de "Pop-up" no balão
  dialogueBubble.classList.remove('pop-anim');
  void dialogueBubble.offsetWidth; // Trigger reflow
  dialogueBubble.classList.add('pop-anim');
  jinnText.innerText = text;
}

function updateUI() {
  // Simular "Pensando"
  jinnImg.classList.add('thinking');
  controls.style.pointerEvents = 'none';

  setTimeout(() => {
    jinnImg.classList.remove('thinking');
    controls.style.pointerEvents = 'all';

    const q = controller.getNextQuestion();
    
    if (q.type === 'GUESS') {
      questionText.innerText = q.text;
      // TODO: Implementar lógica de botões de verificação do palpite na Phase 5
    } else {
      questionText.innerText = q.text;
      counter.innerText = `Pergunta: ${controller.questionCount}/10`;
    }
  }, 1000);
}

// Event Listeners
startButton.addEventListener('click', startGame);

document.querySelectorAll('.glass-button[data-response]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const response = parseFloat(e.target.dataset.response);
    const questionKey = controller.currentQuestion;

    controller.answerQuestion(questionKey, response);
    updateUI();
  });
});

// Start initialization
initGame().catch(console.error);
