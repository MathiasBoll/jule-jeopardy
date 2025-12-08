import React from "react";
import DashNav from "../DashNav/DashNav";
import s from "./JeopardyQuestion.module.css";
import JeopardyQuestionForm from "./JeopardyQuestionForm";

const JeopardyQuestion = () => {
  return (
    <section className={`sectionAdmin`}>
      <DashNav />
      <div className={`container`}>
        <h2 className={s.qTitle}>Jeopardy Question</h2>
        <div className="">
          <JeopardyQuestionForm />
        </div>
      </div>
    </section>
  );
};

export default JeopardyQuestion;
