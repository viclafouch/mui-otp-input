---
name: bootstrap-mui-lib
description: Full bootstrap of a MUI component library project — setup Claude Code config, copy rules, upgrade dependencies, review codebase, audit docs, and triage GitHub issues. Designed for mui-color-input, mui-otp-input, and similar MUI input libraries.
user-invocable: true
---

# Bootstrap MUI Library Project

Complete setup and modernization of a MUI component library. This skill runs through all steps sequentially — confirm with the user before moving to the next phase.

## Context & References

**Owner**: viclafouch (Victor de la Fouchardiere)
**GitHub org**: https://github.com/viclafouch
**NPM**: https://www.npmjs.com/~viclafouch

**Source project** (already modernized — use as reference for everything):
- Local: `/Users/victordelafouchardiere/Desktop/mui/mui-tel-input`
- GitHub: https://github.com/viclafouch/mui-tel-input

**Key reference files in source project:**
- Rules: `/Users/victordelafouchardiere/Desktop/mui/mui-tel-input/.claude/rules/*.md`
- Upgrade skill: `/Users/victordelafouchardiere/Desktop/mui/mui-tel-input/.agents/skills/upgrade-mui-lib/SKILL.md`
- CLAUDE.md template: `/Users/victordelafouchardiere/Desktop/mui/mui-tel-input/CLAUDE.md`
- ESLint config (target state): `/Users/victordelafouchardiere/Desktop/mui/mui-tel-input/eslint.config.js`
- Vite config (target state): `/Users/victordelafouchardiere/Desktop/mui/mui-tel-input/vite.config.ts`
- tsconfig (target state): `/Users/victordelafouchardiere/Desktop/mui/mui-tel-input/tsconfig.json`
- tsconfig.node (target state): `/Users/victordelafouchardiere/Desktop/mui/mui-tel-input/tsconfig.node.json`
- Docusaurus config (target state): `/Users/victordelafouchardiere/Desktop/mui/mui-tel-input/docs/docusaurus.config.ts`

**Target MUI library projects** (same architecture, same tooling):
- `/Users/victordelafouchardiere/Desktop/mui/mui-color-input` → https://github.com/viclafouch/mui-color-input
- `/Users/victordelafouchardiere/Desktop/mui/mui-otp-input` → https://github.com/viclafouch/mui-otp-input
- Other MUI input libraries in the same `Desktop/mui/` directory

**Tech stack (target state after upgrade):**
- Vite 8 (Rolldown), Vitest 4, TypeScript 6, React 19, MUI v7
- Storybook 10, jsdom 29, ESLint 9 + eslint-config-viclafouch 5
- Docusaurus 3.9 for docs, deployed to GitHub Pages via `gh-pages` branch
- `standard-version` for releases, `husky` for git hooks

**Key decisions made during mui-tel-input modernization:**
- ESLint 10 is blocked by `eslint-plugin-import` — stay on ESLint 9
- Docusaurus stays on TypeScript 5 (no TS 6 support yet)
- `rollup-plugin-peer-deps-external` replaced by manual externalization in Vite config
- `skipLibCheck: true` required because Storybook 10 brings `ast-types` with broken declarations
- `@types/node` moved from `dependencies` to `devDependencies`

## Phase 0 — Detect project specifics

Before anything, detect the project's setup:

```bash
# Package manager
PM="npm"; if [ -f pnpm-lock.yaml ]; then PM="pnpm"; elif [ -f yarn.lock ]; then PM="yarn"; fi; echo "Package manager: $PM"

# Default branch
git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@'

# ESLint config filename
ls eslint.config.* 2>/dev/null

# Repo name (for gh commands)
gh repo view --json nameWithOwner -q '.nameWithOwner'
```

Use the detected package manager (`npm` or `pnpm`) for ALL commands throughout the skill. Replace `npm install` with `pnpm add`, `npm run` with `pnpm`, etc. as needed.

Use the detected repo name for all `gh issue` and `gh pr` commands.

---

## Phase 1 — Setup Claude Code configuration

### 1.1 Create CLAUDE.md

Create a `CLAUDE.md` at the project root following this structure (adapt the package name and description):

