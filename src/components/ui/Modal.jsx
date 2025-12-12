import { useState } from "react";
import { useGame } from "../../context/GameContext";
import s from "./Modal.module.css";

// Modal der viser spørgsmål og svar når et spørgsmål vælges
const Modal = () => {
  const { selectedQuestion, setSelectedQuestion, markQuestionAsAnswered } =
    useGame();
  // State til at vise/skjule svaret
  const [showAnswer, setShowAnswer] = useState(false);

  // Viser ikke modal hvis intet spørgsmål er valgt
  if (!selectedQuestion) return null;

  // Lukker modal og markerer spørgsmålet som besvaret
  const handleClose = () => {
    markQuestionAsAnswered(selectedQuestion._id);
    setSelectedQuestion(null);
    setShowAnswer(false);
  };

  // Viser svaret
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  return (
    <div className={s.overlay} onClick={handleClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.points}>{selectedQuestion.value} Points</div>
        <div className={s.question}>{selectedQuestion.question}</div>

        {showAnswer ? (
          <div className={s.answer}>
            <strong>Answer:</strong> {selectedQuestion.answer}
          </div>
        ) : (
          <button
            onClick={handleShowAnswer}
            className={`${s.button} ${s.showAnswerButton}`}
          >
            Show Answer
          </button>
        )}

        <button
          onClick={handleClose}
          className={`${s.button} ${s.closeButton}`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
