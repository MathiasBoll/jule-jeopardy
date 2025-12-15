import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById } from "../../api/gameService";

import { TruncatedText } from "../../components/ui/TruncatedText";
import { CategoryLink } from "../CMS/CategoryLink";
import { CategoryTableRow } from "../CMS/CategoryTableRow";
import { KategoryTable } from "../CMS/KategoryTable";
import { TableHeader } from "../CMS/TableHeader";

import s from "./AdminQuestions.module.css";

const QuestionsTable = () => {
  const { gameId, categoryId } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId) {
      setLoading(false);
      return;
    }

    const loadGame = async () => {
      try {
        const data = await fetchGameById(gameId);
        setGame(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [gameId]);

  if (loading) return <p className={s.statusText}>Indlæser...</p>;
  if (error) return <p className={s.statusText}>Fejl: {error}</p>;
  if (!game) return <p className={s.statusText}>Spil ikke fundet</p>;

  const category = game.categories.find((c) => c._id === categoryId);
  if (!category) return <p className={s.statusText}>Kategori ikke fundet</p>;

  return (
    <>
      <h1 className={s.pageTitle}>Spørgsmål</h1>
      <p className={s.pageSubtitle}>{category.name}</p>

      <div className={s.tableWrapper}>
        <div className={s.addLinkWrapper}>
          <CategoryLink
            label="+ Opret nyt spørgsmål"
            to={`/admin/question/${gameId}/${categoryId}/new`}
          />
        </div>

        <KategoryTable
          headers={
            <>
              <TableHeader>Point</TableHeader>
              <TableHeader align="center">Spørgsmål</TableHeader>
              <TableHeader align="center">Svar</TableHeader>
              <TableHeader align="center">Handling</TableHeader>
            </>
          }
        >
          {category.questions.length === 0 ? (
            <tr>
              <td colSpan="4" className={s.emptyText}>
                Ingen spørgsmål fundet
              </td>
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
                    to={`/admin/question/${gameId}/${categoryId}/${q._id}`}
                  />
                </CategoryTableRow>
              </tr>
            ))
          )}
        </KategoryTable>
      </div>
    </>
  );
};

export default QuestionsTable;
