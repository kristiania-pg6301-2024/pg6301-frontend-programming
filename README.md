# Lecture 1: Deploy a minimal application to Heroku

## Creating the client:

### Setting up the client project

1. `git init`: Create this as a Git project
2. `mkdir client`: create a directory for the client part of the application
3. `cd client`: go into the client directory
   1. `npm init`: create a `package.json` file which contains scripts and dependencies
   2. `npm install --save-dev vite`: add [Vite](https://vitejs.dev/) as a tool to build the frontend during development
   3. `npm install react`: add [React](https://react.dev/) as a library to be included in the application
   4. `npm install react-dom`: by default React doesn't include the binding to HTML. This is included in [React-dom](https://react.dev/reference/react-dom)
   5. `npm pkg set scripts.dev="vite"`: add a script to run vite with `npm run dev`
   6. `npm run dev`: start Vite, so you can access the application on http://localhost:5173/
4. `git commit`: commit the changes to git. Make sure you add `node_modules/` to `.gitignore`

### [client/index.html](./client/index.html): starting HTML file

This file is the starting point for Vite. The most important part of the contents is the section
`<script src="src/main.jsx" type="module"></script>` which loads our React code in `src/main.jsx`,
and `<div id="root"></div>` which is the entry point where our React app should live.

### [main.jsx](./client/src/main.jsx): The entry point for our React application

This file contains two React components: [`<TaskManagerApplication />`](./client/src/main.jsx#L31)
and [`<AddTaskForm />`](./client/src/main.jsx#L6).
TaskManagerApplication keeps the tasks for the application using the `useState` hook and loads
the initial tasks from the server using `useEffect`. AddTaskForm keeps track of the form data for
the new task using `useState` and calls `onAddTask` to let TaskManagerApplication know when the
user has pushed submit.

## Creating the server

### Setting up the server project

1. From the root directory: `mkdir server`: create a directory for the server part
2. `cd server`: go into the server directory
   1. `npm init`: create a `package.json` file for scripts and dependencies
   2. `npm install express`: add the [Express](https://expressjs.com/) web framework as a library in be included in the server
   3. `npm pkg set type=module`: make it possible to use `import` in `server.js`
   4. `npm pkg set scripts.dev="node server.js"`: setup so running `npm run dev` starts `server.js`

### [server/server.js](./server/server.js): The server code

This file is a script to be run with `node`. It starts up an Express server (by default on port 3000) and adds
the API calls "GET /api/tasks" and "POST /api/tasks". Since the POST action uses a JSON body, we must add
body parsing "middleware" with `app.use(express.json())`

### For development: make Vite forward calls to "/api" to Express with [vite.config.js](./client/vite.config.js)

Since we're accessing the web application on port 5173, we need Vite to forward some requests to our server.

## Deploying to Heroku

### Prepare the application

Heroku automatically builds and runs our application when we push to it using git. For a Node application,
Heroku will run `npm run build` when we first push the application and `npm start` to start the application.
To make this all work, we need to set up the **top level** NPM project.

1. `npm init`: create `package.json` at top level for the scripts to be run by Heroku
2. `npm pkg set scripts.build="npm run build:client && npm run build:server"`: When Heroku runs `npm build`, we need 
   to build both the server and the client
3. `npm pkg set scripts.build:client="cd client && npm install --include=dev && npm run build"`: when we build the
   client, we need to go into the client directory, run `npm install`, but include development dependencies
   (specifically Vite) and run `npm run build`
4. `cd client`: we need to add the `build` script in the client directory
   1. `npm pkg set scripts.build="vite build"`: building the client means running `vite build`, which
      puts the finished JavaScript in the `client/dist`-directory. This directory should be added to `.gitignore`
   2. `cd ..`: (this is all we need to do with the client)
5. `npm pkg set scripts.build:server="cd server && npm install`: when we build the server, we only need to install
   library dependencies (specifically Express)
6. `npm pkg set scripts.start="cd server && npm start"`: To start the application as a whole, we need to start the server

On Heroku, we are not running Vite to serve the HTML-files. Instead, we create static HTML, CSS and JavaScript
with `npm run build` and Express serves these files as static resources. We need to add the following to
`server/server.js`:

```js
app.use(express.static("../client/dist"));
```

We also need to let Heroku decide which port we should start on. This is used by looking at the `process.env.PORT`
environment variable:

```js
app.listen(process.env.PORT || 3000);
```

Remember to `git commit` after all this.

### We can now deploy to Heroku

1. Go to the [Heroku website](https://www.heroku.com/) and sign up for a new account
2. Install the [Heroku command line interface (CLI) application](https://devcenter.heroku.com/articles/heroku-cli)
3. Create a new application in the [Heroku Dashboard](https://dashboard.heroku.com/)
4. On the command line: add Heroku as a remote git repository and push to it:
   1. `heroku login`: opens the web browser to let you log in
   2. `heroku git:remove -a <you app name>`: This is the same as running `git remote add heroku <your heroku repository>`
   3. `git push heroku main`: this pushes your code to Heroku, which will trigger `npm run build`
   4. `heroku open`: opens a web browser with your Heroku website
   5. `heroku logs --tail`: shows the logs from the Heroku server

