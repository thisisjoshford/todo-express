LAB 11: Fullstack TODO list
===

## Goal

Two-day solo lab! (but collaborate as much as needed)

**Deployed** My Todo App with page for tracking a single list of TODOs

1. Display a list of todos and indicate whether or not complete
1. Have a form for adding a todo
1. Mark a todo as complete
1. STRETCH: Remove a todo

## Project Setup

1. Create **new repository** for this lab
1. Copy `starter-code` to your repo, there is a lot of code to get you going
1. Create a "my_todos" database
    - Running locally? cli command is `createdb my_todos` to create a db
    - Or setup heroku and retrieve db uri via `heroku config:get DATABASE_URL`
    - (you can start psql with `psql <the database uri>` to connect to remote db)
1. There are already `scripts` in `package.json`
1. Database scripts are provided. Run `npm run setup-db`

**Work in vertical slices!**
1. Get Todos
1. Add a Todo
1. Mark (or unmark) Todo complete (aka update) 
1. STRETCH: Delete a Todo

**Deploy to Heroku!**

## Todo Data

Looks like:

```js
{
    task: 'Thing to do',
    completed: false
}
```

## App

1. HTML pages already provided, all of the work today will happen on todos page. 
1. You will need to create components (indicated below).
1. You will need to add some more CSS, but feel free to change any starter code CSS styling
1. All of the data work will happen in the `TodoApp` component
1. For adding or removing data, don't refresh the list of todos from the server, instead:
    1. add, update, or remove the todo using a server method
    1. on success, modify the array you already have (add, replace, or remove to/from array of todos)
    1. call update on the list component with the updated array

### Components

![todo example](todo.png)

- `TodoApp`
    - `AddTodo` (props: `onAdd`)
    - `TodoList` (props: `todos`, `onUpdate`, STRETCH: `onRemove`)
        - [`TodoItem`] (props: `todo`, `onUpdate`, STRETCH: `onRemove`)
    
**Draw both a boxed UI component diagram and a tree-flow diagram and submit a photo with your lab**

1. Draw UI boxes
1. Compose Tree Diagram from step #1
1. For each component, what does it need?
1. Map out how the data will flow

### API Services

1. `getTodos()`
1. `addTodo(todo)`
1. `updateTodo(todo)`
1. STRETCH: `removeTodo(todoId)`

## Server 

Route | SQL
---|---
`GET /todos` | `SELECT`
`POST /todos` | `INSERT` w/ `RETURNING`
`PUT /todos/:id` | `UPDATE` w/ `RETURNING`
STRETCH: `DELETE /todos/:id` `DELETE`

## Points Break Down

Looking For | Points (10)
:--|--:
Component UI Diagram and Data Flow Diagram | 2
Vertical: Get Todos | 3
Vertical: Add a Todo | 2
Vertical: Mark Todo Complete | 3
Vertical: Remove Todo | +2
