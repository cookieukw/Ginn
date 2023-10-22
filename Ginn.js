const fs = require("fs");
const readline = require("readline");
const animalsData = require("./animals.json");
const questions = require("./Questions.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const usedKeys = [];
let currentQuestionCount = 0;
let userAnswers = {};

function getRandomQuestion() {
  const keys = Object.keys(questions);
  const remainingKeys = keys.filter((key) => !usedKeys.includes(key));

  if (remainingKeys.length === 0) {
    // Perguntas esgotadas, faça a suposição
    makeGuess();
    return;
  }

  const randomKey =
    remainingKeys[Math.floor(Math.random() * remainingKeys.length)];
  usedKeys.push(randomKey);
  const questionOptions = questions[randomKey];
  const randomQuestion =
    questionOptions[Math.floor(Math.random() * questionOptions.length)];

  askQuestion(randomKey, randomQuestion);
}

function askQuestion(key, question) {
  rl.question(`${question} (sim/não/não sei) `, (answer) => {
    answer = answer.toLowerCase().trim();
    if (isValidAnswer(answer)) {
      userAnswers[key] = answer;
      currentQuestionCount++;
    } else {
      console.log("Resposta inválida. Use 'sim', 'não' ou 'não sei'.");
    }

    if (currentQuestionCount < 10) {
      getRandomQuestion();
    } else {
      makeGuess();
    }
  });
}

function isValidAnswer(answer) {
  return answer === "sim" || answer === "não" || answer === "não sei";
}

function makeGuess() {
  console.log("Adivinhando o animal...");

  // Implemente sua árvore de decisão aqui para adivinhar o animal com base nas respostas do usuário.

  rl.close();
}

getRandomQuestion();
