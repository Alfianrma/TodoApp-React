import React, { useState } from "react";
import { Todo } from "../model";
import starIcon from "../assets/star.svg";
import starFillIcon from "../assets/star-fill.svg";
import trashIcon from "../assets/trash.svg";
import pencilIcon from "../assets/pencil-square.svg";

interface MyTaskProps {
  taskList: Todo[];
  settaskList: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: string;
}

function MyTask({ taskList, settaskList, filter }: MyTaskProps) {
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<string>("");

  const deleteTask = (id: number) => {
    const updatedList = taskList.filter((item) => item.id !== id);
    window.localStorage.setItem("myTodo", JSON.stringify(updatedList));
    settaskList(updatedList);
  };

  const completeTask = (id: number) => {
    const updatedList = taskList.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    window.localStorage.setItem("myTodo", JSON.stringify(updatedList));
    settaskList(updatedList);
  };

  const addToFavourite = (id: number) => {
    const updatedList = taskList.map((item) => {
      if (item.id === id) {
        return { ...item, isFavourite: !item.isFavourite };
      }
      return item;
    });
    window.localStorage.setItem("myTodo", JSON.stringify(updatedList));
    settaskList(updatedList);
  };

  const toggleEdit = (id: number) => {
    setEditItemId(id === editItemId ? null : id);
    const updatedList = taskList.map((item) => {
      if (item.id === id) {
        return { ...item, task: editTask };
      }
      return item;
    });
    window.localStorage.setItem("myTodo", JSON.stringify(updatedList));
    settaskList(updatedList);
  };

  return (
    <div className="vstack gap-3 d-flex align-items-center">
      {taskList
        .filter((task) => {
          if (filter === "all") return true;
          if (filter === "completed") return task.isCompleted;
          if (filter === "favourite") return task.isFavourite;
          return false;
        })
        .map((task) => {
          return (
            <div
              key={task.id}
              className="d-flex flex-row align-items-center justify-content-between px-3 py-2 rounded-3 shadow-sm w-100 h-auto"
              style={{
                height: "60px",
                backgroundColor: "#F1FF90",
              }}
            >
              {editItemId === task.id ? (
                <form onSubmit={() => toggleEdit(task.id)}>
                  <div className="input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setEditTask(e.target.value)}
                    />
                    <button
                      className="btn btn-success"
                      type="submit"
                      id="button-addon2"
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <div className="d-flex flex-row">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => completeTask(task.id)}
                  />
                  <p
                    style={{
                      textDecoration: task.isCompleted
                        ? "line-through"
                        : "none",
                      marginTop: "10px",
                      marginLeft: "10px",
                    }}
                  >
                    {task.task}
                  </p>
                </div>
              )}

              <div>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => toggleEdit(task.id)}
                >
                  <img src={pencilIcon} />
                </button>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => deleteTask(task.id)}
                >
                  <img src={trashIcon} />
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => addToFavourite(task.id)}
                >
                  {task.isFavourite ? (
                    <img src={starFillIcon} />
                  ) : (
                    <img src={starIcon} />
                  )}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default MyTask;