```markdown
# <package-name>

<One-line description>, published on NPM as `<package-name>`.

## Project structure

- `src/` — Library source code (components, hooks, helpers)
- `docs/` — Documentation site (Docusaurus), deployed on GitHub Pages
- `.storybook/` — Storybook config for local development

## Commands

- `npm run build` — Build the library
- `npm run lint` — TypeScript check + ESLint
- `npm test` — Run tests with Vitest
- `npm run storybook` — Local Storybook dev server
- `npm run release -- --release-as major|minor|patch` — Bump version with standard-version

## Deploy documentation

\`\`\`
cd docs && GIT_USER=viclafouch npm run deploy
\`\`\`

This builds the Docusaurus site and pushes to the `gh-pages` branch.

## Release workflow

1. Fix bugs / add features on `master`
2. Run `npm run release -- --release-as <type>` (builds + bumps version + creates git tag)
3. `npm publish`
4. Create a GitHub Release with changelog
5. Deploy the documentation (see above)
6. Close related issues on GitHub

## Maintenance

- Monitor open issues and pull requests on GitHub
- Keep peer dependency ranges broad for consumer compatibility
- Runtime dependencies are bundled into the library output
```

### 1.2 Copy rules

Copy the rules directory from the reference project:

```bash
mkdir -p .claude/rules
cp /Users/victordelafouchardiere/Desktop/mui/mui-tel-input/.claude/rules/*.md .claude/rules/
```

These rules cover: code style, comments, TypeScript, testing, frontend, git, documentation.
Do NOT modify the rules — they are shared across all MUI library projects.

### 1.3 Copy skills

Copy the upgrade skill from the reference project:

```bash
mkdir -p .agents/skills
cp -r /Users/victordelafouchardiere/Desktop/mui/mui-tel-input/.agents/skills/upgrade-mui-lib .agents/skills/
mkdir -p .claude/skills
ln -s ../../.agents/skills/upgrade-mui-lib .claude/skills/upgrade-mui-lib
```

### 1.4 Confirm with user

Tell the user: "Phase 1 complete — CLAUDE.md, rules, and skills are set up. Ready for Phase 2 (dependency upgrades)?"

---

## Phase 2 — Upgrade dependencies

Read the upgrade skill first for full context:
```bash
cat /Users/victordelafouchardiere/Desktop/mui/mui-tel-input/.agents/skills/upgrade-mui-lib/SKILL.md
```

Then run the `/upgrade-mui-lib` skill. This handles:

- All minor/patch updates
- Vite 6→8 (Rolldown, manual externalization, `import.meta.dirname`)
- Vitest 3→4 (exclude defaults, mock restore)
- TypeScript 5→6 (remove `baseUrl`, explicit paths, bundler moduleResolution)
- ESLint config viclafouch 4→5 (named exports, new configs)
- Storybook 8→10 (via `npx storybook@latest upgrade`)
- jsdom 26→29
- @types/node moved to devDependencies
- Docs folder: Docusaurus 3.7→3.9, deprecated config migration

### 2.1 Fix test warnings after upgrade

After upgrades, run tests verbosely to check for warnings:

```bash
npx vitest run --reporter=verbose 2>&1 | grep "stderr"
```

**Common issues found during mui-tel-input modernization:**

#### Act warnings ("not wrapped in act")
This is the most common issue. `fireEvent.click` is synchronous and doesn't wrap state updates in `act()`. Fix by converting test helpers to use `userEvent`:

```ts
// Before (causes act warnings):
export function selectCountry(isoCode: MuiTelInputCountry): void {
  fireEvent.click(getButtonElement())
  fireEvent.click(screen.getByTestId(`option-${isoCode}`))
}

// After (properly wrapped):
export async function selectCountry(isoCode: MuiTelInputCountry): Promise<void> {
  const user = userEvent.setup()
  await user.click(getButtonElement())
  await user.click(screen.getByTestId(`option-${isoCode}`))
}
```

Then add `await` to ALL callers and make those tests `async`.

#### Mock accumulation across tests (Vitest 4 behavior change)
`vi.restoreAllMocks()` no longer resets spy state automatically. Add explicit cleanup:

```ts
afterEach(() => {
  vi.restoreAllMocks()
})
```

#### Console.error noise in tests
When a test intentionally triggers `console.error` (e.g., testing invalid locale fallback), suppress it:

```ts
const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
// ... test code ...
expect(consoleSpy).toHaveBeenCalledTimes(1)
consoleSpy.mockRestore()
```

