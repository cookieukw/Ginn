const fs = require("fs");

// Carregando os dados do arquivo JSON
const animals = require("./oldData/animals.json");

// Mapeamento das chaves em português para inglês e camelCase
const keyMap = {
  tamanho: "size",
  dieta: "diet",
  habitat: "habitat",
  reproducao: "reproduction",
  expectativa_de_vida: "lifeExpectancy",
  locomocao: "movement",
  predadores: "predators",
  cor: "color",
  "clima preferido": "preferredClimate",
  "ciclo de atividade": "activityCycle",
  "fórmula dental": "dentalFormula",
  comunicação: "communication",
  "comportamento territorial": "territorialCamportment",
  "estratégia reprodutiva": "reproductioStrategy",
  longevity: "longevity",
  migração: "migration",
  "período de gestação": "gestationPeriod",
  bioma: "biome",
};

// Função para remover acentos mantendo as letras
function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, " ");
}

// Função para formatar um animal
function formatAnimal(animalData) {
  const formattedData = {
    name: animalData.animal.toLowerCase(),
  };

  animalData.Características.forEach(([key, value]) => {
    if (key && value) {
      const formattedKey = keyMap[key.toLowerCase()] || key;
      const formattedKeyCamelCase = removeAccents(formattedKey)
        .toLowerCase()
        .replace(/\s(.)/g, (match, chr) => chr.toUpperCase())
        .replace(/\s/g, "");

      const formattedValue = removeAccents(value)
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, ""); // Remove acentos

      // Substituir "N/A" por null
      formattedData[formattedKeyCamelCase] =
        formattedValue === "n/a" ? null : [formattedValue];
    }
  });

  return formattedData;
}

// Mapeia os animais formatados
const formattedAnimals = animals.map(formatAnimal);
fs.writeFile("./animals.json", JSON.stringify(formattedAnimals), () => {
  console.log("Arquivo salvo com sucesso");
});
