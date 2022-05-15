# Wanderwell

Example project to build the UI of a file explorer in Vanilla JavaScript with zero-dependencies.

## Built With

- [TypeScript 4](https://www.typescriptlang.org/)
- [esbuild](https://esbuild.github.io/) to bundle for browsers
- Linting with [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
- Testing with [Jest](https://jestjs.io/docs/getting-started) (and [ts-jest](https://www.npmjs.com/package/ts-jest))
- [SCSS](https://sass-lang.com/) for CSS
- Hot reload with [live-server](https://github.com/tapio/live-server) for fast development
- Continuous integration ([GitHub Actions](https://docs.github.com/en/actions)

## Wander-what?

Since this is a file explorer, the project is named after a famous Canadian explorer named Aloha Wanderwell (aka Idris Hall) from the early 1900's. You can read more about her [here](https://www.alohawanderwell.com/).

## Getting Started

To get started after cloning the project, run these steps to open the site and play with it:

```bash
# Install dependencies
npm install

# Then to start the dev server
npm run start
```

## esbuild

[esbuild](https://esbuild.github.io/) is a modern (and extremely fast) bundler that supports [most of the TypeScript syntax](https://esbuild.github.io/content-types/#typescript). This project uses it to bundle all of the scripts for browsers.

```bash
# Execute a build with any of these commands
npm run esbuild-browser # Production
npm run esbuild-browser:dev # Development
npm run esbuild-browser:watch # Development with change monitoring
```

To generate a full build use `npm build-all` which will clean the previous outputs, and compile the scripts.

## Tests with Jest

Tests are written with Jest and are stored in the `tests` folder under the `src` directory. Each test file is a 1:1 mapping of the file it is testing and named the same with a `.test` suffix.

Run the tests with `npm test`, no separate compile step is necessary.
