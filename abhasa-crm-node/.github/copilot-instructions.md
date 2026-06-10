# Copilot Instructions for abasa-crm-node

This file gives repository-specific guidance for future Copilot/AI sessions.

---

## Quick facts
- Tech stack: Node.js (Express) + TypeScript + Sequelize (Postgres). dotenv used for configuration.
- Location of key pieces:
  - DB config: config/database.ts
  - Models: model/mastermodel/*.model.ts
  - Associations: model/association.ts
  - Controllers: controllers/{masterController,mainController}/*Controller.ts
  - Router: router/mainrouter.ts
  - No root README, no CONTRIBUTING, and no package.json scripts at time of writing.

---

## Build / test / lint commands (repo state)
- package.json contains dependencies/devDependencies but no npm scripts (no build/test/lint defined).
- To prepare environment (manual):
  1. Install deps: `npm install`
  2. Type-check: `npx tsc --noEmit` (TypeScript is a devDependency)
  3. Run (development): either compile with `npx tsc` then run built JS, or use `npx ts-node <entry-file>` (no canonical entry file present). 
- Database: requires environment variables (see config/database.ts): DB_NAME, DB_USER, DB_PASSWORD, DB_HOST. Create a `.env` with those values.
- Tests: no test framework or tests detected. No command exists to run a single test.
- Lint: no linter configured.

Note for Copilot sessions: assume no npm scripts and look for an explicit entrypoint; if missing, ask the maintainer where the intended server bootstrap is or propose `src/index.ts` that imports config, associations, router and starts Express.

---

## High-level architecture
- Layered MVC-ish structure using Sequelize models and Express controllers.
  - Models: Each resource has a Sequelize Model in model/mastermodel/*.model.ts. Models use UUID PKs, enums are declared with DataTypes.ENUM, and timestamps are enabled.
  - Associations: Centralized in model/association.ts. Loading this file (or importing it early) is required so Sequelize relations are registered before queries with `include`.
  - Controllers: Split into `masterController` (reference/master data like Country, City, Source) and `mainController` (domain entities like Lead, Consultation, Transaction). Controllers are function-based and exported as named functions (e.g., createLead, getAllLeads).
  - Router: router/mainrouter.ts maps HTTP POST endpoints to controller functions. Many endpoints use POST for operations typically modeled as GET (e.g., listing and get-by-id are POST). Expect request data in `req.body`.
  - DB config: config/database.ts instantiates Sequelize using dotenv environment variables and dialect `postgres`.

Operational notes:
- Controllers frequently perform FK checks via `Model.findByPk(...)` before create/update.
- Controllers also implement ad-hoc enum/format validation (phone, email) inline — not using a centralized validation middleware.
- Error handling pattern: try/catch inside each controller; on error they log to console and return 500 with a generic message.

---

## Key conventions and patterns (important for Copilot)
- File & naming conventions
  - Model files live under `model/mastermodel` and export a default Sequelize Model (PascalCase class, plural tableName). Table names are explicit (e.g., `tableName: "leads"`).
  - Controllers export named async functions that accept `(req: Request, res: Response)` and return JSON.
  - Route paths are lower-case, often hyphenated or single-word, and mapped in router/mainrouter.ts (example: `/lead/create`, `/consultation/list`).

- Request shape
  - Most endpoints read input from `req.body` (including IDs for read/update/delete). Do not assume `req.params` or query string usage.

- Enum duplication
  - Enum values appear both in model definitions (DataTypes.ENUM) and repeated arrays in controllers for validation. When modifying an enum value, update both the model and any controller validation arrays.

- Associations & includes
  - Queries that return related data use `include` with models imported from model files (e.g., Lead.findAll({ include: [City, Source, Agent] })). Ensure associations are initialized before running these queries (import model/association.ts early in bootstrap).

- Database lifecycle
  - No centralized migration files detected. Models assume existing tables. Sync/migrations are not included — be cautious when running `sequelize.sync()` in a running database.

- Error/validation messaging
  - Controllers return structured JSON: { success: boolean, message: string, data?: any }. Follow this shape for new endpoints to remain consistent.

---

## Files to check when making changes
- model/association.ts — update if adding new relationships
- config/database.ts — environment vars and dialect
- controllers/*Controller.ts — copy of enums and inline validations
- router/mainrouter.ts — endpoint registration; maintain route naming consistency

---

## Helpful hints for Copilot-generated changes
- If adding a new model, add its associations in model/association.ts and import that file in the application bootstrap.
- For API endpoints: follow existing pattern (named controller exports, return { success, message, data }). Use `req.body` for inputs and validate required fields as controllers do.
- When editing enums, search both `model/*` and `controllers/*` for duplicated literal lists to keep behavior consistent.
- Always ensure environment variables for DB are present locally when running code that touches Sequelize.

---

If this file should be adjusted (more detail on routing, intended entrypoint, or scripts), say which area to expand and a preferred run command to document.
