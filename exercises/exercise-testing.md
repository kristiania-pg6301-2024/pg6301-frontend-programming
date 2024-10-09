# Implementing tests in your application

These exercises are meant help you learn Vitest, test-driven development, pair programming and continuous integration.
They do not depend on the earlier exercises in the course

## Exercise 8

### Extreme programming with test-driven development, pair programming, refactoring and continuous integration

<details>

<summary>

> The purpose of this exercise is to teach you software development skills that have stood the test of time in the industry

</summary>


### Overview

1. Find a partner
2. Create a new empty node project on the computer of one of you
3. Write the Leap Years kata with test driven development and pair programming
4. Share the project on GitHub and give both developers access
5. Add a GitHub Actions file that runs the test
6. Implement the Roman Numerals Kata with test driven development and pair programming
7. Verify that your tests run on GitHub

### [The Leap Years kata](https://codingdojo.org/kata/LeapYears/)

This is an exercise to learn the pair-programming method called "ping pong programming",
where two developers alternate quickly who's at the keyboard

<details>

1. Team up with another student
2. One person creates a new (empty) project in IntelliJ and adds `vitest`-support
    * `npm install -D vitest`
    * `npm pkg set scripts.test="vitest"`
3. Run `npm test` and see that you get an error due to no tests
4. Slide the keyboard over to the other programmer
5. Create a new file named `leapYears.test.ts` with the following contents:
   ```typescript
   import {expect, it} from "vitest";
   
   it("returns false for normal years", () => {
      expect(isLeapYear(2025)).toBe(false);
   });
   ```
6. See that the test process automatically runs the test which now failed with the message "`ReferenceError: isLeapYear is not defined`"
7. Press F2 (Next Highlighted Error) in the editor which selects `isLeapYear`. Press Alt-Enter and select "Create function" > "(top level)"
8. The test now fails with "`AssertionError: expected undefined to be false // Object.is equality`"
9. Slide the keyboard over to the first programmer
10. Implement `isLeapYear` in the simplest way that passes the test
   ```typescript
   function isLeapYear(number: number) {
       return false;
   }
   ```
11. Write a new test:
   ```typescript
   it("returns true for years divisible by four", () => {
       expect(isLeapYear(2024)).toBe(true);
   }); 
   ```
12. See the test failing before sliding the keyboard to the other developer
13. Make the test pass with as little code as possible. I suggest replacing the return statement with `return number % 4 === 0`
14. Refactor the code: Put the cursor on the parameter name `number` and press `ctrl-alt-shift-t` (`ctrl-t` on Mac). Select "Rename" and rename the `number` variable to `year`
15. Now is a good time to add the files to git:
    * In IntelliJ, select "Version Control" > "Create Git Repository"
    * Right-click on the `node_modules`-directory, Select Git > Add to .gitignore > Add to .gitignore
    * Right-click on the `.idea/`-directory and add this to `.gitignore` too
    * Press `ctrl-k` (`cmd-k` on Mac), add the files to Git and commit them
16. Write the next test: `it("returns false for years divisible by 100")`, see it fail and slide the keyboard to the first developer
17. Update `isLeapYear` so that all three tests pass. This is a good time to commit the code to git
18. Write the next test: `it("returns true for years divisible by 400")`, see it fail and slide the keyboard to the other developer
19. Update `isLeapYear` so that all four tests pass and commit the code
20. Share the project on GitHub: Git > GitHub > Share Project on GitHub

</details>

### Add prettier and husky

As you have finished a natural part of the code, it's a good time to add some quality control.

1. `npm install -D husky prettier`
2. `npx prettier --write .`
3. `npm pkg set scripts.test="prettier --check . && vitest"`
4. Commit the code and push it to GitHub

In IntelliJ, open `package.json`, right-click and select "Apply Prettier code style rules" to make the IntelliJ
automatically format the code with Prettier as you write it.

### Running tests with GitHub Actions

