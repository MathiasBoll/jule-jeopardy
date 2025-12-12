import React from "react";

import { GameKategory } from "../CMS/GameKategory";
import { GamesTableHeader } from "../CMS/GamesTableHeader";
import { CategoryLink } from "../CMS/CategoryLink";

import { KategoryTable } from "../CMS/KategoryTable";
import { CategoryTableRow } from "../CMS/CategoryTableRow";
import s from "./GameTable.module.css";

const GameKategoryTable = ({ game }) => {
  console.log(game);
  if (!game) return <p>No game selected</p>;

  const categories = game.categories || [];

  return (
    <div className={s.kategoryTable}>
      <GameKategory label={`Game name: ${game.name}`} game={game}>
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
                    to={`/kategory/${game._id}/${cat._id}`}
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
