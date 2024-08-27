# The task application

The main running exercise of this course is the classic "TODO" application.  This is a very common example, and you
can see lots of examples using this online. The application lets to users create tasks and mark them as complete.
In addition, we will be adding details to the tasks and give access to tasks to other users.

## Exercise 1: Create a React application where you can register and add to a list of tasks

<details>

<summary>
The purpose of the first week exercise is to install and verify the tools used to develop and get help for the course
</summary>


Your application should have the following:

1. A list of checkboxes for all created tasks
2. An input field with a submit button to add a new task

You can choose to ways to create the application:

### Step 1: Install and sign up for necessary tools

1. Install [NodeJS](https://nodejs.org/en/download/package-manager) (if you don't already have it)
2. Sign up for [GitHub student developer pack](https://education.github.com/pack/join) which gives you access to
   important resources like IntelliJ Ultimate and Heroku for free. Make sure to use your school email address for the
   registration.
3. Download [IntelliJ IDEA Ultimate](https://www.jetbrains.com/idea/download/). You can use a Trial license until your
   GitHub student pack is registered. You can then use [the IntelliJ student page](https://www.jetbrains.com/shop/eform/students)
   to get a long term license
4. Sign in to https://mattermost.kristiania.no/ and find the [PG6301 channel](https://mattermost.kristiania.no/it2023/channels/pg6301---webutvikling-og-api-design) and send a message saying Hello

### Step 2: Alternative 1: Use the Vite project wizard (quick start, but lots of confusing code)

Open a terminal Window, and `cd` to a directory for your course assignments. This directory should not contain
spaces or special characters (`[a-zA-Z0-9._-]` are okay)

1. Run `npm init vite` - this will ask you what name you want for your project subdirectory,
   what framework to use (select React) and what variant to use (select JavaScript)
2. Follow the instructions from the Wizard to `cd` into the directory and run `npm install` and `npm run dev`
3. Go to http://localhost:5173/ to see your project running
4. Start IntelliJ
5. Open the project directory using File > Open
6. Navigate to `src/App.jsx` and update the code to create a TODO application
7. When you have completed your application, upload the code to GitHub

### Step 2: Alternative 2: Build the project from scratch (more steps, but no files not created by you)

Open a terminal Window, and `cd` to a directory for your course assignments. This directory should not contain
spaces or special characters (`[a-zA-Z0-9._-]` are okay)

1. `mkdir <your project name>`: create a new directory for your project
2. `cd <your project name>`: change directory to the project directory
3. `npm init -y`: creates `package.json` for your scripts and dependencies
4. `npm install --save-dev vite`: add Vite as a tool in your project
5. `npm install react react-dom`: add React as a library in your project
6. `npm pkg set scripts.dev="vite"` Add a script to run your project
7. `npm run dev`: starts up the project
8. Go to http://localhost:5173/ to see your (empty) project running

You can now open the project in IntelliJ and start development

1. Start IntelliJ
2. File > Open: Open the project directory
3. Create files named `index.html` and `src/main.jsx`. See the
   [course material](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/?tab=readme-ov-file#creating-the-frontend-project)
   to see how these files should look
4. Add the code to create a `<TodoApplication />` component with a `<AddTaskForm />` component
5. When you have completed your application, upload the code to GitHub

### Step 3: Feedback and continue

When you have managed to create your first React application, you should send a message saying simply
"Exercise 1 complete! 🎉" at Mattermost! Feel free to include the link to your GitHub repository.

If you want to explore React a bit more right away, check out the [official React tutorials](https://react.dev/learn).

### Step 4: Competition

We need a logo for the course GitHub pages. Post your entry on Mattermost and vote with emojiis on other entries. Despite knowing better from experience, I will let the democratic process decide on the logo.

</details>

### Exercise solution:

Check out the [reference code from lecture 1](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/reference/01)

## Exercise 2: A TODO application with updateable state

<details>
<summary>The purpose of the exercise 2 is to create functionality in a React application</summary>

Starting with what you learned in exercise 1, let's transform the simple list of tasks into a more functional application.
Implement the following features:

* Create task
* Complete task
* Change task description
* Show task details

You should start out as we showed in the lecture, with a static component that you gradually make dynamic. Here is a possible starting point:

```jsx
function TaskList() {
   const tasks = [
      { id: 1, description: "Follow the lecture", completed: true },
      { id: 2, description: "Read the exercise", completed: false },
      { id: 3, description: "Complete the exercise", completed: false },
   ];
   
   return <div>
      <h2>Tasks</h2>
      {tasks.map(({id, description, completed}) => <label key={id}>
         <input type="checkbox" checked={completed} />
         {description}
      </label>)}
   </div>;
}
```


### New task

Register a new task by typing the task description in an input and pressing submit (the list of tasks should be a React `useState` with an array of objects, the current state of the input should be a `useState` with a string)

### Complete task

Mark the task as completed by checking a checkbox next to the task (`<input type=checkbox />`)
(implement by updating the task state for the checked task - this is a bit tricky)

### Change task description

Let the user update the description of an existing state by clicking a link by the task.
When updating a task, use a `<dialog>`.

1. `useState` with a `dialogOpen` state that reflects the state of the dialog
2. `useRef` to refer to the `<dialog>` element and `useEffect` to `showModal()` when `dialogOpen` updates
3. Submitting the form in the dialog should close the dialog

### Close the dialog correctly

If you press Escape in the dialog for updating task title, you may be unable to click the dialog open again.
This is because the state of `dialogOpen` has drifted away from the state of the HTML elements. Add a close listener
to the dialog (using the `useRef` reference) to update `dialogOpen` state when the user closes the dialog.

### Show task details with a router

Add `react-router-dom` as a dependency. Clicking on a task should take you to another route that focuses on the task.
You can choose whether this page just displays the task description or if you want to add more info.

</details>

### Exercise solution:

Check out the [solution for exercise 2](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/exercise/02/solution)

## Exercise 3: The TODO API

<details>
<summary>The purpose of exercise 3 is to implement a server with ExpressJS for the TODO application so that your actions will be stored if you reopen the web browser</summary>

Starting from what you did in exercise 2, we want to implement an ExpressJS server API for our tasks. If you have organized your frontend code like me, you
will have code that looks something like this:

```jsx
export function TaskApplication() {
    const [tasks, setTasks] = useState([]);

    const [editingTaskId, setEditingTaskId] = useState()

    function handleAddTask(task) {
        // ...
    }

    function handleTaskCompleted(id) {
        // ...
    }

    function handleChangeTask(id) {
        setEditingTaskId(id);
    }

    function handleCloseDialog() {
        setEditingTaskId(undefined);
    }

    function handleUpdateTask(id, taskDelta) {
       // ...
    }


    return <div>
        <TaskList
            tasks={tasks}
            onTaskCompleted={handleTaskCompleted}
            onChangeTask={handleChangeTask}
        />
        <NewTaskForm onAddTask={handleAddTask}/>
        <EditTaskDialog
            task={tasks.find(t => t.id === editingTaskId)}
            onUpdateTask={handleUpdateTask}
            onClose={handleCloseDialog}
        />
    </div>
}
```

In this exercise, you should replace the loading the initial tasks, handleAddTask, handleTaskCompleted and handleUpdateTask
as `fetch` calls to the ExpressJS server.

In your project, create a `client` and a `server` subdirectory with separate `package.json` files.

See [course notes](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/?tab=readme-ov-file#converting-react-to-serve-from-express) for details.


### Task 3: Get the server ready to run on Heroku

When you actually run the server on a cloud hosting provider like Heroku, Vite will not be running. Instead, you will run
execute `vite build` when you make a change to the application and ExpressJS will serve your React code as static files.

These are the high level steps, see the [course notes](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/?tab=readme-ov-file#deploy-to-heroku) for details.

1. Create a top level `package.json` file with a `build` script that builds the client project by executing `vite build`
2. Add a top level `start` script
3. Add a static resource to the ExpressJS application in `server.js`: `app.use(express.static("../client/dist"))`
4. To make React Routes work, you also need to [add middleware to handle default requests](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/?tab=readme-ov-file#express-middleware-for-dealing-with-browserrouter)

</details>

### Exercise solution:

Check out the [solution for exercise 3](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming/tree/exercise/03/solution)

## Exercise 4: Deploy the application to Heroku

> The purpose of exercise 4 is to get the code we've built to run on the Heroku cloud platform

Starting from the client+server application you created in exercise 3, in exercise 4, you should create a Heroku account and deploy your application there.

See [course notes](https://github.com/kristiania-pg6301-2024/pg6301-frontend-programming?tab=readme-ov-file#deploy-to-heroku) for details.

### Exercise solution:

There is no exercise solution for this week's exercise


