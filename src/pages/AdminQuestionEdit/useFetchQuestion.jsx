import { useEffect, useState } from "react";
import { fetchGameById } from "../../api/gameService";

const useFetchQuestion = (gameId, categoryId, questionId) => {
  const [question, setQuestion] = useState(null);
  const [gameName, setGameName] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId || !categoryId) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const game = await fetchGameById(gameId);
        const category = game.categories.find((c) => c._id === categoryId);

        setGameName(game.name);
        setCategoryName(category?.name);

        // Only fetch question if editing (not creating new)
        if (questionId && questionId !== "new") {
          const q = category?.questions?.find((q) => q._id === questionId);
          setQuestion(q);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [gameId, categoryId, questionId]);

  return { question, gameName, categoryName, loading, error };
};

export default useFetchQuestion;
