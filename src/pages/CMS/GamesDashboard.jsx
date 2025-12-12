// src/pages/GamesDashboard/GamesDashboard.jsx
// Overordnet dashboard-side til spiladministration
// Viser enten:
// - en spilvælger (GameSelect), eller
// - et dashboard for det valgte spil (GameTable)

import React, { useState } from "react";
import GameSelect from "../GameSelect/GameSelect";
import GameTable from "../GameTable/GameTable";

// GamesDashboard
// Ansvar:
// - styre hvilket spil der er valgt
// - skifte visning mellem spilvælger og spiloversigt
const GamesDashboard = () => {
  // State der holder det aktuelt valgte spil
  // Er null indtil brugeren vælger et spil
  const [currentGame, setCurrentGame] = useState(null);

  // Debug: viser valgt spil i konsollen
  console.log(currentGame);

  return (
    <section className="sectionAdmin">
      <div className="container">
        {/* Hvis der endnu ikke er valgt et spil */}
        {!currentGame ? (
          // Vis komponent til at vælge et spil
          // GameSelect kalder onSelect med det valgte spil
          <GameSelect onSelect={setCurrentGame} />
        ) : (
          // Når et spil er valgt, vises spillets data i en tabel
          <GameTable game={currentGame} />
        )}
      </div>
    </section>
  );
};

export default GamesDashboard;
