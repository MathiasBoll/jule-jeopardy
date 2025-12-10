import { useState, useEffect } from "react";

const useFetchQuestion = (gameId, categoryId, questionId) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(
    Boolean(gameId && categoryId && questionId)
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId || !categoryId || !questionId) return;

    const fetchQuestion = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/games`);
        if (!res.ok) throw new Error("Kunne ikke hente spil");

        const data = await res.json();
        const game = data.data.find((g) => g._id === gameId);
        if (!game) throw new Error("Game not found");

        const category = game.categories.find((c) => c._id === categoryId);
        if (!category) throw new Error("Category not found");

        const q = category.questions.find((q) => q._id === questionId);
        if (!q) throw new Error("Question not found");

        setQuestion(q);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [gameId, categoryId, questionId]);

  return { question, loading, error };
};

export default useFetchQuestion;
