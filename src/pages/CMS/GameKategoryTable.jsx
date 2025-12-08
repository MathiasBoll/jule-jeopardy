import React from "react";
import FetchGame from "../CMS/FetchGame";
import { GameKategory } from "./GameKategory";
import { GamesTableHeader } from "./GamesTableHeader";
import { CategoryLink } from "./CategoryLink";

import { KategoryTable } from "./KategoryTable";
import { CategoryTableRow } from "./CategoryTableRow";
import s from "./DashBoard.module.css";

const GameKategoryTable = () => {
  const { games, loading, error } = FetchGame();

  if (loading) return <p>Loading games...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!games.length) return <p>No games found</p>;

  const game = games[0];
  const categories = game.categories || [];

  return (
    <div className={s.kategoryTable}>
      <GameKategory label="Game Kategory" game={game}>
        <KategoryTable
          headers={
            <>
              <GamesTableHeader>Kategory</GamesTableHeader>
              <GamesTableHeader>Handling</GamesTableHeader>
            </>
          }
        >
          {categories.length === 0 ? (
            <tr>
              <td>No categories found</td>
            </tr>
          ) : (
            categories.map((cat) => (
              <tr key={cat._id}>
                <CategoryTableRow>{cat.name}</CategoryTableRow>
                <CategoryTableRow>
                  <CategoryLink
                    gameId={game._id}
                    categoryId={cat._id}
                    label="Rediger"
                  ></CategoryLink>
                </CategoryTableRow>
              </tr>
            ))
          )}
        </KategoryTable>
      </GameKategory>
    </div>
  );
};

export default GameKategoryTable;
