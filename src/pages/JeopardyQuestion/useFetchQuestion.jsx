import { useEffect, useState } from "react";
import { fetchGameById } from "../../api/gameService";

const useFetchQuestion = (gameId, categoryId, questionId) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(
    Boolean(gameId && categoryId && questionId)
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId || !categoryId || !questionId) return;

    const loadQuestion = async () => {
      setLoading(true);
      setError(null);

      try {
        const game = await fetchGameById(gameId);
        const category = game.categories.find((c) => c._id === categoryId);
        const q = category.questions.find((q) => q._id === questionId);
        setQuestion(q);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuestion();
  }, [gameId, categoryId, questionId]);

  return { question, loading, error };
};

export default useFetchQuestion;
