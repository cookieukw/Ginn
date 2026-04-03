# Codebase Concerns

**Analysis Date:** 2026-04-03

## Tech Debt

**Incomplete Core Logic:**
- Issue: `makeGuess()` in `Ginn.js` is a placeholder.
- Why: Logic for making a final guess based on collected answers is not yet implemented.
- Impact: The application collects data but cannot achieve its primary goal (guessing the animal).
- Fix approach: Implement a decision tree traversal or matching algorithm using `decision-tree` or custom logic.

**Monolithic Script State:**
- Issue: Shared global state in `Ginn.js` (`usedKeys`, `userAnswers`).
- Why: Primitive script design.
- Impact: Hard to test individual components or reuse logic.
- Fix approach: Refactor state into a class or state machine.

## Known Bugs

**None Documented:**
- The current implementation is too minimal to have surfaced complex bugs, but the "Guessing" feature is fundamentally missing.

## Security Considerations

**Unsafe Input Handling:**
- Risk: While limited to "sim/não/não sei", direct CLI input processing can be fragile.
- current mitigation: `isValidAnswer` check.

## Performance Bottlenecks

**Data Loading:**
- Problem: Large JSON files (`animals.json` is ~31KB) are loaded synchronously at startup.
- Impact: Negligible for current scale, but could grow.

## Fragile Areas

**Data Synchronicity:**
- Why fragile: If `Questions.json` contains a key that is missing from an animal's profile in `animals.json`, the guessing logic might fail.
- Test coverage: None.

## Missing Critical Features

**Matching Algorithm:**
- Problem: No logic to compare `userAnswers` with `animals.json`.
- Blocks: The entire game loop's objective.

**Learning Mechanism:**
- Problem: No way to add new animals or questions if the AI fails.
- Blocks: Long-term utility and "AI" feel.

## Test Coverage Gaps

**Entire Codebase:**
- What's not tested: Everything.
- Risk: Changes to data format or core loop can break the app unnoticed.
- Priority: High.

---

*Concerns audit: 2026-04-03*
*Update as issues are fixed or new ones discovered*
