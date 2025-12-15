import { useEffect, useState } from "react";
import { fetchGameById, updateGame } from "../../api/gameService";

const POINT_VALUES = [100, 200, 300, 400, 500];

const QuestionForm = ({
  gameName,
  categoryName,
  gameId,
  categoryId,
  questionId = null,
  initialData = null,
  onSuccess,
}) => {
  const DEFAULT_FORM = {
    pointValue: "100",
    question: "",
    answer: "",
    notes: "",
  };

  const getInitialFormData = () => {
    if (!initialData) return { ...DEFAULT_FORM };

    return {
      pointValue: initialData.pointValue || initialData.value || "100",
      question: initialData.question || "",
      answer: initialData.answer || "",
      notes: initialData.notes || "",
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);

  useEffect(() => {
    if (initialData) {
      setFormData({
        pointValue: initialData.pointValue || initialData.value || "100",
        question: initialData.question || "",
        answer: initialData.answer || "",
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const isEditMode = questionId && questionId !== "new";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const game = await fetchGameById(gameId);
      if (!game) {
        throw new Error("Kunne ikke hente spillet");
      }

      const updatedCategories = game.categories.map((category) => {
        if (category._id === categoryId) {
          if (isEditMode) {
            const updatedQuestions = category.questions.map((q) => {
              if (q._id === questionId) {
                return {
                  ...q,
                  value: parseInt(formData.pointValue),
                  question: formData.question,
                  answer: formData.answer,
                  notes: formData.notes,
                };
              }
              return q;
            });
            return { ...category, questions: updatedQuestions };
          } else {
            const newQuestion = {
              value: parseInt(formData.pointValue),
              question: formData.question,
              answer: formData.answer,
              notes: formData.notes,
            };
            return {
              ...category,
              questions: [...category.questions, newQuestion],
            };
          }
        }
        return category;
      });

      const updatedGame = {
        id: game._id,
        name: game.name,
        isOver: game.isOver || false,
        categories: updatedCategories.map((cat) => ({
          _id: cat._id,
          name: cat.name,
          questions: cat.questions.map((q) => ({
            _id: q._id,
            question: q.question,
            answer: q.answer,
            value: q.value,
            answered: q.answered || false,
          })),
        })),
      };
      const result = await updateGame(updatedGame);

      if (!result.data) {
        throw new Error(result.message || "Kunne ikke gemme spørgsmålet");
      }

      setSuccessMessage(
        isEditMode ? "Spørgsmål opdateret!" : "Spørgsmål gemt!"
      );

      if (!isEditMode) {
        setFormData({
          pointValue: "100",
          question: "",
          answer: "",
          notes: "",
        });
      }

      if (onSuccess) {
        onSuccess(result.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    setFormData({ pointValue: "100", question: "", answer: "", notes: "" });
  };

  const safeGameName = gameName || "Jule Jeopardy";
  const safeCategoryName = categoryName || "Kategori";

  return (
    <>
      <div className="aqe-panel">
        <header className="aqe-header">
          <p className="aqe-breadcrumb">ADMIN · SPØRGSMÅL</p>

          <h1 className="aqe-title">
            {isEditMode
              ? "Rediger Jeopardy-spørgsmål"
              : "Opret Jeopardy-spørgsmål"}
          </h1>

          <div className="aqe-meta">
            <span>
              <strong>Admin</strong> · Spil · {safeGameName}
            </span>
            <span>
              Kategori: <strong>{safeCategoryName}</strong>
            </span>
          </div>

          <h2 className="aqe-subtitle">
            {isEditMode ? "Rediger spørgsmål –" : "Nyt spørgsmål –"}{" "}
            {safeCategoryName} / {formData.pointValue} point
          </h2>
        </header>

        <form
          className="aqe-form"
          onSubmit={handleSubmit}
          aria-labelledby="form-heading"
        >
          {error && (
            <div
              className="aqe-alert aqe-alert-error"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}

          {successMessage && (
            <div
              className="aqe-alert aqe-alert-success"
              role="status"
              aria-live="polite"
            >
              {successMessage}
            </div>
          )}

          <div className="aqe-field-group">
            <label className="aqe-label" htmlFor="pointValue">
              Pointværdi
            </label>
            <select
              id="pointValue"
              name="pointValue"
              className="aqe-select"
              value={formData.pointValue}
              onChange={handleChange}
              required
              aria-required="true"
            >
              {POINT_VALUES.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="aqe-field-group">
            <label className="aqe-label" htmlFor="question">
              Spørgsmål
            </label>
            <textarea
              id="question"
              name="question"
              className="aqe-textarea"
              value={formData.question}
              onChange={handleChange}
              placeholder="Skriv hele spørgsmålet, som det skal vises for eleverne..."
              rows="6"
              required
              aria-required="true"
              aria-describedby="question-hint"
            />
            <small id="question-hint" className="aqe-hint">
              Skriv hele spørgsmålet, som det skal vises for eleverne.
            </small>
          </div>

          <div className="aqe-field-group">
            <label className="aqe-label" htmlFor="answer">
              Svar
            </label>
            <textarea
              id="answer"
              name="answer"
              className="aqe-textarea"
              value={formData.answer}
              onChange={handleChange}
              placeholder="Skriv svaret i Jeopardy-format, f.eks. 'Hvad er gløgg?'"
              rows="6"
              required
              aria-required="true"
              aria-describedby="answer-hint"
            />
            <small id="answer-hint" className="aqe-hint">
              Skriv svaret i Jeopardy-format, f.eks. &quot;Hvad er gløgg?&quot;
            </small>
          </div>

          <div className="aqe-field-group">
            <label className="aqe-label" htmlFor="notes">
              Noter (valgfrit – kun til lærere)
            </label>
            <textarea
              id="notes"
              name="notes"
              className="aqe-textarea aqe-textarea-notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Hint, kilde eller ekstra info..."
              rows="4"
              aria-describedby="notes-hint"
            />
            <small id="notes-hint" className="aqe-hint">
              Vises kun i admin – ikke for eleverne.
            </small>
          </div>

          <div className="aqe-actions">
            <button
              type="button"
              className="aqe-btn aqe-btn-secondary"
              onClick={handleCancelClick}
              disabled={isSubmitting}
              aria-label="Annuller og gå tilbage"
            >
              Annuller
            </button>
            <button
              type="submit"
              className="aqe-btn aqe-btn-primary"
              disabled={isSubmitting}
              aria-label={isEditMode ? "Gem ændringer" : "Gem nyt spørgsmål"}
            >
              {isSubmitting
                ? "Gemmer..."
                : isEditMode
                ? "Gem ændringer"
                : "Gem spørgsmål"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default QuestionForm;