#### `getByRole('presentation')` conflicts with decorative images
Images with `alt=""` get `role="presentation"` in the accessibility tree. If tests use `getByRole('presentation')` to find MUI Menu/Backdrop, switch to `getByRole('listbox')` for the menu list.

#### Deprecated test matchers
- `toBeCalledTimes` → `toHaveBeenCalledTimes`
- `toBeCalledWith` → `toHaveBeenCalledWith`

### 2.2 Verify everything passes

```bash
npm run lint
npm run build
npx vitest run
npx vitest run --reporter=verbose 2>&1 | grep "stderr"  # should output nothing
cd docs && npm run build
```

### 2.3 Confirm with user

Tell the user: "Phase 2 complete — all dependencies upgraded, lint/build/tests pass, zero test warnings. Ready for Phase 3 (codebase review)?"

---

## Phase 3 — Codebase review against rules

Review the ENTIRE `src/` directory against the project rules (`.claude/rules/`). Launch 3 review agents in parallel:

### Agent 1: Components + main entry
Review all files in `src/components/` and `src/index.tsx`, `src/index.types.ts` for rule violations.

### Agent 2: Shared helpers, hooks, constants
Review all files in `src/shared/` for rule violations.

### Agent 3: Test files
Review all `*.test.*` files and `src/testUtils/` for rule violations.

Each agent checks against ALL rules from `.claude/rules/`. Read them first for full context:
```bash
cat .claude/rules/code-style.md .claude/rules/typescript.md .claude/rules/comments.md .claude/rules/testing.md .claude/rules/frontend.md
```

Key rules to enforce:
- **Code style**: arrow functions block body, ternary over `&&`, no single-letter vars, max 2 params, no mutations, eslint-disable with reasons only
- **TypeScript**: trust inference, derive types from source, `as const satisfies`
- **Comments**: no redundant comments, no commented-out code, code should be self-documenting
- **Testing**: descriptive names, mock resets, no commented-out tests

### Common findings from mui-tel-input review (expect similar issues):

**Comments to remove:**
- Comments that repeat what the code does (e.g., `// formatted : e.g: +33 6 26 92..` before `formattedValue`)
- Commented-out test code — delete entirely, don't keep "for later"
- Comments like `// assign`, `// call` that narrate the code

**ESLint disables to fix:**
- Every `eslint-disable-next-line` MUST have a reason: `// eslint-disable-next-line rule-name -- reason here`
- Never disable at file level except `no-console`

**ESLint config overrides typically needed for these projects:**
- `unicorn/filename-case: 'off'` — PascalCase is the React component convention
- `max-lines-per-function: 'off'` for test files
- `testing-library/no-node-access: 'off'` for test files and testUtils
- `no-restricted-syntax` inline disable for justified `React.useMemo` (e.g., `Intl.DisplayNames` is expensive)

**Watch out for autofix side effects:**
- `interface` → `type` autofix (`@typescript-eslint/consistent-type-definitions`) — **REVERT on exported interfaces** that consumers may use for declaration merging
- `[...arr].sort()` → should become `arr.toSorted()`, NOT `[...arr].toSorted()` (double allocation)
- Import reordering is safe to autofix

**Efficiency patterns to check:**
- Cache repeated `displayNames.of(isoCode)` calls in a variable (called 3x in FlagButton)
- Extract duplicated logic into helpers (e.g., shared calling code comparison → `matchIsSharedCallingCode`)
- No object mutations — use spread: `{ ...obj, key: newValue }` instead of `obj.key = newValue`

After agents complete, fix all valid findings. Skip false positives.

Then run `/simplify` to verify the fixes.

### 3.1 Confirm with user

Tell the user: "Phase 3 complete — codebase reviewed and cleaned. Ready for Phase 4 (documentation audit)?"

---

## Phase 4 — Documentation audit

### 4.1 Review all markdown docs

Launch 3 review agents on `docs/docs/*.md`:

**Agent 1 — Consistency**: Import styles, variable naming, cross-linking, frontmatter, sidebar positions.

**Agent 2 — Accuracy**: Every documented prop exists in source, types are correct, defaults match, code examples compile, missing props/exports.

**Agent 3 — Completeness**: Peer deps mentioned, common use cases covered, grammar, broken links, Next.js config modern (ESM).

### 4.2 Common documentation issues found in mui-tel-input (expect similar):

