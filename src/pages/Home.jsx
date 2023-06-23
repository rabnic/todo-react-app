import React, { useState } from "react";

export default function Home({
  currentUser,
  setCurrentUser,
  currentUserUpdated,
}) {
  const todos = currentUser.todos;
  let currentTodoIndex = -1;

  const [filterData, setFilterData] = useState(currentUser.todos);

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
    todos.push(todo);
    setCurrentUser({ ...currentUser, todos: todos });
    clearFields();
  };

  const handleDeleteTodo = (todoIndex) => {
    todos.splice(todoIndex, 1);
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

  const filterByPriority = (priority) => {
    setFilterData(currentUser.todos.filter(obj => {
      return obj.priority === priority
    }))
    console.log(filterData)
  }

  const filterByComplete = (isComplete) => {
    setFilterData(currentUser.todos.filter(obj => {
      return obj.isCompleted === isComplete
    }))
    console.log(filterData)
  }

  const getAll = () => {
    setFilterData([...currentUser.todos])
    console.log(filterData)
  }

  const changeFilterBtnBackground = (e) => {
    Array.from(e.target.parentNode.children).forEach(btn => {
      btn.style.backgroundColor = "transparent";
      btn.style.color = "#ddd";
    });
    e.target.style.backgroundColor = '#ddd';
    e.target.style.color = 'var(--dark)';
  }

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
              <input type='text' hidden id='index' onChange={(e) => { e.target.value = currentTodoIndex }} />
              <button type="submit" onClick={handleAddNewTask} id='add-todo-btn'>
                Add Todo
              </button>
              <button onClick={handleUpdateTodo} id='update-todo-btn'>Update Todo</button>
            </fieldset>
          </form>
        </div>
        <div className="filter-container">
          <h2>Filter Todos</h2>
          <div className="filter-btns">
            <button onClick={(e) => { getAll();changeFilterBtnBackground(e); }}>All</button>
            <button onClick={(e) => { filterByPriority('low');changeFilterBtnBackground(e); }}>Low</button>
            <button onClick={(e) => { filterByPriority('medium');changeFilterBtnBackground(e); }}>Medium</button>
            <button onClick={(e) => { filterByPriority('high');changeFilterBtnBackground(e); }}>High</button>
            <button onClick={(e) => { filterByComplete(true);changeFilterBtnBackground(e); }}>Completed</button>
            <button onClick={(e) => { filterByComplete(false);changeFilterBtnBackground(e); }}>Incomplete</button>
          </div>
        </div>
        <div className="todos-container">
          {filterData.map((currTodo, index) => {
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
