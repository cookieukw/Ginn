import DialogueManager from './DialogueManager.js';

// Limites de perguntas antes de cada tentativa de palpite.
// Index 0 → 1º palpite, Index 1 → 2º palpite, Index 2 → 3º palpite.
const GUESS_THRESHOLDS = [15, 20, 25];

export default class GameController {
  constructor(store, engine) {
    this.store = store;
    this.engine = engine;
    this.dialogue = new DialogueManager();

    this.state = 'INIT';
    this.questionCount = 0;
    this.maxGuesses = GUESS_THRESHOLDS.length;
    this.currentGuessIndex = 0;

    /**
     * null  → jogo ainda não terminou
     * true  → Jinn acertou
     * false → usuário venceu
     */
    this.isWin = null;

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
    return {
      type: 'QUESTION',
      key: featureKey,
      text: this.dialogue.getQuestionText(featureKey),
    };
  }

  answerQuestion(featureKey, response) {
    // response: 1=Sim, 0=Não, 0.5=Não Sei
    if (response === 0.5) {
      // "Não Sei" → ignora a feature e passa para outra pergunta
      this.engine.ignoreFeature(featureKey);
    } else {
      this.store.filter(featureKey, response);
      this.questionCount++;
    }

    const nextLimit = GUESS_THRESHOLDS[this.currentGuessIndex];
    if (this.questionCount >= nextLimit || this.store.getCandidateCount() <= 1) {
      this.state = 'GUESSING';
    }
  }

  /**
   * Retorna o animal candidato com maior probabilidade (primeiro da lista filtrada).
   * @returns {object|null}
   */
  getGuess() {
    return this.store.activeCandidates[0] ?? null;
  }

  getGuessLine() {
    const guess = this.getGuess();
    if (!guess) return 'Eu me rendo! Não consegui descobrir.';
    return this.dialogue.getGuessLine(guess.name);
  }

  getState() {
    if (this.state === 'WIN' || this.state === 'LOSS') return 'FINISHED';
    return this.state;
  }

  getNextLimit() {
    return GUESS_THRESHOLDS[this.currentGuessIndex] ?? GUESS_THRESHOLDS.at(-1);
  }

  handleGuessResponse(isCorrect) {
    if (isCorrect) {
      this.state = 'WIN';
      this.isWin = true;
      return this.dialogue.getWinLine();
    }

    const wrongGuess = this.getGuess();
    if (wrongGuess) {
      this.store.removeCandidate(wrongGuess.name);
    }

    this.currentGuessIndex++;
    if (this.currentGuessIndex >= this.maxGuesses) {
      this.state = 'LOSS';
      this.isWin = false;
      return this.dialogue.getLossLine();
    }

    this.state = 'QUESTIONING';
    return this.dialogue.getWrongGuessLine();
  }

  reset() {
    this.store.reset();
    this.engine.reset();
    this.state = 'INIT';
    this.questionCount = 0;
    this.currentGuessIndex = 0;
    this.isWin = null;
    this.currentQuestion = null;
  }
}
