# Codebase Structure

**Analysis Date:** 2026-04-03

## Directory Layout

```
Ginn/
├── .planning/          # GSD planning and codebase map
├── oldData/             # Legacy or archive data files
├── Ginn.js              # Main application entry point
├── package.json         # Project metadata and dependencies
├── animals.json         # Animal knowledge base
├── Questions.json       # Question bank
├── possibleAnswers.json # Valid answer options
├── trainData.js         # Decision tree training placeholder
├── formatAnimals.js     # Data formatting utility
├── formatPossibleAnswers.js # Answer formatting utility
└── generateQuestions.js # Question generation utility
```

## Directory Purposes

**Root (/)**
- Purpose: Contains all source code, data, and configuration.
- Key files: `Ginn.js`, `package.json`.

**oldData/**
- Purpose: Storage for older versions of data or raw inputs.
- Contains: `*.json` files.

## Key File Locations

**Entry Points:**
- `Ginn.js`: CLI entry for the guessing game.

**Configuration:**
- `package.json`: Dependencies and start scripts.

**Core Logic:**
- `Ginn.js`: Game loop logic.
- `trainData.js`: Placeholder for AI/Decision Tree logic.

**Data:**
- `animals.json`: The core data for animal identification.
- `Questions.json`: The bank of questions used by the AI.

## Naming Conventions

**Files:**
- PascalCase or camelCase: `Ginn.js`, `generateQuestions.js`.
- kebab-case/camelCase mix: `package-lock.json` (std), `trainData.js`.

**Variables/Functions:**
- camelCase: `getRandomQuestion()`, `userAnswers`.

## Where to Add New Code

**Game Logic:**
- Core logic: `Ginn.js`.
- Decision Tree logic: `trainData.js`.

**Data Processing:**
- New formatting/generation scripts in root following `format*.js` naming.

**New Data:**
- Add to root JSON files or create new JSON files if extending domains.

---

*Structure analysis: 2026-04-03*
*Update when directory structure changes*
