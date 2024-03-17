import React from "react";

interface MenuOptionProps {
  showAllTasks: () => void;
  showCompletedTasks: () => void;
  showFavoriteTasks: () => void;
}

function MenuOption({
  showAllTasks,
  showCompletedTasks,
  showFavoriteTasks,
}: MenuOptionProps) {
  return (
    <div className="vstack gap-1">
      <button className="btn btn-primary" onClick={showAllTasks}>
        Show All Task
      </button>
      <button className="btn btn-primary" onClick={showCompletedTasks}>
        Show Completed Task
      </button>
      <button className="btn btn-primary" onClick={showFavoriteTasks}>
        Show Favourite Task
      </button>
    </div>
  );
}

export default MenuOption;
