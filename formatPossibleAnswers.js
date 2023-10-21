const animalData = require("./animals.json");
const { log } = require("console");
const fs = require("fs");


function splitAndRemoveDuplicates(arr) {
  return [
    ...new Set(arr.map((item) => item.split(/\s+/).filter(Boolean)).flat()),
  ];
}

const answers = {};

animalData.forEach((animal) => {
  for (const key in animal) {
    if (key !== "name") {
      if (!answers[key]) {
        answers[key] = [];
      }
      if (key === "biome") {
        answers[key].push(...splitAndRemoveDuplicates(animal[key]));
      } else {
        answers[key].push(...animal[key]);
      }
      // Remover duplicatas
      answers[key] = [...new Set(answers[key])];
    }
  }
});

fs.writeFileSync("./possibleAnswers.json", JSON.stringify(answers));
