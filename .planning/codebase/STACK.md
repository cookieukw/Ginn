# Technology Stack

**Analysis Date:** 2026-04-03

## Languages

**Primary:**
- JavaScript (ES6+) - All application code and utilities.

**Secondary:**
- JSON - Data storage for animals, questions, and answers.

## Runtime

**Environment:**
- Node.js (Version unknown, likely latest LTS)
- CLI environment (Readline interface)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- None (Vanilla Node.js)

**Testing:**
- None identified

**Build/Dev:**
- nodemon - Used for development to auto-restart the application.

## Key Dependencies

**Critical:**
- `decision-tree` (^0.3.7) - Intended for the core logic of animal guessing.
- `binary-tree` (^0.2.0) - Likely used or intended for structured data traversal.

**Infrastructure:**
- `fs` (Node.js built-in) - File system operations for data persistence.
- `readline` (Node.js built-in) - CLI user interaction.

## Configuration

**Environment:**
- No environment variables found.

**Build:**
- No build step (direct execution via Node.js).

## Platform Requirements

**Development:**
- Any platform with Node.js installed.

**Production:**
- Node.js environment.

---

*Stack analysis: 2026-04-03*
*Update after major dependency changes*
