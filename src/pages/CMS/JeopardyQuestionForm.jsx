import { useState } from "react";

const JeopardyQuestionForm = () => {
  const [formData, setFormData] = useState({
    pointValue: "100",
    question: "",
    answer: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Kunne ikke gemme spørgsmålet");

      // Reset form efter succesfuld indsendelse
      setFormData({
        pointValue: "100",
        question: "",
        answer: "",
        notes: "",
      });

      alert("Spørgsmål gemt!");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      pointValue: "100",
      question: "",
      answer: "",
      notes: "",
    });
  };

  return (
    <div>
      <h2>Edit Jeopardy Question Form</h2>

      <form onSubmit={handleSubmit}>
        <div>Admin / Spil / Jule Jeopardy / Kategori: Julemad / Spørgsmål</div>

        <div>Rediger spørgsmål – Julemad / {formData.pointValue} point</div>

        {error && <div>{error}</div>}

        <div>
          <label htmlFor="pointValue">Pointværdi</label>
          <select
            id="pointValue"
            name="pointValue"
            value={formData.pointValue}
            onChange={handleChange}
            required
          >
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
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
          />
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
          />
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
          />
        </div>

        <div>
          <button type="button" onClick={handleCancel} disabled={isSubmitting}>
            Annuller
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Gemmer..." : "Gem ændringer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JeopardyQuestionForm;
