import React from "react";
import { useParams } from "react-router-dom";
import FetchGameById from "./FetchGameById";
import { TruncatedText } from "./TruncatedText";

import DashBoardKategory from "./DashBoardKategory";
import { KategoryTable } from "../CMS/KategoryTable";
import { GamesTableHeader } from "../CMS/GamesTableHeader";
import { CategoryTableRow } from "../CMS/CategoryTableRow";
import { CategoryLink } from "../CMS/CategoryLink";

const KategoryGameTable = () => {
  const { gameId, categoryId } = useParams();
  const { game, loading, error } = FetchGameById(gameId);
  // const [editingQuestionId, setEditingQuestionId] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!game) return <p>Game not found</p>;

  const category = game.categories.find((c) => c._id === categoryId);

  if (!category) return <p>Category not found</p>;

  return (
    <DashBoardKategory label={`Rediger spørgsmål – Kategori: ${category.name}`}>
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
        {category.questions.length === 0 ? (
          <tr>
            <td>No questions found</td>
          </tr>
        ) : (
          category.questions.map((q) => (
            <tr key={q._id}>
              <CategoryTableRow>{q.value}</CategoryTableRow>
              <CategoryTableRow>
                <TruncatedText text={q.question} wordCount={3} />
              </CategoryTableRow>
              <CategoryTableRow>
                <TruncatedText text={q.answer} wordCount={3} />
              </CategoryTableRow>
              <CategoryTableRow>
                <CategoryLink
                  label="Rediger"
                  to={`/dashboard/games/${gameId}/${categoryId}/question/${q._id}/edit`}
                ></CategoryLink>
              </CategoryTableRow>
            </tr>
          ))
        )}
      </KategoryTable>
    </DashBoardKategory>
  );
};

export default KategoryGameTable;
