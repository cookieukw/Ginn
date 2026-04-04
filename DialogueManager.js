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
    const [attr, value] = featureKey.split('_');
    
    const templates = {
      'Tamanho': `O animal é de tamanho ${value.toLowerCase()}?`,
      'Dieta': `O animal é ${value.toLowerCase()}?`,
      'Habitat': `O animal vive em ${value.toLowerCase()}?`,
      'Habitat': 'O habitat deste animal é {v}?',
      'Reprodução': 'O animal é {v}?',
      'Locomoção': 'O animal se locomove de forma {v}?',
      'Tamanho': 'O animal é caraterizado como {v}?',
      'Dieta': 'Este animal é {v}?',
      'Cor': 'A cor predominante do animal é {v}?',
      'Clima Preferido': `O animal prefere o clima ${value.toLowerCase()}?`,
      'Ciclo de Atividade': 'Este animal tem hábito {v}?',
      'Comunicação': `O animal se comunica através de ${value.toLowerCase()}?`,
      'Comportamento Territorial': `O animal é territorialista?`,
      'Migração': `O animal é ${value.toLowerCase()}?`,
      'Bioma': `O animal vive no bioma ${value.toLowerCase()}?`
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

