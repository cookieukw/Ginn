export default class DialogueManager {
  constructor() {
    this.greetings = [
      "Finalmente um oponente! Pense em um animal e eu direi qual é.",
      "Você acha que pode me vencer? Pense em um animal e tente a sorte!",
      "Sou o Jinn, o mestre dos animais. Pense em um e não mude de ideia miau!"
    ];

    this.guessLines = [
      "Hum... sinto o cheiro de um... {animal}! Acertei?",
      "As pistas levam a um único lugar: você está pensando em um {animal}!",
      "Minha bola de pelos não falha: é um {animal}!"
    ];

    this.wrongGuessLines = [
      "Quê? Impossível! Vou precisar de mais pistas então...",
      "Ah, você está tentando me enganar? Vamos ver se escapa dessas perguntas...",
      "Interessante... então não é esse. Continue respondendo!"
    ];

    this.winLines = [
      "Eu sabia! Ninguém vence o grande Jinn!",
      "Miau! Foi fácil demais. Quer tentar de novo?",
      "Mais uma vitória para a minha coleção. Sou imbatível!"
    ];

    this.lossLines = [
      "O quê?! Como eu pude errar? Você me venceu... desta vez.",
      "Inacreditável... meus sentidos falharam. Parabéns, humano.",
      "Você ganhou... mas eu voltarei mais forte!"
    ];
  }

  getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  getGreeting() {
    return this.getRandom(this.greetings);
  }

  getQuestionText(featureKey) {
    // featureKey format: "Attr_Value" -> "O animal tem [Attr] [Value]?"
    // Melhores traduções baseadas no atributo:
    const [attr, value] = featureKey.split('_');
    
    const templates = {
      'Tamanho': `O animal é de tamanho ${value.toLowerCase()}?`,
      'Dieta': `O animal é ${value.toLowerCase()}?`,
      'Habitat': `O animal vive em ${value.toLowerCase()}?`,
      'Reprodução': `O animal tem reprodução ${value.toLowerCase()}?`,
      'Locomoção': `O animal é ${value.toLowerCase()}?`,
      'Cor': `O animal tem a cor ${value.toLowerCase()}?`,
      'Clima Preferido': `O animal prefere o clima ${value.toLowerCase()}?`,
      'Ciclo de Atividade': `O animal tem ciclo de atividade ${value.toLowerCase()}?`,
      'Comunicação': `O animal se comunica através de ${value.toLowerCase()}?`,
      'Comportamento Territorial': `O animal é territorialista?`,
      'Migração': `O animal é ${value.toLowerCase()}?`,
      'Bioma': `O animal vive no bioma ${value.toLowerCase()}?`
    };

    return templates[attr] || `O animal tem ${attr}: ${value}?`;
  }

  getGuessLine(animalName) {
    return this.getRandom(this.guessLines).replace('{animal}', animalName);
  }

  getWrongGuessLine() {
    return this.getRandom(this.wrongGuessLines);
  }

  getWinLine() {
    return this.getRandom(this.winLines);
  }

  getLossLine() {
    return this.getRandom(this.lossLines);
  }
}