In addition to running the tests when the code is committed, it's a good safety measure to run it on GitHub.
[See the course reference material](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/#github-actions)
on the contents on a `.github/workflows/test.yaml`-file that defines a GitHub Actions Workflow that runs the
tests automatically when code is pushed.

Make sure that the tests run correctly on GitHub.

### [The Roman Numerals kata](https://codingdojo.org/kata/RomanNumerals/)

Now that you have a project with Vitest, husky, prettier and GitHub Actions, it's a good time to write some real tests.
The Roman Numerals kata is a good exercise to reinforce the pair programming and test-driven development work you
learned with the Leap Years kata.

<details>

1. The first programmer creates a new test file named `romanNumerals.test.ts`. A first test can look like this:
   ```typescript
   import {expect, it} from "vitest";
   
   function toRoman(number: number) {
   
   }
   
   it("translates 1 to I", () => {
      expect(toRoman(1)).toBe("I");
   });
   ```
2. Make sure you see the test run and fail with the `npm test` command
3. Slide the keyboard to the other developer
4. Make the easiest implementation that will pass the test (`return "I";`)
5. After seeing the test pass, refactor with `alt-ctrl-shift-t` (Mac: `ctrl-t`): *Move...* `toRoman` to a new file and consider renaming the `number` parameter
6. Commit the code
7. Create a new test showing that `it("translates 2 to II")`
8. Slide the keyboard to the first developer to implement
9. The simplest implementation is to put an initial `if`-check
10. After implementing for 2, continue with 3 (should be `III`). After the simple implementation, refactor to use a loop
11. Continue with 4 (should be `IV`) and then 5 (`V`), implement as special cases in the start of `toRoman`
12. See if you can refactor the tests to use Vitest's [`test.each`](https://vitest.dev/api/#test-each) function
13. Continue with 6 (should be `VI`). Remember to switch "driver" after writing a new test.
14. Implement 6 first as a special case. When the test runs green, see if you can refactor to make use of the code for 5 and 1-3.
15. If you implement 6 well, you may start to see a structure in you code that you can take advantage of to continue for the whole of the exercise

See [Coding Dojo's description of Roman Numerals](https://codingdojo.org/kata/RomanNumerals/) for more help and inspiration.

</details>

</details>


## Exercise 9

### Writing tests for React and Express

<details>
<summary>

> The purpose of exercise 9 is to teach you how to use
> [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro/) to write tests for React
> and [Supertest](https://github.com/ladjs/supertest) to write tests for Express

</summary>

You should complete exercise 1, 2, 3 and 8 before attempting exercise 9. It's best to work in pairs on this task.

### Overview

1. Create a client directory for your React code as normal, but install `vitest` and `@testing-library/react`
2. Client: Write a test to verify that adding a task entry updates the list
3. Write a test to verify that you cannot add a task entry without a description
4. Client: Write a test to verify a snapshot of the task list page
5. Create a server directory for your Express code as normal, but install `vitest` and `supertest`
6. Write a test to verify that adding a task on the task API results in that task being on the list of tasks
7. Write a test to verify that marking a task as complete with the API updates the state of that task

### Client tests with `@testing-library/react`

1. Before you start on the client test, create a `tsconfig.js`-file in the top level directory
    * `npm install -D typescript`
    * `npx tsc --init --jsx react`
2. Create a new project or continue with the project you used for exercise 8
3. Create a `client`-subdirectory with [a React project](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/#creating-the-frontend-project)
4. Add the testing libraries as devDependencies:
    * `cd client`
    * `npm init -y`
    * `npm install --save-dev vitest @testing-library/react jsdom`
5. Create a `vite.config.js`-file:
    ```javascript
    import { defineConfig } from "vite";
    
    export default defineConfig({
      test: {
        environment: "jsdom",
      },
    });
    ```
6. Create a `taskList.test.tsx`-file for your component tests. Here is a good first test to work on:
    ```tsx
    import { beforeEach, expect, it, vitest } from "vitest";
    import { cleanup, fireEvent, render } from "@testing-library/react";
    import React from "react";
    
    interface Props {
        onAddTask?: () => void;
    }
    
    function TaskList({ onAddTask }: Props) {
        return null;
    }
    
    beforeEach(cleanup);
    
    it("adds a new task", async () => {
        const handleAddTask = vitest.fn();
        const app = render(<TaskList onAddTask={handleAddTask} />);
        const description = "New Task";
        fireEvent.change(await app.findByLabelText("New task description:"), {
            value: description,
        });
        expect(handleAddTask).toBeCalledWith({ description, completed: false });
    });
    ```
7. Implement `TaskList` to get the test to pass. Refactor and move the TaskList component to a separate file.
8. Here is a possible good next (notice that this requires you to update Props for TaskList):
    ```tsx
    it("completes task", async () => {
        const handleCompleteTask = vitest.fn();
        const _id = "123";
        const description = "New Task";
        const tasks = [{ _id, description, completed: false }];
        const app = render(
            <TaskList onCompleteTask={handleCompleteTask} tasks={tasks} />,
        );
        fireEvent.change(await app.findByLabelText(description), { clicked: true });
        expect(handleCompleteTask).toBeCalledWith(_id);
    });
    ```
9. Here is a possible snapshot test to warn you if something changes:
    ```jsx
    it("renders tasks", async () => {
        const tasks = [
            { _id: "1", description: "first task", completed: false },
            { _id: "2", description: "second task", completed: true },
        ];
        const app = render(<TaskList onCompleteTask={vitest.fn()} tasks={tasks} />);
        expect(app.baseElement).toMatchSnapshot();
    });
    ```
10. Make sure you commit your code to git as you work

When you have gotten the test to run, see if you can convert the project to using TypeScript. You will need to create a
`tsconfig.json`-file to convert the tests from `ts` to `js`, or else Vitest will reject `async`-functions.

### Server tests with `supertest`

Continue on the same project as for the client-tests.

1. Create a `server`-subdirectory with [an Express project](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/?tab=readme-ov-file#implement-server-side-apis-with-express)
    * `cd server`
    * `npm install -D vitest supertest @types/supertest`
2. Create a `tasksApi.test.ts` with the first test (and setup):
    ```typescript
    import { beforeAll, expect, it } from "vitest";
    import express from "express";
    import request from "supertest";
    
    function createTaskApi() {
      return express.Router();
    }
    
    const app = express();
    beforeAll(() => {
      app.use(createTaskApi());
    });
    
    it("adds a task to the task list", async () => {
      const title = "A new task created at " + new Date();
      const res = await request(app).post("").send({ title }).expect(200);
      const savedTask = res.body;
      expect(savedTask).toMatchObject({ title });
      const allTasks = (await request(app).get("").expect(200)).body;
      expect(allTasks).toContainEqual(savedTask);
    });
    ```
3. Make the test pass by adding `get` and `post` handlers to the Router created in `createTaskApi`.
4. When the test is passing, refactor to move `createTaskApi` to a separate file `taskApi.ts`
5. Remember to commit the code
6. Add a test that verifies that you can complete a task:
    ```typescript
    it("completes a task", async () => {
        const title = "Random task";
        const res = await request(app).post("").send({ title }).expect(200);
        const savedTask = res.body;
        expect(savedTask).toMatchObject({ title, completed: false });
        request(app).put(savedTask.id).send({ completed: true }).expect(201);
        const updatedTask = (await request(app).get(savedTask.id).expect(200)).body;
        expect(updatedTask).toMatchObject({ completed: true });
    });
    ```
7. Make the test pass by adding a handler for `get(":id")` and `put(":id")` to the task router

### Optional: Convert the server code to use MongoDB

In order to make the server use MongoDB and the tests still work, `createTaskApi()` needs to take a MongoDB connection.
In order to make the tests run with GitHub Actions, you need to use a localhost MongoDB URI and start Mongo with
`docker compose` in the Workflow-file. See
[workflow file in the reference code from lecture 9](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/blob/reference/09/.github/workflows/test.yaml#L19)
and the corresponding [`docker-compose.yaml`](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/blob/reference/09/docker-compose.yaml)

### Optional: Stitching the parts together

You have now created a client side component and a server side router test-first. This is a good time to add the
`index.html` and `main.tsx` files to the client, implement fetching and updating logic to use `fetch` and
adding the `server.ts`-file.

See [Creating the frontend project](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/?tab=readme-ov-file#creating-the-frontend-project),
[Implementing server side APIs with Express](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/?tab=readme-ov-file#implement-server-side-apis-with-express)
and [Read data from an API](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/?tab=readme-ov-file#read-data-from-an-api-in-react)
in the course reference materials for details.

</details>
