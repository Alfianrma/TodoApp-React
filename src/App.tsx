import React, { useState, useEffect } from "react";
import "./style/style.css";
import InputTask from "./components/InputTask";
import { Todo } from "./model";
import MyTask from "./components/MyTask";
import MenuOption from "./components/MenuOption";

function App() {
  const storedList = window.localStorage.getItem("myTodo");
  const [todo, setTodo] = useState<string>("");
  const [taskList, settaskList] = useState<Todo[]>(
    storedList ? JSON.parse(storedList) : []
  );
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    window.localStorage.setItem("myTodo", JSON.stringify(taskList));
  }, [taskList]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      settaskList([
        ...taskList,
        { id: Date.now(), task: todo, isCompleted: false, isFavourite: false },
      ]);
      setTodo("");
    }
  };

  const showAllTasks = () => {
    setFilter("all");
  };

  const showCompletedTasks = () => {
    setFilter("completed");
  };

  const showFavoriteTasks = () => {
    setFilter("favourite");
  };

  return (
    <div className="screen">
      <h1 className="text-white">Todo App</h1>
      <InputTask todo={todo} setTodo={setTodo} handleAdd={addTask} />
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12 order-md-first mb-3">
            <MenuOption
              showAllTasks={showAllTasks}
              showCompletedTasks={showCompletedTasks}
              showFavoriteTasks={showFavoriteTasks}
            />
          </div>
          <div className="col-md-8 col-sm-12 order-md-last">
            <MyTask
              taskList={taskList}
              settaskList={settaskList}
              filter={filter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
