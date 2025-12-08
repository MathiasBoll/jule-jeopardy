import React from "react";
import { useLocation } from "react-router-dom";

const GamesDashBoard = () => {
  const location = useLocation();
  const game = location.state;
  return (
    <div>
      <h2>GamesDashboard placeholder</h2>

      {game && (
        <>
          <p>Selected game: {game.name}</p>
          {game.selectedCategory && (
            <p>Selected category: {game.selectedCategory}</p>
          )}
        </>
      )}
    </div>
  );
};

export default GamesDashBoard;
