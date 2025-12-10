// src/pages/JeopardyQuestion/JeopardyQuestion.jsx
// Side-wrapper for admin-spørgsmålsformularen
// - Viser DashNav i venstre side
// - Centrerer selve formular-panelet i resten af viewporten

import React from "react";
import DashNav from "../DashNav/DashNav";
import JeopardyQuestionForm from "./JeopardyQuestionForm";

// ✅ CSS’en ligger i samme mappe som denne fil
import "./JeopardyQuestion.css";

const JeopardyQuestion = () => {
  return (
    <section className="sectionAdmin">
      {/* Venstre admin-navigation */}
      <DashNav />

      {/* Højre område hvor selve panelet ligger */}
      <main className="jq-admin-main">
        {/* Formularen står for indholdet af panelet */}
        <JeopardyQuestionForm />
      </main>
    </section>
  );
};

export default JeopardyQuestion;
