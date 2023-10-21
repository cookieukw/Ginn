const animalData = require("./possibleAnswers.json");
const questions = {};

for (const key in animalData) {
  if (animalData.hasOwnProperty(key)) {
    questions[key] = {};
    animalData[key].forEach((option) => {
      questions[key][option] = `O ${key} deste animal é ${option}?`;
    });
  }
}

// Agora você tem perguntas específicas para cada chave, onde a pergunta é a mesma para todas as opções dentro daquela chave.
console.log(questions);
