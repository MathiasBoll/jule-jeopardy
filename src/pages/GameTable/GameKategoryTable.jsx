import React from "react";

// Wrapper-komponent der viser en overskrift/sektion for et spil
import { GameKategory } from "../CMS/GameKategory";

// Tabel-header komponent
import { GamesTableHeader } from "../CMS/GamesTableHeader";

// Link-komponent (React Router Link) til navigation
import { CategoryLink } from "../CMS/CategoryLink";

// Tabel-wrapper komponent
import { KategoryTable } from "../CMS/KategoryTable";

// Tabel-celle komponent
import { CategoryTableRow } from "../CMS/CategoryTableRow";

// CSS module til styling
import s from "./GameTable.module.css";

// Komponent der viser en tabel med kategorier for et valgt spil
const GameKategoryTable = ({ game }) => {
  // Debug: logger game-objektet fra parent-komponenten
  console.log(game);

  // Hvis der ikke er valgt et spil, vis en besked
  if (!game) return <p>No game selected</p>;

  // Henter kategorier fra spillet (fallback til tom array hvis undefined)
  const categories = game.categories || [];

  return (
    <div className={s.kategoryTable}>
      {/* Wrapper der viser spillets navn som label */}
      <GameKategory label={`Game name: ${game.name}`} game={game}>
        
        {/* Tabel der viser kategorier og handlinger */}
        <KategoryTable
          headers={
            <>
              {/* Kolonne-header for kategorinavn */}
              <GamesTableHeader>Kategory</GamesTableHeader>

              {/* Kolonne-header for handlinger (fx rediger) */}
              <GamesTableHeader>Handling</GamesTableHeader>
            </>
          }
        >
          {/* Hvis der ikke findes kategorier */}
          {categories.length === 0 ? (
            <tr>
              <td>No categories found</td>
            </tr>
          ) : (
            /* Loop gennem alle kategorier */
            categories.map((cat) => (
              <tr key={cat._id}>
                
                {/* Celle med kategorinavn */}
                <CategoryTableRow>
                  {cat.name}
                </CategoryTableRow>

                {/* Celle med link til redigering af kategori */}
                <CategoryTableRow>
                  <CategoryLink
                    to={`/kategory/${game._id}/${cat._id}`}
                    label="Rediger"
                  />
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
