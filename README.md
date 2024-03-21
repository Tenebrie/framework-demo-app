# Moonflower example app

This simple application demonstrates a few different ways to use Moonflower, a type-safe Node backend framework.

See https://github.com/Tenebrie/Moonflower for Moonflower documentation.

## Exploration guide

- After pulling the repo, use `yarn` to install dependencies.
- Use `yarn start` to boot up a local development environment.
- Start with `src/routers/AuthRouter.ts` file as example.
- Feel free to modify the code to check the results, or use premade `src/routers/SandboxRouter.ts` for experimentation.
- Send requests to `localhost:3000/{yourPath}` to see the responses.
- Visit `localhost:3000/api-json` to get an OpenAPI spec of your API.
- To add new routers, do not forget to register them in `src/index.ts`.
