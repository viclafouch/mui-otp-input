# mui-otp-input

A One-Time Password (OTP) input component for MUI (Material UI), published on NPM as `mui-one-time-password-input`.

## Project structure

- `src/` — Library source code (components, hooks, helpers)
- `docs/` — Documentation site (Docusaurus), deployed on GitHub Pages
- `.storybook/` — Storybook config for local development

## Commands

- `pnpm build` — Build the library
- `pnpm lint` — TypeScript check + ESLint
- `pnpm test` — Run tests with Vitest
- `pnpm storybook` — Local Storybook dev server
- `pnpm release -- --release-as major|minor|patch` — Bump version with standard-version

## Deploy documentation

```
cd docs && GIT_USER=viclafouch pnpm deploy
```

This builds the Docusaurus site and pushes to the `gh-pages` branch.

## Release workflow

1. Fix bugs / add features on `main`
2. Run `pnpm release -- --release-as <type>` (builds + bumps version + creates git tag)
3. `npm publish`
4. Create a GitHub Release with changelog
5. Deploy the documentation (see above)
6. Close related issues on GitHub

## Maintenance

- Monitor open issues and pull requests on GitHub
- Keep peer dependency ranges broad for consumer compatibility
- No runtime dependencies — the library is self-contained