**api-reference.md:**
- Missing `onBlur` prop documentation (it exists in source but was never documented)
- `unknownFlagElement` default may show `alt="unknown"` instead of `alt=""`
- `onChange` example missing `numberType` field in the info object
- Check every prop documented matches the actual source types and defaults

**typescript.md:**
- Missing type exports: `MuiTelInputProps`, `MuiTelInputReason` are exported but not listed
- Sidebar position may conflict with another page (both claiming same position)

**css.md:**
- Typo: "differents" → "different"
- Typo: "styled-component" → "styled-components" (plural)
- Class name in example may not match exported constant (e.g., `classes.flag` vs `classes.flagContainer`)

**getting-started.md:**
- Missing peer dependencies list
- Next.js config uses `module.exports` instead of `export default`

**inheritance.md:**
- MUI link may use old URL (`/api/text-field` instead of `/material-ui/api/text-field/`)

**continent-codes.md / country-codes.md:**
- Check for duplicate entries

**General:**
- All `sidebar_position` values must be unique
- Files without frontmatter should get one

### 4.3 Fix findings

Apply all valid fixes. Rebuild docs to verify:

```bash
cd docs && npm run build
```

Must succeed with zero warnings.

### 4.4 Also review README.md

Use the reference README for comparison:
```bash
cat /Users/victordelafouchardiere/Desktop/mui/mui-tel-input/README.md
```

Check:
- MUI link points to `https://mui.com/`
- Installation command is simple (`npm install <pkg>`)
- Next.js config uses `export default` and `next.config.mjs`
- No outdated version numbers
- Keep emojis if the project already uses them (Bugs, Feature Requests sections)

### 4.5 Confirm with user

Tell the user: "Phase 4 complete — documentation reviewed and fixed. Ready for Phase 5 (issues & PR triage)?"

---

## Phase 5 — GitHub issues & PR triage

### 5.1 List open issues and PRs

```bash
gh issue list --repo viclafouch/<repo-name> --state open --limit 30 --json number,title,createdAt
gh pr list --repo viclafouch/<repo-name> --state open --json number,title,createdAt
```

### 5.2 Analyze each issue

For each open issue, fetch full details:

```bash
gh issue view <number> --repo viclafouch/<repo-name>
```

Categorize each issue:
- **Already fixed** by the dependency/codebase updates → comment with commit ref, close
- **Easy fix** (< 30 min) → flag for user approval to fix
- **Already available** (feature request for existing functionality) → comment explaining how, close
- **Stale / no demand** → flag for user to decide
- **Complex / out of scope** → leave open, no action

### 5.3 Present triage to user

Present a summary table:

| Issue | Title | Recommendation | Action |
|-------|-------|----------------|--------|

Then ask: "Which issues should I fix, close, or leave open?"

### 5.4 Execute user decisions

For each issue the user wants closed:
- Write a professional English comment explaining the resolution
- Close with appropriate reason (`completed` or `not planned`)

For each issue the user wants fixed:
- Implement the fix
- Add tests
- Run lint + build + tests
- Comment on the issue with the commit reference

### 5.5 Confirm with user

Tell the user: "Phase 5 complete — issues triaged. Ready to commit and release?"

---

## Phase 6 — Commit and prepare release

### 6.1 Commit all changes

Create focused commits:
1. `chore: setup Claude Code configuration` (CLAUDE.md, rules, skills)
2. `feat!: upgrade all dependencies to latest major versions` (deps + config migrations)
3. `chore: codebase review cleanup following project rules` (code quality fixes)
4. `fix: <specific bug fixes from issues>` (one commit per fix or group)
5. `docs: fix documentation accuracy and completeness` (doc fixes)

### 6.2 Provide release notes

Generate GitHub Release markdown following the project's existing format (check previous releases with `gh release list`).

### 6.3 Remind user of remaining manual steps

- `npm run release -- --release-as major`
- `npm publish`
- Create GitHub Release with the provided markdown
- `cd docs && GIT_USER=viclafouch npm run deploy`
- Update `mui-<name>` version in `docs/package.json` after npm publish

---

## Rules

- Always confirm with the user between phases — never auto-proceed
- Write all GitHub comments in professional English
- Never push to remote without user approval
- Keep peer dependency ranges broad
- This is a LIBRARY — never bundle peer dependencies
- The reference project (`/Users/victordelafouchardiere/Desktop/mui/mui-tel-input`) is the source of truth for rules, skills, and target config state. When in doubt, read the reference file and match it.
