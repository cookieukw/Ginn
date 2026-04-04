import DialogueManager from './DialogueManager.js';

export default class GameController {
  constructor(store, engine) {
    this.store = store;
    this.engine = engine;
    this.dialogue = new DialogueManager();
    
    this.state = 'INIT';
    this.questionCount = 0;
    this.guessHistory = new Set();
    this.maxGuesses = 3;
    this.guessThresholds = [10, 15, 20];
    this.currentGuessIndex = 0;
    
    this.currentQuestion = null;
  }

  start() {
    this.state = 'QUESTIONING';
    return this.dialogue.getGreeting();
  }

  getNextQuestion() {
    const featureKey = this.engine.getBestQuestion();
    if (!featureKey || this.store.getCandidateCount() <= 1) {
      this.state = 'GUESSING';
      return { type: 'GUESS', text: this.getGuessLine() };
    }

    this.currentQuestion = featureKey;
    return { type: 'QUESTION', key: featureKey, text: this.dialogue.getQuestionText(featureKey) };
  }

  answerQuestion(featureKey, response) {
    // response: 1=Sim, 0=Não, 0.5=Não Sei
    if (response === 0.5) {
      // "Não Sei" -> ignora a pergunta (muda pra outra)
      this.engine.ignoreFeature(featureKey);
    } else {
      this.store.filter(featureKey, response);
      this.questionCount++;
    }

    // Verificar se atingimos o limite de perguntas para palpite
    const nextLimit = this.guessThresholds[this.currentGuessIndex];
    if (this.questionCount >= nextLimit || this.store.getCandidateCount() <= 1) {
      this.state = 'GUESSING';
    }
  }

  getGuessLine() {
    const candidates = this.store.activeCandidates;
    const guess = candidates[0]; // Melhor chute é o primeiro (ou único)
    if (!guess) return "Eu me rendo! Não consegui descobrir.";
    
    return this.dialogue.getGuessLine(guess.name);
  }

  getGuess() {
    return this.store.activeCandidates[0];
  }

  handleGuessResponse(isCorrect) {
    if (isCorrect) {
      this.state = 'WIN';
      return this.dialogue.getWinLine();
    } else {
      this.currentGuessIndex++;
      if (this.currentGuessIndex >= this.maxGuesses) {
        this.state = 'LOSS';
        return this.dialogue.getLossLine();
      } else {
        this.state = 'QUESTIONING';
        return this.dialogue.getWrongGuessLine();
      }
    }
  }
}

