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

const guessControls = document.getElementById('guess-controls');
const endScreen = document.getElementById('end-screen');
const endTitle = document.getElementById('end-title');
const endMessage = document.getElementById('end-message');
const lossContainer = document.getElementById('loss-input-container');
const restartButton = document.getElementById('restart-button');
const btnGuessYes = document.getElementById('btn-guess-yes');
const btnGuessNo = document.getElementById('btn-guess-no');
const jinnImg = document.getElementById('jinn-img');

let controller;

async function initGame() {
  const manager = new DataManager();
  const animals = await manager.loadFromUrl('animals.json');
  
  const store = new DataStore(animals);
  const engine = new DecisionEngine(store);
  controller = new GameController(store, engine);

  console.log('Jinn Initialized.');
}

function startGame() {
  startScreen.classList.add('hidden');
  endScreen.classList.add('hidden');
  questionCard.classList.remove('hidden');
  controls.classList.remove('hidden');
  footer.classList.remove('hidden');
  
  // Reset visual aura
  jinnImg.classList.remove('win-aura', 'loss-aura');

  const initialText = controller.start();
  showJinnMessage(initialText);
  updateUI();
}

function showJinnMessage(text) {
  dialogueBubble.classList.remove('pop-anim');
  void dialogueBubble.offsetWidth; 
  dialogueBubble.classList.add('pop-anim');
  jinnText.textContent = text;
}

function updateUI() {
  const state = controller.getState();
  
  if (state === 'FINISHED') {
    handleEndGame();
    return;
  }

  // Simular "Pensando" com transição de texto
  jinnImg.classList.add('thinking');
  questionText.classList.add('fade-out');
  controls.style.pointerEvents = 'none';
  guessControls.style.pointerEvents = 'none';

  setTimeout(() => {
    jinnImg.classList.remove('thinking');
    questionText.classList.remove('fade-out');
    controls.style.pointerEvents = 'all';
    guessControls.style.pointerEvents = 'all';

    const q = controller.getNextQuestion();
    
    if (q.type === 'GUESS') {
      controls.classList.add('hidden');
      guessControls.classList.remove('hidden');
      questionText.textContent = q.text;
    } else {
      controls.classList.remove('hidden');
      guessControls.classList.add('hidden');
      questionText.textContent = q.text;
      counter.textContent = `Pergunta: ${controller.questionCount}/${controller.getNextLimit()}`;
    }
  }, 500);
}

function handleEndGame() {
  questionCard.classList.add('hidden');
  controls.classList.add('hidden');
  guessControls.classList.add('hidden');
  footer.classList.add('hidden');
  endScreen.classList.remove('hidden');

  if (controller.isWin) {
    endTitle.textContent = 'Vitória do Jinn!';
    endMessage.textContent = 'Eu sabia! Minha inteligência é insuperável, miau!';
    jinnImg.classList.add('win-aura');
    lossContainer.classList.add('hidden');
  } else {
    endTitle.textContent = 'Você Venceu...';
    endMessage.textContent = 'Inacreditável... você é um mestre dos animais! Mas qual animal era?';
    jinnImg.classList.add('loss-aura');
    lossContainer.classList.remove('hidden');
  }
}

// Event Listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', () => {
    controller.reset();
    startGame();
});

btnGuessYes.addEventListener('click', () => {
    const text = controller.handleGuessResponse(true);
    showJinnMessage(text);
    updateUI();
});

btnGuessNo.addEventListener('click', () => {
    const text = controller.handleGuessResponse(false);
    showJinnMessage(text);
    updateUI();
});

// Botões de resposta (Sim / Não / Não Sei)
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
