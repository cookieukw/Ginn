export default class DialogueManager {
  constructor() {
    this.greetings = [
      "Finalmente um oponente digno! Pense em um animal e eu direi qual é em um piscar de olhos.",
      "Você acha que pode vencer a minha inteligência felina? Escolha um animal e tente a sorte!",
      "Sou o Jinn, o mestre do reino animal. Miaux! Pense em um bicho e não mude de ideia!",
      "Prepare-se para ser surpreendido. O grande Jinn está pronto para ler sua mente!"
    ];

    this.guessLines = [
      "Hum... sinto o cheiro de um... {animal}! Acertei, não foi?",
      "As pistas levam a um único lugar: você está pensando em um {animal}!",
      "Minha bola de pelos não falha: é um {animal}! Acertei?",
      "Não há como esconder de mim. É um {animal}! Acertei na mosca?",
      "Diga adeus ao segredo! Você pensou em um {animal}."
    ];

    this.wrongGuessLines = [
      "Quê? Impossível! Devo ter tido um soluço mental... vamos continuar.",
      "Ah, você está tentando me enganar? Isso só torna a vitória mais doce. Próxima pergunta!",
      "Interessante... então não é esse. Você é mais difícil do que parece, miau!",
      "Certo, certo... apenas um pequeno desvio. Deixe-me focar mais...",
      "Ora, ora! Um mestre dos disfarces? Vamos ver se essa pista ajuda..."
    ];

    this.winLines = [
      "Eu sabia! Ninguém vence o grande Jinn no meu próprio jogo!",
      "Miau! Foi fácil demais. Quer tentar de novo ou vai desistir?",
      "Mais uma vitória para a minha coleção. Sou imbatível, admita!",
      "A inteligência felina sempre prevalece. Próximo animal, por favor!"
    ];

    this.lossLines = [
      "O quê?! Como eu pude errar? Você me venceu... desta vez, humano sortudo.",
      "Inacreditável... meus sentidos falharam. Meus parabéns, você é mestre na arte de pensar em animais raros.",
      "Você ganhou... mas eu voltarei mais esperto da próxima vez! Miau!",
      "Rendido! Minha lógica foi quebrada por sua escolha. Bravo!"
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
    // featureKey format: "Attr_Name_Value" -> Attribute can have underscores
    const parts = featureKey.split('_');
    const value = parts.pop();
    const attr = parts.join('_');
    
    const templates = {
      size: 'O animal é caraterizado como {v}?',
      diet: 'Este animal é {v}?',
      habitat: 'O habitat deste animal é {v}?',
      reproduction: 'O animal é {v}?',
      locomotion: 'O animal se locomove de forma {v}?',
      color: 'A cor predominante do animal é {v}?',
      preferred_climate: 'O animal prefere o clima {v}?',
      activity_cycle: 'Este animal tem hábito {v}?',
      communication: 'O animal se comunica através de {v}?',
      territorial_behavior: 'O animal é territorialista?',
      migration: 'O animal é {v}?',
      biome: 'O animal vive no bioma {v}?',
      longevity: 'Este animal tem longevidade {v}?',
      lifespan: 'A expectativa de vida do animal é {v}?',
      gestation_period: 'O período de gestação do animal é {v}?',
      dental_formula: 'A fórmula dental do animal é {v}?',
    };

    return templates[attr] ? templates[attr].replace('{v}', value.toLowerCase()) : `O animal possui a característica ${attr}: ${value}?`;
  }

  getGuessLine(animalName) {
    return this.getRandom(this.guessLines).replace('{animal}', animalName);
  }

  getWrongGuessLine() {
    const lines = [
      'Não? Impossível... meus cálculos miau-gráficos falharam? Continuarei!',
      'Errei? Você está tentando me enganar? Vou descobrir a verdade!',
      'Miau! Essa foi difícil... mas ainda tenho cartas na manga.',
      'Hum... entendo. Deixe-me pensar mais um pouco então.',
      'Interessante... você quase me pegou, mas eu vou vencer!'
    ];
    return lines[Math.floor(Math.random() * lines.length)];
  }

  getWinLine() {
    return this.getRandom(this.winLines);
  }

  getLossLine() {
    return this.getRandom(this.lossLines);
  }
}

