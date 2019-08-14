# Garden Dashboard _(experimental)_

This directory contains an experimental web dashboard for the Garden CLI. The dashboard is available on `localhost` when Garden is running in watch mode, e.g. `garden dev` or `garden build -w`, or when the `garden serve` command is run.

All commands below assume that the current directory is root.

## Usage

To use with the Garden CLI, simply run a Garden command in watch mode inside some Garden project. E.g:

```sh
cd examples/simple-project
garden serve
```

or alternatively

```sh
cd examples/simple-project
garden dev
```

and follow the dashboard link printed by the command.

## Develop

To develop the dashboard, first run:

```sh
cd examples/simple-project # (or some other Garden project)
garden serve # (or some watch mode command)
```

to start the `garden-service` API server. Then run:

```sh
cd dashboard
npm dev
```

to start the dashboard development server. The `start` command returns a link to the development version of the dashboard. The default is `http://localhost:3000`.

### CORS

To avoid Cross-Origin Resource Sharing (CORS) errors while developing, we proxy the request to the `garden-service` server, defaulting to port `9777`.

To ensure the `garden-service` server runs on port `9777`, start it with:

```sh
cd garden-service
GARDEN_SERVER_PORT=9777 garden serve
```

or

```sh
cd garden-service
GARDEN_SERVER_PORT=9777 garden dev
```

Alternatively, you can run the `garden-service` server as usual and set the port on the dashboard side of things:

```sh
cd dashboard
REACT_APP_GARDEN_SERVICE_PORT=my_port npm start
```

See also `src/setupProxy.js` and [Adding Custom Environment Variables](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables).

## Linking `garden-cli`

To be able to import type definitions from the `garden-cli` package, we first link it to the `dashboard` package with the `npm link` command. This step happens automatically when running `npm run dev`.

## Build

To build the dashboard, run:

```sh
cd dashboard
npm run build
```

This builds the dashboard into the `garden-service/static/dashboard` directory, from where the `garden-service` API server serves it.

## About

### Tech

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with TypeScript support. It also uses:

* [emotion v10](https://emotion.sh/) for inline styling,
* [Flexbox Grid](http://flexboxgrid.com/) for the grid system, and
* [React Router v4](https://github.com/ReactTraining/react-router) for routing.

### Structure

The app is structured into presentational components (`src/components`), container components (`src/container`), and context components (`src/contexts`).

**Presentational components:** These are re-usable UI components. They receive outside data as props and have minimal state.

**Container components:** These load data and pass to the presentational components. A container might call the API directly or obtain the data from a consumer component (or both).

**Contexts components:** [Contexts](https://reactjs.org/docs/context.html) contain "global" state that needs to be accessible by other components down the tree. The Context components use the [React Hooks API](https://reactjs.org/docs/hooks-intro.html) to create actions and manage the state that gets passed down.

Maintaining this separation will make it easier to migrate to different state management patterns/tools as the app evolves.
