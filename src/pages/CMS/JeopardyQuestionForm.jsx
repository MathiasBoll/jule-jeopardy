import { useState } from "react";

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
  const [formData, setFormData] = useState(
    initialData || {
      pointValue: "100",
      question: "",
      answer: "",
      notes: "",
    }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const isEditMode = Boolean(questionId);

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

      if (!isEditMode) {
        // Reset form after successful creation
        setFormData({
          pointValue: "100",
          question: "",
          answer: "",
          notes: "",
        });
      }

      // Notify parent component
      if (onSuccess) {
        onSuccess(savedQuestion);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    } else {
      // Fallback: reset form
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

  return (
    <div>
      <h2>{isEditMode ? "Rediger" : "Opret"} Jeopardy Spørgsmål</h2>

      <nav aria-label="Breadcrumb">
        <ol>
          <li>Admin</li>
          <li>Spil</li>
          <li>{gameName}</li>
          <li>Kategori: {categoryName}</li>
          <li>Spørgsmål</li>
        </ol>
      </nav>

      <div>
        <h3>
          {isEditMode ? "Rediger" : "Nyt"} spørgsmål – {categoryName} /{" "}
          {formData.pointValue} point
        </h3>
      </div>

      <form onSubmit={handleSubmit} aria-labelledby="form-heading">
        {error && (
          <div role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        {successMessage && (
          <div role="status" aria-live="polite">
            {successMessage}
          </div>
        )}

        <div>
          <label htmlFor="pointValue">Pointværdi</label>
          <select
            id="pointValue"
            name="pointValue"
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

        <div>
          <label htmlFor="question">Spørgsmål</label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Skriv hele spørgsmålet, som det skal vises for eleverne..."
            rows="6"
            required
            aria-required="true"
            aria-describedby="question-hint"
          />
          <small id="question-hint">
            Skriv hele spørgsmålet, som det skal vises for eleverne
          </small>
        </div>

        <div>
          <label htmlFor="answer">Svar</label>
          <textarea
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            placeholder="Skriv svaret i Jeopardy-format, f.eks. 'Hvad er gløgg?'"
            rows="6"
            required
            aria-required="true"
            aria-describedby="answer-hint"
          />
          <small id="answer-hint">
            Skriv svaret i Jeopardy-format, f.eks. &quot;Hvad er gløgg?&quot;
          </small>
        </div>

        <div>
          <label htmlFor="notes">Noter (valgfrit – kun til lærere)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Hint, kilde eller ekstra info..."
            rows="4"
            aria-describedby="notes-hint"
          />
          <small id="notes-hint">Hint, kilde eller ekstra info</small>
        </div>

        <div>
          <button
            type="button"
            onClick={handleCancelClick}
            disabled={isSubmitting}
            aria-label="Annuller og gå tilbage"
          >
            Annuller
          </button>
          <button
            type="submit"
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
  );
};

export default JeopardyQuestionForm;
