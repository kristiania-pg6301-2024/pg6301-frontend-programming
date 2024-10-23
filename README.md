# PG6301 Web Development and API design

Welcome to this course in Web Development and API Design. In this course, we will
look at creating single-page applications with React backed by APIs implemented
with React. The application will store data in MongoDB and be deployed on Heroku

* [Lectures](#lectures)
* [Reference material](#course-reference-material)

## Understanding the course

In this course, we expect you to become proficient at building web applications
with JavaScript, React and Express. During the lectures, you will see live coding
of how such applications may be constructed and many topics will be explained
along the way.

The course will not have slides, but all the lectures will be recorded and made
available on Canvas. Each lecture will consist of 10-15 commits which will be
available on GitHub for student's reference.

There are many topics that we believe are more suitable for self-study than
classroom explanations, and you will not always be shown how all topics are used
in a more general situation. *You will be expected to master some such topics
to get a top grade at the exam*. In order to be prepared for the exam, you have
to follow the lectures, but you also have to be able to solve new problems and
find relevant information along the way. To be able to do this, it's extremely
valuable for you to follow the exercises along the lectures.

The lectures will be recorded and the recordings will be available in Panopto in Canvas.

### The example applications

In the course we will mainly be building two example applications:

* The todo-application: This is a very common example, and you can see lots of examples
  using this online. The application lets to users create tasks and mark them as
  complete. In addition, we will be adding details to the tasks and give access to
  tasks to other users
* Cash accounting: The teacher serves as treasurer for the local school marching band.
  On the annual dugnads they need to keep track of cash sales, something that most
  accounting software isn't good at. So we're using this chance to build a application
  with a real need.

## Lectures

### Lecture 1: A tour of React, Express and Heroku

<details>

[Mentimenter](https://www.menti.com/alkd1oaizxmy)

We explore the most important parts to the whole application up and running on
a server. This lecture will be *way too fast to understand* and will serve merely
as a teaser to topics that will be important through the course. After the
lecture, you will only be expected to know the basics of how to create a React
application with Vite and React Router

* [Commit log from lecture (only available after lecture)](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/commits/lecture/01)
* [Reference implementation](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/reference/01) [deployed app](https://pg6301-reference-01-e3c9a1cd874d.herokuapp.com/)
* [Exercise text](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/blob/exercise/01/start/README.md)

</details>
<details>
<summary>Material from previous years</summary>

#### Material from previous years

* [Commit log from live coding](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/lectures/01)
* [Commit log from lecture (only available after lecture)](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/lecture/01)
* [Reference implementation](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/tree/reference/01)
* [Exercise text](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/tree/exercise/01/start/README.md)
* [Exercise answer](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/exercise/01/solution)

</details>

### Lecture 2: React, use state and props

<details>

[Mentimenter](https://www.menti.com/al36tnmnnr2g)

We will review the React topics from the last lecture: Creating a React app,
creating functional components and using props, state and effects. We will
also explore React Router more in depth

See [Creating the frontend project](#creating-the-frontend-project) for a summary of the steps to set up the application

* [Code from the lecture](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/commits/lecture/02)
* [Reference implementation](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/reference/02)
* [Exercise text](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/blob/exercise/02/start/README.md) - [Solution](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/exercise/02/solution)

#### Reference material

* [Fireship: React in 100 seconds](https://youtu.be/Tn6-PIqc4UM)
* [Fireship: every React hook](https://youtu.be/TNhaISOUy6Q)

</details>
<details>

<summary>Material from previous years</summary>

* [Commit log from lecture (only available after lecture)](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/lecture/02)
* [Reference implementation](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/tree/reference/02)
* [Exercise text](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/tree/exercise/02/start/README.md)
* [Exercise solution](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/exercise/02/solution)

</details>

### Lecture 3: useEffect, useRef and React Router

<details>

We will continue on the React topics from the last lecture of creating components.
We will use the `useEffect` and `useRef` hooks to set up interaction between our app and the DOM-objects in the browser
and start to look at React Router.

* [Code from the lecture](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/commits/lecture/03)
* [Reference implementation (with lecture 2)](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/reference/02)
* [Exercise text - continued](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/blob/exercise/03/start/README.md) - [Solution](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/exercise/02/solution)

#### Reference material

* [Fireship: every React hook](https://youtu.be/TNhaISOUy6Q)

</details>

### Lecture 4: Implementing a React backend on Express

<details>

[Mentimenter](https://www.menti.com/alax91fi8cus)

We will create an Express server which serves a React application that uses an API implemented in Express to implement
functionality.
See [Convert to serve from Express](#implement-server-side-apis-with-express) on the steps to take the code from the
previous lecture to be served from Express.

We will look at routing in Express and user interaction and error handling in React.

* [Code from the lecture](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/commits/lecture/04)
* [Reference implementation](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/reference/03)
* [Exercise text](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/blob/exercise/04/start/README.md) - [Solution](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/exercise/04/solution)

Reference material

* [Fireship.io intro til Express](https://youtu.be/-MTSQjw5DrM)

</details>
<details>
<summary>Material from previous years</summary>

* [Commit log from live coding](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/lecture/03)
* [Reference implementation](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/reference/03)
* [Exercise text](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/blob/exercise/04/start/README.md)
* [Exercise solution](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/exercise/04/solution)

</details>

### Lecture 5: Publishing your application on Heroku

<details>

In this lecture, we will upload a simple web application to a cloud service and look at automatic deploys.
See [the steps to deploy to Heroku](#deploy-to-heroku)

* [Code from the lecture](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/commits/lecture/05)
* [Reference implementation](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/reference/05)
* [Reference implementation (quality code)](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/reference/05b)
* [Exercise text](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/blob/exercise/05/start/README.md)
* [Deploying with Heroku](#deploy-to-heroku)
* [Setting up quality checks](#quality-checks-with-husky-prettier-and-typescript)

Reference material

* [Heroku's documentation on using Node.js](https://www.heroku.com/nodejs)
* [Heroku free credits for students](https://www.heroku.com/github-students)

In this lecture, we also look at ways to make sure our code is good, from formatting, to linting, to testing.
We will look at the tools husky, prettier and Typescript. We will also be using GitHub to run our quality
checks automatically.

</details>
<details>
<summary>Material from previous years</summary>

* [Commit log from live coding](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/lecture/04)
* [Reference implementation](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/reference/04)
* [Exercise text](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/blob/exercise/04/start/README.md)
* [Exercise solution](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/exercise/04/solution)

#### Material from 2022

* [Commit log from live coding](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/lectures/05)
* [Reference implementation](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/tree/reference/05)
* [Exercise answer](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/exercise/answer/05)

</details>

### Lecture 6: Communication between client and server

<details>

In this lecture, we will start from a blank application to review what we have covered so far. This will also give us
some chance to deal with some information we have glossed over about the communication between the client and the server. 

We will cover:

* How to deal with long-running operations using promises and `async`/`await`
* Error handling
* `fetch` requests
* Express middleware

We will set up a new project, taking advantage of what we've learned so far

1. Adding `husky` to make sure we don't commit bad code
2. Using `concurrently` to run both the client and server at once
3. Creating the client and server projects
4. Displaying a list on the client
5. Moving the information to the server
6. Handling the state when the application is loading and if an error occurs
7. Looking at GET, POST and PUT requests


* [Code from the lecture](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/commits/lecture/06)
* [Reference implementation](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/reference/06)

This lecture's exercise will be to get started with the assignment (see Canvas).

#### Reference material

* [Fireship.io video on Async/await and promises](https://www.youtube.com/watch?v=vn3tm0quoqE)
* [The JavaScript Event Loop (Jake Archibald)](https://www.youtube.com/watch?v=cCOL7MC4Pl0)

</details>
<details>
<summary>Material from previous years</summary>

* [Commit log from live coding](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/lecture/08)
* [Reference implementation](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/reference/08)
* **Useful exercise**: [Move logic from client to server](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/tree/exercise/08/start)

#### Material from 2022

* [Commit log from live coding 2022](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/lectures/06)
* [Reference implementation 2022](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/tree/reference/06)
* [Exercise answer 2022](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/exercise/answer/06)

</details>


### Lecture 7: Storing data MongoDB (with Typescript)

<details>

In this lecture, we learn how to store and retrieve data in [MongoDB](https://www.mongodb.com/).
We will also review deployment to Heroku.

[Reading and writing data to MongoDB](#mongodb)

* [Code from the lecture](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/commits/lecture/07)
* [Reference implementation](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/reference/07)
* [Exercise text](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/blob/exercise/07/start/README.md)
  * Last years exercise text contains more details: [Exercise text](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/blob/exercise/07/start/README.md)

Reference material

* [MongoDB Skills](https://www.youtube.com/watch?v=0vPt7GI-2kc) - very useful and brief
* [MongoDB in 100 seconds (Fireship.io)](https://www.youtube.com/watch?v=-bt_y4Loofg)
* [MongoDB University: JavaScript](https://university.mongodb.com/courses/M220JS/about)
* [MongoDB documentation: How to query collections](https://www.mongodb.com/docs/manual/reference/operator/query/)
* [MongoDB documentation: How to insert a document](https://www.mongodb.com/docs/drivers/node/current/usage-examples/insertOne/)

</details>
<details>
<summary>Material from previous years</summary>

* [Commit log from live coding](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/lecture/07)
* [Reference implementation](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/reference/07)
* [Exercise text](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/blob/exercise/07/start/README.md)
* For the exercise solution,
  use [the lecture reference implementation](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/reference/07)

#### Material from 2022

* [Commit log from live coding](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/lectures/07)
* [Reference implementation](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/tree/reference/07)
* [Exercise answer](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/exercise/answer/07)

</details>


### Lecture 8: Software engineering with test-driven development, pair programming and continuous integration

<details>

In this lecture, we will look at some popular and effective software engineering practices:

* Test-driven development: Alternating between writing testing code and production code, writing the test code first
* Pair-programming: Two developers working together on the same code with one keyboard and mouse, preferably alternating frequently who is at the keyboard
* Refactoring: Improving the structure of the code without changing the behavior, preferably using refactoring support in the IDE
* Continuous integration: Sharing the code frequently with the rest of the team, preferably running automated checks whenever the code is pushed

These are some of the practices of Extreme Programming, the first Agile method to be widely documented and used. Related
practices we will see are:

* Coding standard: The team agreeing on things like code formatting and naming. We will enforce (some of) this with Prettier
* Simple design: Only writing as much code as is needed to get the tests to pass. This relies on being able to refactor the code and verifying that it still works with automated tests

Reference:

* [Code from the lecture](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/commits/lecture/08)
* [Reference implementation](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/reference/08)
* [Exercise text](./exercises/exercise-testing.md#exercise-8)
* [Reference: Vitest](#testing)
* [Reference: GitHub Actions](#deploy-to-heroku)

</details>
<details>
<summary>Material from previous years</summary>

* [Commit log from live coding](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/lecture/05)
* [Reference implementation](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/reference/05)
* [Exercise text](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/blob/exercise/05/start/README.md)
* [Exercise solution](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/exercise/05/solution)

#### Material from 2022

* [Commit log from live coding](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/lectures/03)
* [Reference implementation](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/tree/reference/03)
* [Exercise answer](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/exercise/answer/03)

</details>

### Lecture 9: Testing React code

<details>

[Mentimenter](https://www.menti.com/almznypgkme6)

In this lecture, we will look at [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro/)
for testing React applications and [Supertest](https://github.com/ladjs/supertest) for testing Express endpoints.

We continue on the code from lecture 8, making sure we have some tests and that Typescript is running before we
continue.

* [Code from the lecture](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/commits/lecture/09)
* [Reference implementation](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/reference/09)
* [Exercise text](./exercises/exercise-testing.md#exercise-9)

</details>
<details>
<summary>Material from previous years</summary>

* [Commit log from live coding](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/lecture/06)
* Exercise text
  is [the same as lecture 6](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/tree/reference/03)

#### Material from 2022

* [Commit log from live coding](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/lectures/10)
* [Reference implementation](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/tree/reference/10)

</details>


### Lecture 10: Who's your user? OpenID Connect

<details open>

In this lecture we will implement "log in with Google"-functionality. We will also explore other identity
services that also implement OpenID Connect, such as LinkedIn and Microsoft Entra ID.

* [Code from the lecture](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/commits/lecture/10)
* [Reference implementation](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/reference/10)
* [Exercise text](./exercises/exercise-openid-connect.md)

</details>
<details>
<summary>Material from previous years</summary>

* [Commit log from live coding](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/lecture/09)
* [Reference implementation](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/reference/09)
* [Exercise text](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/blob/exercise/09/start/README.md)

#### Material from 2022

* [Commit log from live coding](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/lectures/08)
* [Reference implementation](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/tree/reference/08)

#### Useful links

* [Johannes' talk on OpenID Connect from NDC 2021](https://www.youtube.com/watch?v=CX8UfflxVMI)
* [Google Developer Console](https://console.cloud.google.com/apis/credentials)
* [Google Authentication documentation](https://developers.google.com/identity/protocols/oauth2#clientside)

</details>

### Lecture 11: Testing Express code

<details>

In this lecture, we will look at [Supertest](https://github.com/ladjs/supertest) for testing Express endpoints.

We continue on the code from lecture 9, making sure we have some tests and that Typescript is running before we
continue.

* [Code from the lecture](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/commits/lecture/11)
* [Reference implementation](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/reference/09)
* [Exercise text](./exercises/exercise-testing.md#exercise-9)


</details>


### Lecture 12: Open ID Connect revisited

<details>

* [Code from the lecture](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/commits/lecture/12)
* [Reference implementation](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/commits/reference/12)

</details>
<details>
<summary>Extra lecture from 2023 on OpenID Connect</summary>

In this lecture, I will demonstrate how to set up an already created OpenID Connect server with Active Directory, then
implement the necessary steps using another ID-provider, so the exact code is left as an exercise

* [Starting point for lecture](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/reference/11)
* [Commit log from live coding](https://github.com/kristiania-pg6301-2023/pg6301-frontend-programming/commits/lecture/11)

#### Material from 2022

* [Commit log from live coding](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/lectures/11)
* [Reference implementation](https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/tree/reference/11)

</details>

## Course reference material

The target for the course is a project with a frontend in React and a backend in Express. These instructions
show how to create it from scratch.

After all the steps, you will have a resulting structure that looks something like this:

```
<root-directory>/
  client/
    dist/            # The output from the build process - generated by vite (add to .gitignore)
    node_modules/    # The local copy of dependencies - generated by npm (add to .gitignore)
    src/main.jsx     # The starting point for React
    package.json     # Contains scripts to run and dependencies
    index.html       # The starting point for the client code
    vite.config.js   # Configuration for Vite, contains React plugin and proxy settings
  server/
    node_modules/    # The local copy of dependencies - generated by npm (add to .gitignore)
    package.json     # Contains scripts to run and dependencies
    server.js        # The starting point for the server
  node_modules/    # The local copy of dependencies - generated by npm (add to .gitignore)
  package.json       # Scripts to run both client and server in combination
```

### Creating the frontend project

<details>

1. Create a new directory. In IntelliJ, you can use File > New > Project. I recommend creating an Empty project
2. When creating a project, make sure you add `node_modules` and `dist` to `.gitignore`
3. Create a subdirectory for the client (`mkdir client`)
4. In the client directory, create the `package.json` file and add dependencies with the following commands
    1. `cd client`
    2. `npm install --save-dev vite`
    3. `npm install react react-dom react-router-dom`
5. Set up the "dev" command to run vite
    * `npm pkg set scripts.dev="vite"`
6. You can now run `npm run dev`, although this will fail until you create an index.html-file (next step)

### Creating the initial React application files

1. Create a minimal HTML file as `client/index.html`. This is the essence:
   ```html
   <html lang="en">
      <body>
        <div id="root"></div>
      </body>
      <script src="src/main.jsx" type="module"></script>
   </html>
   ```
2. Create a minimal `src/main.jsx`:
   ```jsx
   import React from "react";
   import ReactDOM from "react-dom/client";
   
   const root = ReactDOM.createRoot(document.getElementById("root"));
   root.render(<h1>Hello React</h1>);
    ```

You can now start working with React. Start by replacing `<h1>Hello React</h1>` with your own component. For example:

```jsx
// ... continued from above - replace the `root.render(...)` line
root.render(<Application />);

function Application() {
  const [counter, setCounter] = useState(0);
  return <>
    <h2>Welcome to my application</h2>
    <div>
      <button onClick={() => setCounter(oldValue => oldValue + 1)}>Click me</button>
    </div>
    <div>You have clicked {counter} times</div>
  </>;
}
 ```

#### Optional: Enable hot refresh with Vite

`npm install -D @vitejs/plugin-react` and add the following `vite.config.js` in your client project:

```js
import {defineConfig} from "vite";
import reactVite from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [reactVite()]
});
```

</details>

#### React Router

<details>

```jsx
export function MoviesApplication() {
  return <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<FrontPage />} />
      <Route path={"/movies/*"} element={<Movies />} />
    </Routes>
  </BrowserRouter>;
}

function Movies() {
  return <Routes>
    <Route path={""} element={<ListMovies movies={movies} />} />
    <Route path={"new"} element={<NewMovie onAddMovie={handleAddMovie} />} />
  </Routes>
}

function FrontPage() {
  return <div>
    <h1>Front Page</h1>
    <ul>
      <li><Link to={"/movies"}>List existing movies</Link></li>
      <li><Link to={"/movies/new"}>Add new movie</Link></li>
    </ul>
  </div>;
}
```

</details>


### Implement server side APIs with Express

<details>

1. Create a subdirectory on the top level (next to the `client` directory): `mkdir server`
2. In the server directory, create the `package.json` file and add dependencies with the following commands:
    1. `cd server`
    2. `npm install --save-dev nodemon`
    3. `npm install express`
3. Set up the "dev" command to run express
    * `npm pkg set scripts.dev="nodemon server.js"`
4. Set the property `type` to `module` in `package.json`
    * `npm pkg set type="module"`
5. You can now run `npm run dev` in the server directory, although this will fail until you create a server.js-file
   (next step)
6. In your `client` directory, create or update a `vite.config.js` file to forward requests for `/api` from Vite to Express (see below)

#### Create a minimal `server.js`

This file start Express on port 3000. After you execute `npm run dev`,
you can access it at http://localhost:3000

```js
import express from "express";

const app = express();
express.use(express.static("../client/dist"));
app.listen(3000);
```

#### Setup `client/vite.config.js` to proxy `/api` to express

```js
import {defineConfig} from "vite";

export default defineConfig({
  server: {
    proxy: {
       "/api": "http://localhost:3000"
    }
  }
});
```

</details>

#### Create an API in `server.js`

<details>

```js
export const moviesApi = new express.Router();
moviesApi.get("/api/movies", (req, res) => {
  res.send([
    { title: "Oppenheimer" },
    { title: "Barbie" },
  ])
});

app.use(moviesApi);
```

You can now access this API at http://localhost:3000/api/movies

</details>

#### Read data from an API in React

<details>

```js
function ListMovies() {
  const [movies, setMovies] = useState([]);

  async function loadMovies() {
    const res = await fetch("/api/movies");
    setMovies(await res.json());
  }

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <>
      <h1>Movies</h1>
      {movies.map((m) => (
        <div>{m.title}</div>
      ))}
    </>
  );
}
```

</details>

#### The useLoading hook

TODO: Replace with Suspense?

<details>

```javascript
export function useLoading(loadingFunction, deps = []) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function load() {
    setLoading(true);
    setData(undefined);
    setError(undefined);
    try {
      setData(await loadingFunction());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(load, deps);
  return { loading, data, error };
}
```

</details>

#### Posting data to server

<details>

Expose an API from Express (in `server/`):

```js
const MOVIES = [];
export const moviesApi = new express.Router();
moviesApi.post("/api/movies", (req, res) => {
  const { title } = req.body;
  MOVIES.push({ title, id: MOVIES.length });
  res.sendStatus(204);
});

app.use(express.json());
app.use(moviesApi);
```

Post JSON from React:

```jsx
function AddMovieForm() {
  const [title, setTitle] = useState("");

  async function saveMovie(e) {
    e.preventDefault();
    await fetch("/api/movies", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <form onSubmit={saveMovie}>
      <h1>Add Movie</h1>
      <div>
        Title:
        <br />
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}
```

</details>

#### Express middleware for dealing with BrowserRouter

<details>

When you use `<BrowserRouter>` in React, the server must be prepared for unknown URLs. When the user
reloads the browser, the browser will request URLs that are intended to be resolved on the client.
The following defaults unknown requests to return `index.html`.

```javascript
app.use((req, res, next) => {
  if (req.method === "GET") {
    // TODO: We probably should return 404 instead of index.html for api-calls as well
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    // try other alternative Express actions, or return 404 if none match
    next();
  }
});
```

</details>

### Making the top level project work smoother

<details>

With the instructions above, you have to use two terminal windows, one for client and one for server.
You can set up the top level directory above `client` and `server` to run both concurrently:

1. Execute the following in the top level directory (above `client` and `server`)
2. Make `npm run dev` at top level run the same command in both subdirectories concurrently
    1. `npm install --save-dev concurrently`
    2. `npm pkg set scripts.dev="concurrently npm:dev:client npm:dev:server"`
    3. `npm pkg set scripts.dev:client="cd client && npm run dev"`
    4. `npm pkg set scripts.dev:server="cd server && npm run dev"`

</details>

### Deploy to Heroku

<details>

Heroku is a cloud based Platform-as-a-Service (PaaS) that is extremely easy to use to host Node applications, like our
Express server. They require paying for deployments, but
with [GitHub Student Developer Pack](https://education.github.com/pack)
you [get credits to use Heroku for free](https://www.heroku.com/github-students)

For more information on deploying with Heroku Git (instead of GitHub),
see [Deploying with Git | Heroku Dev](https://devcenter.heroku.com/articles/git).

1. In the root project make sure `npm install` is run at `postinstall`
    * `npm pkg set scripts.postinstall="npm run install:client && npm run install:server"`
    * `npm pkg set scripts.install:client="cd client && npm install --include=dev"`
    * `npm pkg set scripts.install:server="cd server && npm install"`
2. In the root project, define `npm run build` and `npm start`
    * `npm pkg set scripts.build="npm run build:client"`
    * `npm pkg set scripts.build:client="cd client && npm run build"`
    * `npm pkg set scripts.start="cd server && npm start"`
3. In the client project, define `npm run build`
    * `cd client`
    * `npm pkg set scripts.build="vite build"`
    * `cd ..`
4. In the server project, define `npm start`
    * `cd server`
    * `npm pkg set scripts.start="node server.js"`
      > Note: If you're using Typescript, this should be `ts-node server.ts` instead
5. In the server project, update `server.js` to let Heroku inject the server port as an environment variable:
     ```js
     app.listen(process.env.PORT || 3000);
     ```
6. In the server application, verify that `express` is configured to return the React code:
     ```js
     app.use(express.static("../client/dist"));
     ```
7. Create an application and configure to deploy to heroku
    1. Sign up at the [Heroku Dashboard](https://dashboard.heroku.com/apps/)
    2. [Create a new Heroku app](https://dashboard.heroku.com/new-app)
    3. Under Deployment for your new app, select Heroku Git as Deployment Method
8. Download the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
9. From the command line, push your repository to Heroku
    1. `heroku login`
    2. `heroku git:remote -a <app name>`
    3. `git push heroku`
    4. `heroku open` (optional: opens a web browser to your Heroku application)
    5. `heroku logs --tail` (optional): See the logs from Heroku in your console
10. You can see the deployment log under Activity in the Heroku Dashboard for your app and the runtime log under More > View logs

**Common problems:**

* "Buildpack not found"
    * Make sure that you have a **top-level** `package.json`-file
* `express` not found
    * Make sure that the top level `package.json` has a script for `postinstall` which calls `npm install` in
      the `client` and `server` directories
* `sh: 1: vite: not found`
    * When running on Heroku, the environment variable `NODE_ENV=production` is set.
      This makes `devDependencies` excluded on `npm install`. Make sure that the client install command runs
      as `npm install --include=dev`
* The application crashes
    * View the log from the command line with `heroku logs --tail`
    * Make sure that you have a top level `start` script which calls `cd server && npm start`
* The application shows an empty page or a 404 warning
    * Make sure that Express is set up to serve the React code: `app.use(express.static("../client/dist"));`

</details>

### Mongodb

#### Reading data from MongoDb

<details>

```js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

new MongoClient(process.env.MONGODB_URL)
  .connect()
  .then((connection) => {
    const database = connection.db("sample_mflix");
    const moviesApi = express.Router();
    movies.get("", (req, res) => {
      moviesApi.get("/", async (req, res) => {
        const movies = await database
          .collection("movies")
          .find({ year: 2016, countries: "Norway" })
          .sort({ metacritic: -1 })
          .limit(200)
          .toArray();
        res.json(movies);
      });
    });
    app.use("/api/movies", moviesApi);
  })
  .catch((error) => {
    console.error("while connecting to MongoDB", error);
  });
```

</details>

### Quality checks with Husky, Prettier and Typescript

<details>

* Install [Husky](https://typicode.github.io/husky/) to ensure that you don't forget to fix your code before commiting
    * `npm install -D husky`
    * `npx husky init`
* Creating a `npm test` task to check code
    * `npm test` in the root should run `npm run prettier:check && npm run test:client && npm run test:server`
* `test:prettier`:
    * `npm install --save-dev prettier`
    * `npm pkg set scripts.prettier:check="prettier --check ."`
* `test:client` and `test:server` should run `npm test` in the `client` and `server` directories, respectively
    * `npm pkg set scripts.test:client="cd client && npm test"`
    * `npm pkg set scripts.test:server="cd server && npm test"`
* `client` directory should add typescript for `npm test`:
    * `cd client`
    * `npm install typescript`
    * `npx tsc --init --jsx react`
    * `npm pkg set scripts.test="tsc --noEmit"`
    * You must convert at least one file to Typescript or tsc will fail
* `server` directory should add typescript for `npm test`:
    * `cd server`
    * `npm install typescript`
    * `npx tsc --init`
    * `npm pkg set scripts.test="tsc --noEmit"`
    * You must convert at least one file to Typescript or tsc will fail

</details>

### Testing

This course uses the [Vitest](https://vitest.dev) testing library.

#### Installing

Installing Vitest is described on [the Vitest homepage](https://vitest.dev/)

<details>

1. `npm install --save-dev vitest`
2. `npm pkg set scripts.test=vitest`
3. `npm test`

</details>

#### A trivial test (failing)

<details>

```typescript
import { describe, expect, it } from "vitest";

function isLeapYear(number: number) {
}

describe("leap years", () => {
  it("returns false for default years", () => {
     expect(isLeapYear(2025)).toBe(false);
  });
});
```

</details>

#### Snapshot testing - check that a view is rendered correctly

For testing react code, I recommend [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)

<details>

To test with react, install devDependencies `@testing-library/react` and `jsdom`

1. `npm install --save-dev vitest @testing-library/react jsdom`
2. Add the following to your `vite.config.js`:
    ```js
    import { defineConfig } from "vite";
    
    export default defineConfig({
      test: {
        environment: "jsdom",
      },
    });
    ```

* Use `render` from `@testing-library/react` to instantiate components
* Use `expect(RenderResult.baseElement).toMatchSnapshot()` for a test that checks that nothing has changed
* Use `RenderResult.baseElement.{querySelector,querySelectorAll}` to find DOM elements to inspect in the test
* You can also use [`RenderResult.findBy{Text,LabelText}`](https://testing-library.com/docs/queries/about) to find elements - this retries for up to one second 
* Use `fireEvent` from `@testing-library/react` to create change, submit and other events
* Use [`vitest.fn()`](https://vitest.dev/guide/mocking) to create a [Mock](https://vitest.dev/guide/mocking) function that can be used to verify that an event was triggered

```javascript
import { afterEach, describe, expect, it, vitest } from "vitest";
import { cleanup, render } from "@testing-library/react";
import React from "react";

// Without this, each test will extend the web page from the previous instead of starting over
afterEach(cleanup);

it("matches snapshot", async () => {
  const app = render(
    <MemoryRouter initialEntries={["/"]}>
      <MoviesRoutes fetchMovies={() => movies}/>,
    </MemoryRouter>,
  );
  expect(app.baseElement).toMatchSnapshot();
  expect(
    [...app.baseElement.querySelectorAll("h3")].map(
      (c) => c.textContent
    ),
  ).toEqual(["Barbie", "Oppenheimer"]);
});
```

</details>

#### Simulate events

<details>

```javascript
import { afterEach, describe, expect, it, vitest } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";

// Without this, each test will extend the web page from the previous instead of starting over
afterEach(cleanup);

it("handles event", async () => {
  const handleClick = vitest.fn();
  const app = render(
    <button onClick={() => handleClick(123)}>Click me</button>,
  );
  fireEvent.click(await app.findByText("Click me"));
  expect(handleClick).toBeCalledWith(123);
});
```

</details>

#### Using supertest to check server side behavior

For testing Express components, I recommend [Supertest](https://github.com/ladjs/supertest)

<details>

***Setup***:

1. `cd client`
2. `npm install --save-dev vitest supertest`

To test a bookApi defined in `server/booksApi.js` like this:

```javascript
import express from "express";

export const booksApi = new express.Router();
booksApi.get(":id", (req, res) => {
  // ...
});
booksApi.put(":id", (req, res) => {
    // ...
});
```

you can use a test in `server/tests/booksApi.test.js` like this:

```javascript
import { beforeAll, describe, expect, it } from "vitest";
import express from "express";
import request from "supertest";
import { booksApi } from "../booksApi";

const app = express();
app.use(bodyParser.json());
app.use(booksApi);

describe("books api", () => {

  it("can update existing books", async () => {
    const book = (await request(app).get("/2")).body;
    const updated = {
      ...book,
      author: "Egner",
    };
    await request(app).put("/2").send(updated).expect(200);
    await request(app)
      .get("/2")
      .then((response) => {
        expect(response.body).toMatchObject({
          id: 2,
          author: "Egner",
        });
      });
  });

});
```

</details>

### GitHub Actions

<details>

<summary>`.github/workflows/test.yaml`:</summary>

```yml
name: "npm test"

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20.x
          cache: npm
      - run: npm ci
      - run: npm test
```
</details>


## WebSockets

### Client side:

<details>

Reference material

* [Fireship.io video on Websockets](https://www.youtube.com/watch?v=1BfCnjr_Vjg)

```javascript
    // Connect to ws on the same host as we got the frontend (support both http/ws and https/wss)
const ws = new WebSocket(window.location.origin.replace(/^http/, "ws"));
// log out the message and destructor the contents when we receive it
ws.onmessage = (msg) => {
  console.log(msg);
  const { username, message, id } = JSON.parse(msg.data);
};
// send a new message
ws.send(JSON.stringify({ username: "Myself", message: "Hello" }));
```

</details>

### Server side

<details>

```javascript

import { WebSocketServer } from "ws";

// Create a websocket server (noServer means that express
// will provide the listen port)
const wsServer = new WebSocketServer({ noServer: true });

// Keep a list of all incomings connections
const sockets = [];
let messageIndex = 0;

// Start express app
const server = app.listen(3000);

// Handle incoming clients
server.on("upgrade", (req, socket, head) => {
  // This request is not passed through the middleware chain, so
  //  you have to duplicate any modifications to req here
  wsServer.handleUpgrade(req, socket, head, (socket) => {
    sockets.push(socket);
    // Set up the handling of messages from this sockets
    socket.on("message", (msg) => {
      // Destructor the incoming message
      const { username, message } = JSON.parse(msg);
      // Add fields from server side
      const id = messageIndex++;
      // broadcast a new message to all recipients
      for (const recipient of sockets) {
        recipient.send(JSON.stringify({ id, username, message }));
      }
    });
  });
});
```

</details>

## OpenID Connect - Log on with Google

### Client side (implicit flow)

<details>

"Implicit flow" means that the login provider (Google) will not require a client secret to complete the authentication.
This is often not recommended, and for example Microsoft Entra ID instead uses another mechanism called PKCE, which
protects against some security risks.

1. Set up the application in [Google Cloud Console](https://console.cloud.google.com/apis/credentials). Create a new
   OAuth client ID and select Web Application. Make sure `http://localhost:3000` is added as an Authorized JavaScript
   origin and `http://localhost:3000/callback` is an authorized redirect URI
2. To start authentication, redirect the browser (see code below)
3. To complete the authentication, pick up the `access_token` when Google redirects the browser back (see code below)
4. Save the `access_token` (e.g. in `localStorage`) and add as a header to all requests to backend

</details>

#### Redirect the client to authenticate

<details>

```javascript
function LoginButton() {
  const [authorizationUrl, setAuthorizationUrl] = useState();
  async function generateAuthorizationUrl() {
    // Get the location of endpoints from Google
    const { authorization_endpoint } = await fetchJson(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    // Tell Google how to perform the authentication
    const parameters = {
      response_type: "token",
      client_id:
        "<get this from Google Cloud Console>",
      // Tell user to come back to http://localhost:3000/login/callback when logged in
      redirect_uri: window.location.origin + "/login/callback",
      scope: "profile email",
    };
    setAuthorizationUrl(
      discoveryDoc.authorization_endpoint +
      "?" +
      new URLSearchParams(parameters),
    );
  }

  useEffect(() => {
    generateAuthorizationUrl();
  }, []);

  return <a href={authorizationUrl}>Log in with Google</a>;
}
```

In the case of Entra ID, you also need
parameters `response_type: "code"`, `response_mode: "fragment"`, `code_challenge_method` and `code_challenge` (the
latest two are needed for PKCE).

**For Entra ID: Generating `code_verifier` and `code_challenge`**

When using Entra ID from the browser, you code must code prove that it was the same application that
started the request and completed the request. This is called Proof of Key Challenge Exchange (PKCE,
often pronounced "pixie"). You must create a random value and save it (I use `sessionStorage`).
The authorization request must contain the property `code_challenge` which is the hash of the random
value. When completing the logon with a token request (see below), your code must include the (unhashed)
random value as a property `code_verifier`.

```typescript
// From https://stackoverflow.com/a/75809704/27658
function randomString() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// URL-safe base 64 encoding is defined in https://datatracker.ietf.org/doc/html/rfc4648#page-7
function encodeBytesAsBase64Url(bytes: ArrayBuffer): string {
  return btoa(
    String.fromCharCode.apply(null, Array.from(new Uint8Array(bytes))),
  )
    .split("=")[0]
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function sha256hash(s: string): Promise<ArrayBuffer> {
    return await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
}

const code_verifier = randomString();
sessionStorage.setItem("code_verifier", code_verifier);
const code_challenge = base64url(await sha256hash(code_verifier));
```


</details>

#### Handle the authentication callback

<details>

```javascript
// Router should take user here on /callback
export function LoginCallback() {
  const navigate = useNavigate();
  // Given an URL like http://localhost:3000/callback#access_token=sdlgnsoln&foo=bar,
  //  window.location.hash will give the part starting with "#"
  //  ...substring(1) will remove the "#"
  //  and Object.fromEntries(new URLSearchParams(...)) will parse it into an object
  // In this case, hash = { access_token: "sdlgnsoln", foo: "bar" }
  const callbackParameters = Object.fromEntries(
    new URLSearchParams(window.location.hash.substring(1)),
  );

  async function handleCallback() {
    // Get the values returned from the login provider. For Active Directory,
    // this will be more complex
    const { access_token } = callbackParameters;
    await fetch("/api/login/accessToken", {
      method: "POST",
      body: JSON.stringify({ access_token }),
      headers: {
        "content-type": "application/json",
      },
    });
    navigate("/");
  }

  useEffect(() => {
    handleCallback();
  }, []);

  return <div>Please wait...</div>;
}
```

For Active Directory, the hash will instead include a `code`, which you will then need to send to the `token_endpoint`
along with the `client_id` and `redirect_uri` as well as `grant_type: "authorization_code"` and the `code_verifier`
value from PKCE. This call will return the `access_token`.

</details>

#### Handle access_token on the backend

<details>

```javascript
app.use(async (req, res, next) => {
  const { access_token } = req.signedCookies;
  if (access_token) {
    const { userinfo_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    req.userinfo = await fetchJSON(userinfo_endpoint, {
      headers: { "Authorization": `Bearer ${access_token}` },
    });
  }
  next();
});

app.post("/api/login", (req, res) => {
  const { access_token } = req.body;
  res.cookie("access_token", access_token, { signed: true });
  res.sendStatus(204);
});

app.get("/profile", (req, res) => {
  if (!req.userinfo) {
    res.send(401);
  } else {
    res.send(req.userinfo);
  }
});
```

</details>

## Tools

### IntellJ shortcuts

<details>
These are some of the most versatile keyboard shortcuts in IntelliJ. There are many more, but learning these 12 will really speed up your code

| Shortcut (Windows)   | Shortcut (Mac)      | Command                                    |
|----------------------|---------------------|--------------------------------------------|
| alt-enter            | opt-enter           | Show content action (quick fix)            |
| ctrl-alt-shift-t     | ctrl-t              | Refactor this (show refactor menu)         |
| alt-insert           | cmd-n               | New... (add some content)                  |
| ctrl-w               | opt-up              | Expand selection                           |
| shift-alt-f10        | ctrl-alt-r          | Run....                                    |
| shift-alt-f9         | ctrl-alt-d          | Debug....                                  |
| shift-f10            | ctrl-d              | Rerun last....                             |
| ctrl-b               | cmd-b               | Navigate to symbol                         |
| alt-j                | ctrl-g              | Add next match to selection (multi-cursor) |
| shift-ctrl-backspace | shift-cmd-backspace | Goto last edit location                    |
| shift, shift         | shift, shift        | Search anywhere                            |

Make yourself familiar with `Refactor this` (ctrl-alt-shift-t / ctrl-t) and use it to learn the shortcut keys for your
favorite refactorings like Extract method, Rename and Inline.
</details>

### Git commands

<details>

| Command      | Description                              | IntelliJ shortcut                         |
|--------------|------------------------------------------|-------------------------------------------|
| `git init`   | Creates a new local git repo in `.git/`  | VCS > Import into version control         |
| `git add`    | Stage files to include in next commit    | (not needed)                              |
| `git commit` | Store your local changes in git history  | ctrl-k / cmd-k                            |
| `git push`   | Upload changes to remote repo (github)   | ctrl-sh-k / cmd-sh-k                      |
| `git clone`  | Create a local copy from remote (github) | File > New > Project from version control |
| `git pull`   | Update local copy with others' changes   | ctrl-t / cmd-t                            |
| `git log`    | View change history                      | View > Tool Windows > Version control     |

</details>

## Software and libraries used in this course:

* [React](https://react.dev)
* [NodeJs](https://nodejs.org)
* [Vite](https://vitejs.dev/)
* [ExpressJS](https://expressjs.com/)
* [IntelliJ](https://www.jetbrains.com/idea/)
* [Heroku](https://devcenter.heroku.com/)
* [MongoDB](https://www.mongodb.com/)
* [Husky](https://typicode.github.io/husky/)
* [Prettier](https://prettier.io/)
* [Vitest](https://vitest.dev/)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
* [Supertest](https://github.com/ladjs/supertest)
* Google Login
* Entra ID (?)
