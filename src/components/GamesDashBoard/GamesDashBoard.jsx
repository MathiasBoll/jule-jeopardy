import React from "react";
import { useLocation } from "react-router-dom";

const GamesDashBoard = () => {
  const location = useLocation();
  const game = location.state;

  if (!game) return <p>No game selected</p>;

  return (
    <div>
      <h2>GamesDashboard placeholder</h2>
      <ul>
        {game.categories.map((cat) => (
          <div key={cat._id}>
            <h3>{cat.name}</h3>
            <ul>
              {cat.questions.map((q) => (
                <li key={q._id}>
                  <p>Value: {q.value}</p>
                  <p>Question: {q.question}</p>
                  <p>Answer: {q.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default GamesDashBoard;
