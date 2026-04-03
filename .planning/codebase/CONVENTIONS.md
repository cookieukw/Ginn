# Coding Conventions

**Analysis Date:** 2026-04-03

## Naming Patterns

**Files:**
- Mixed camelCase and PascalCase (e.g., `generateQuestions.js` vs `Ginn.js`).
- Data files in PascalCase or lowercase (e.g., `Questions.json` vs `animals.json`).

**Functions:**
- camelCase for all functions (e.g., `getRandomQuestion`).
- Imperative naming (e.g., `askQuestion`, `makeGuess`).

**Variables:**
- camelCase for variables (e.g., `usedKeys`, `currentQuestionCount`).
- `const` preferred for requires and configurations.

## Code Style

**Formatting:**
- No explicit Prettier or ESLint config found.
- 2-space indentation (observed in `Ginn.js`).
- Single quotes for strings in some files, double quotes in others (inconsistent).
- Semicolons are used following Standard JS/Node.js practices.

**Modularization:**
- CommonJS `require()` is used for module loading and JSON imports.
- Global-like scope variables used in `Ginn.js` (`usedKeys`, `userAnswers`).

## Import Organization

**Order:**
1. Built-in Node.js modules (`fs`, `readline`).
2. Local data files (`animals.json`, `Questions.json`).
3. (In `trainData.js`) External packages (`decision-tree`).

## Error Handling

**Patterns:**
- Minimal validation on input (checking against "sim/não/não sei").
- No observed try/catch blocks for IO or JSON parsing.

## Logging

**Patterns:**
- Direct `console.log` for output to the user.
- No structured logging or logging levels.

## Comments

**Usage:**
- Sparse. Used for placeholders (`// Implemente sua árvore...`) or marking logic sections.

## Function Design

**Style:**
- Sequential event handling via callbacks (Readline interface).
- Functions depend on external state (`userAnswers`, `rl`).

---

*Convention analysis: 2026-04-03*
*Update when patterns change*
