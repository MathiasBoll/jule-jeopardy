import { useState } from "react";
import { useGame } from "../../context/GameContext";
import s from "./Modal.module.css";

const Modal = () => {
  const { selectedQuestion, setSelectedQuestion, markQuestionAsAnswered } =
    useGame();
  const [showAnswer, setShowAnswer] = useState(false);

  if (!selectedQuestion) return null;

  const handleClose = () => {
    markQuestionAsAnswered(selectedQuestion._id);
    setSelectedQuestion(null);
    setShowAnswer(false);
  };

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
