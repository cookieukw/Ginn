# Architecture

**Analysis Date:** 2026-04-03

## Pattern Overview

**Overall:** Monolithic CLI Script / Data Processor

**Key Characteristics:**
- State is loaded from JSON files at startup.
- CLI-based interactive loop (`readline`).
- Data processing utilities for formatting and generating questions.

## Layers

**Application Layer:**
- Purpose: Execute the game loop and interact with the user.
- Contains: `Ginn.js`
- Depends on: Data files, `readline`.

**Data Layer:**
- Purpose: Store facts about animals and map them to questions.
- Contains: `animals.json`, `Questions.json`, `possibleAnswers.json`.
- Used by: `Ginn.js`, utility scripts.

**Utility Layer:**
- Purpose: Transform and prepare data for the application.
- Contains: `formatAnimals.js`, `formatPossibleAnswers.js`, `generateQuestions.js`.
- Depends on: `fs`, `path`.

## Data Flow

**Guessing Game Flow:**

1. User runs `node Ginn.js`.
2. App loads `animals.json` and `Questions.json`.
3. `getRandomQuestion()` selects an unasked question.
4. `askQuestion()` prompts the user via CLI.
5. User response is stored in `userAnswers`.
6. Steps 3-5 repeat 10 times or until questions run out.
7. `makeGuess()` (currently a placeholder) is invoked to identify the animal.

**State Management:**
- In-memory: `userAnswers` object stores current session answers.
- Persistent: JSON files store the knowledge base.

## Key Abstractions

**Question Bank:**
- Purpose: Collection of questions mapped by category keys.
- Examples: `Questions.json`

**Animal Profile:**
- Purpose: Set of attributes (answers to questions) for a specific animal.
- Examples: `animals.json`

## Entry Points

**Main Game:**
- Location: `Ginn.js`
- Triggers: `node Ginn.js` or `npm start`
- Responsibilities: Manage the question loop and user input.

**Data Preparation:**
- Scripts like `generateQuestions.js` transform raw data into usable formats.

## Error Handling

**Strategy:** Minimal.
- `isValidAnswer()` filters user input in `Ginn.js`.
- No explicit try/catch blocks for file operations found.

---

*Architecture analysis: 2026-04-03*
*Update when major patterns change*
