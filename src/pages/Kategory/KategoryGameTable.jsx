import React from "react";
import { useParams } from "react-router-dom";

// Custom hook der henter ét spil ud fra gameId
import FetchGameById from "./FetchGameById";

// Komponent der forkorter lange tekster (spørgsmål/svar)
import { TruncatedText } from "./TruncatedText";

// Layout-komponent til admin/CMS-visning
import DashBoardKategory from "./DashBoardKategory";

// Tabel-komponenter (genbruges i CMS)
import { KategoryTable } from "../CMS/KategoryTable";
import { GamesTableHeader } from "../CMS/GamesTableHeader";
import { CategoryTableRow } from "../CMS/CategoryTableRow";
import { CategoryLink } from "../CMS/CategoryLink";

/*
  KategoryGameTable
  -----------------
  Viser alle spørgsmål i én bestemt kategori
  for et bestemt spil (admin/CMS-visning).

  Flow:
  URL → gameId + categoryId
  → hent spil fra API
  → find korrekt kategori
  → vis spørgsmål i tabel
*/
const KategoryGameTable = () => {
  // Henter gameId og categoryId fra URL'en
  const { gameId, categoryId } = useParams();

  // Henter spillet fra API baseret på gameId
  const { game, loading, error } = FetchGameById(gameId);

  // Loading state mens API kaldes
  if (loading) return <p>Loading...</p>;

  // Fejl fra API
  if (error) return <p>Error: {error}</p>;

  // Hvis spil ikke findes
  if (!game) return <p>Game not found</p>;

  // Finder den specifikke kategori i spillet
  const category = game.categories.find((c) => c._id === categoryId);

  // Hvis kategorien ikke findes
  if (!category) return <p>Category not found</p>;

  return (
    <DashBoardKategory
      label={`Rediger spørgsmål – Kategori: ${category.name}`}
    >
      {/* Tabel til visning af spørgsmål */}
      <KategoryTable
        headers={
          <>
            <GamesTableHeader>Point</GamesTableHeader>
            <GamesTableHeader align="center">Spørgsmål</GamesTableHeader>
            <GamesTableHeader align="center">Svar</GamesTableHeader>
            <GamesTableHeader align="center">Handling</GamesTableHeader>
          </>
        }
      >
        {/* Hvis der ingen spørgsmål er */}
        {category.questions.length === 0 ? (
          <tr>
            <td>No questions found</td>
          </tr>
        ) : (
          // Mapper alle spørgsmål i kategorien
          category.questions.map((q) => (
            <tr key={q._id}>
              {/* Pointværdi */}
              <CategoryTableRow>{q.value}</CategoryTableRow>

              {/* Spørgsmål (forkortet visning) */}
              <CategoryTableRow>
                <TruncatedText text={q.question} wordCount={3} />
              </CategoryTableRow>

              {/* Svar (forkortet visning) */}
              <CategoryTableRow>
                <TruncatedText text={q.answer} wordCount={3} />
              </CategoryTableRow>

              {/* Link til redigering af spørgsmålet */}
              <CategoryTableRow>
                <CategoryLink
                  label="Rediger"
                  to={`/dashboard/games/${gameId}/${categoryId}/question/${q._id}/edit`}
                />
              </CategoryTableRow>
            </tr>
          ))
        )}
      </KategoryTable>
    </DashBoardKategory>
  );
};

export default KategoryGameTable;
