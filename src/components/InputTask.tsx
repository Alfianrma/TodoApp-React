import React from "react";

interface InputTaskProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

function InputTask({ todo, setTodo, handleAdd }: InputTaskProps) {
  return (
    <form className="w-100" onSubmit={(e) => handleAdd(e)}>
      <div className="input-group mb-3 px-20">
        <input
          type="text"
          className="form-control"
          placeholder="Add Task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="btn btn-success" type="submit" id="button-addon2">
          Add
        </button>
      </div>
    </form>
  );
}

export default InputTask;
