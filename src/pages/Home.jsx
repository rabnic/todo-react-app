import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home({
  currentUser,
  setCurrentUser,
  currentUserUpdated,
}) {
  const todos = currentUser.todos;
  let currentTodoIndex = -1;

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    isCompleted: false,
    priority: "",
    dueDate: "",
    completedDate: "",
  });

  const handleAddNewTask = (e) => {
    e.preventDefault();
    console.log(todos);
    todos.push(todo);
    console.log(todos);
    setCurrentUser({ ...currentUser, todos: todos });
    clearFields();
  };

  const handleDeleteTodo = (todoIndex) => {
    todos.splice(todoIndex, 1);
    // setCurrentUser({ ...currentUser, todos: todos })
    currentUserUpdated({ ...currentUser, todos: todos });
  };

  const handleTodoCompleted = (todoIndex) => {
    todos[todoIndex].isCompleted = !todos[todoIndex].isCompleted;
    currentUserUpdated({ ...currentUser, todos: todos });
  };

  const handleUpdateTodo = (e) => {
    e.preventDefault();
    todos[parseInt(document.getElementById('index').value)] = todo;
    currentUserUpdated({ ...currentUser, todos: todos });
    clearFields()
    document.getElementById('add-todo-btn').style.display = 'block';
    document.getElementById('update-todo-btn').style.display = 'none';
  };

  const populateTodoForm = (currTodo, index) => {
    document.getElementById('add-todo-btn').style.display = 'none';
    document.getElementById('update-todo-btn').style.display = 'block';

    document.getElementById("title").value = currTodo.title;
    document.getElementById("description").value = currTodo.description;
    document.getElementById(currTodo.priority).checked = true;
    document.getElementById('index').value = index;
    document.getElementById('dueDate').value = currTodo.dueDate;
    currentTodoIndex = index;
    setTodo(currTodo);
  };

  const clearFields = () => {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("low").checked = false;
    document.getElementById("medium").checked = false;
    document.getElementById("high").checked = false;
    document.getElementById("dueDate").value = "";
  };

  return (
    <>
      <div className="container home">
        <h1>Hi, {currentUser.fullName}</h1>
        <h2>Manage and view your todos:</h2>
        <div>
          <form>
            <fieldset>
              <legend>Add New Todo:</legend>
              <label>
                Title
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Todo title"
                  required
                  onChange={(e) => {
                    setTodo({ ...todo, title: e.target.value });
                  }}
                />
              </label>
              <label>
                Description
                <textarea
                  cols="50"
                  rows="4"
                  id="description"
                  placeholder="The todo description"
                  required
                  onChange={(e) => {
                    setTodo({ ...todo, description: e.target.value });
                  }}
                ></textarea>
              </label>

              <label>Priority</label>
              <div className="priorities">
                <span className="priority-low">
                  <input
                    type="radio"
                    name="priority"
                    id="low"
                    value="low"
                    onClick={(e) => {
                      setTodo({ ...todo, priority: e.target.value });
                    }}
                  />{" "}
                  Low
                </span>
                <span className="priority-medium">
                  <input
                    type="radio"
                    name="priority"
                    id="medium"
                    value="medium"
                    onClick={(e) => {
                      setTodo({ ...todo, priority: e.target.value });
                    }}
                  />{" "}
                  Medium
                </span>
                <span className="priority-high">
                  {" "}
                  <input
                    type="radio"
                    name="priority"
                    id="high"
                    value="high"
                    onClick={(e) => {
                      setTodo({ ...todo, priority: e.target.value });
                    }}
                  />{" "}
                  High
                </span>
              </div>

              <label>
                Due Date
                <input
                  type="date"
                  id="dueDate"
                  name="due-date"
                  min={new Date().toLocaleDateString()}
                  onChange={(e) => {
                    setTodo({ ...todo, dueDate: e.target.value });
                  }}
                />
              </label>
              <input type='text' hidden id='index' onChange={(e) => {e.target.value = currentTodoIndex}}/>
              <button type="submit" onClick={handleAddNewTask} id='add-todo-btn'>
                Add Todo
              </button>
              <button onClick={handleUpdateTodo} id='update-todo-btn'>Update Todo</button>
            </fieldset>
          </form>
        </div>
        <div className="todos-container">
          {currentUser.todos.map((currTodo, index) => {
            return (
              <div
                className={`todo-card ${currTodo.isCompleted && "completed"}`}
                key={index}
              >
                <div className="todo-check">
                  <input
                    type="checkbox"
                    defaultChecked={currTodo.isCompleted}
                    className={`is-completed-check ${currTodo.priority}`}
                    onClick={() => {
                      handleTodoCompleted(index);
                    }}
                  ></input>
                </div>
                <p>{currTodo.title + " - " + currTodo.description}</p>
                <div className="todo-icons">
                  <img
                    className="header-icon"
                    src="./icons/edit.png"
                    alt="Todo edit icon"
                    onClick={() => {
                      populateTodoForm(currTodo, index);
                    }}
                  />
                  <img
                    className="header-icon"
                    src="./icons/delete.png"
                    alt="Todo delete icon"
                    onClick={() => {
                      handleDeleteTodo(index);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
