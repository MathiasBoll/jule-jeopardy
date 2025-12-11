// src/pages/JeopardyQuestion/JeopardyQuestionForm.jsx
// Formular til at oprette/redigere ét Jeopardy-spørgsmål.
// Indeholder al logik til fetch, validering og UI state.

import { useState, useEffect } from "react";

const POINT_VALUES = [100, 200, 300, 400, 500];

const JeopardyQuestionForm = ({
  gameName,
  categoryName,
  gameId,
  categoryId,
  questionId = null,
  initialData = null,
  onSuccess,
  onCancel,
}) => {
  // Standardform-data (bruges både til create og edit)
  const [formData, setFormData] = useState(
    initialData || {
      pointValue: "100",
      question: "",
      answer: "",
      notes: "",
    }
  );

  useEffect(() => {
    console.log("initialData", initialData);
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

  // Hvis der er et questionId, er vi i "rediger"-mode
  const isEditMode = Boolean(questionId);

  // Opdater lokal state når bruger skriver i felterne
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit til API (create eller update afhængigt af isEditMode)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const payload = {
        ...formData,
        gameId,
        categoryId,
      };

      const url = isEditMode
        ? `${import.meta.env.VITE_API_BASE_URL}/questions/${questionId}`
        : `${import.meta.env.VITE_API_BASE_URL}/questions`;

      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Kunne ikke gemme spørgsmålet");
      }

      const savedQuestion = await res.json();

      setSuccessMessage(
        isEditMode ? "Spørgsmål opdateret!" : "Spørgsmål gemt!"
      );

      // Nulstil formular hvis vi har oprettet et nyt spørgsmål
      if (!isEditMode) {
        setFormData({
          pointValue: "100",
          question: "",
          answer: "",
          notes: "",
        });
      }

      // Giv besked til parent (fx til at refetche liste)
      if (onSuccess) {
        onSuccess(savedQuestion);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Annuller klik – enten kald onCancel eller reset form
  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    } else {
      // Fallback: reset form til initialData / default
      setFormData(
        initialData || {
          pointValue: "100",
          question: "",
          answer: "",
          notes: "",
        }
      );
    }
  };

  // Brug fallback-tekster hvis gameName/categoryName ikke er givet
  const safeGameName = gameName || "Jule Jeopardy ";
  const safeCategoryName = categoryName || "Julemad";

  return (
    <>
      <div className="jq-panel">
        {/* Header med breadcrumb og titler */}
        <header className="jq-header">
          <p className="jq-breadcrumb">ADMIN · SPØRGSMÅL</p>

          <h1 className="jq-title">
            {isEditMode
              ? "Rediger Jeopardy-spørgsmål"
              : "Opret Jeopardy-spørgsmål"}
          </h1>

          <div className="jq-meta">
            <span>
              <strong>Admin</strong> · Spil · {safeGameName}
            </span>
            <span>
              Kategori: <strong>{safeCategoryName}</strong>
            </span>
          </div>

          <h2 className="jq-subtitle">
            {isEditMode ? "Rediger spørgsmål –" : "Nyt spørgsmål –"}{" "}
            {safeCategoryName} / {formData.pointValue} point
          </h2>
        </header>

        {/* Selve formularen */}
        <form
          className="jq-form"
          onSubmit={handleSubmit}
          aria-labelledby="form-heading"
        >
          {/* Error / success messages */}
          {error && (
            <div
              className="jq-alert jq-alert-error"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}

          {successMessage && (
            <div
              className="jq-alert jq-alert-success"
              role="status"
              aria-live="polite"
            >
              {successMessage}
            </div>
          )}

          {/* Pointværdi */}
          <div className="jq-field-group">
            <label className="jq-label" htmlFor="pointValue">
              Pointværdi
            </label>
            <select
              id="pointValue"
              name="pointValue"
              className="jq-select"
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

          {/* Spørgsmålstekst */}
          <div className="jq-field-group">
            <label className="jq-label" htmlFor="question">
              Spørgsmål
            </label>
            <textarea
              id="question"
              name="question"
              className="jq-textarea"
              value={formData.question}
              onChange={handleChange}
              placeholder="Skriv hele spørgsmålet, som det skal vises for eleverne..."
              rows="6"
              required
              aria-required="true"
              aria-describedby="question-hint"
            />
            <small id="question-hint" className="jq-hint">
              Skriv hele spørgsmålet, som det skal vises for eleverne.
            </small>
          </div>

          {/* Svar */}
          <div className="jq-field-group">
            <label className="jq-label" htmlFor="answer">
              Svar
            </label>
            <textarea
              id="answer"
              name="answer"
              className="jq-textarea"
              value={formData.answer}
              onChange={handleChange}
              placeholder="Skriv svaret i Jeopardy-format, f.eks. 'Hvad er gløgg?'"
              rows="6"
              required
              aria-required="true"
              aria-describedby="answer-hint"
            />
            <small id="answer-hint" className="jq-hint">
              Skriv svaret i Jeopardy-format, f.eks. &quot;Hvad er gløgg?&quot;
            </small>
          </div>

          {/* Noter */}
          <div className="jq-field-group">
            <label className="jq-label" htmlFor="notes">
              Noter (valgfrit – kun til lærere)
            </label>
            <textarea
              id="notes"
              name="notes"
              className="jq-textarea jq-textarea-notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Hint, kilde eller ekstra info..."
              rows="4"
              aria-describedby="notes-hint"
            />
            <small id="notes-hint" className="jq-hint">
              Vises kun i admin – ikke for eleverne.
            </small>
          </div>

          {/* Knapper */}
          <div className="jq-actions">
            <button
              type="button"
              className="jq-btn jq-btn-secondary"
              onClick={handleCancelClick}
              disabled={isSubmitting}
              aria-label="Annuller og gå tilbage"
            >
              Annuller
            </button>
            <button
              type="submit"
              className="jq-btn jq-btn-primary"
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

export default JeopardyQuestionForm;
