// src/pages/JeopardyQuestion/JeopardyQuestion.jsx
// Side-wrapper for admin-spørgsmålsformularen
// - Viser DashNav i venstre side
// - Centrerer selve formular-panelet i resten af viewporten

import React from "react";
import { useParams } from "react-router-dom";
import JeopardyQuestionForm from "./JeopardyQuestionForm";
import useFetchQuestion from "./useFetchQuestion";
import DashNav from "../DashNav/DashNav";

// ✅ CSS’en ligger i samme mappe som denne fil
import "./JeopardyQuestion.css";

const JeopardyQuestion = () => {
  const { gameId, categoryId, questionId } = useParams();
  const { question, loading, error } = useFetchQuestion(
    gameId,
    categoryId,
    questionId
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="sectionJeopardy">
      {/* Højre område hvor selve panelet ligger */}
      <DashNav />
      <main className="jq-admin-main">
        {/* Formularen står for indholdet af panelet */}
        <JeopardyQuestionForm
          gameId={gameId}
          categoryId={categoryId}
          questionId={questionId}
          initialData={question}
        />
      </main>
    </section>
  );
};

export default JeopardyQuestion;
