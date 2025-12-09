import React from "react";
import DashNav from "../DashNav/DashNav";
import JeopardyQuestionForm from "../JeopardyQuestion/JeopardyQuestionForm";

const JeopardyQuestion = () => {
  return (
    <section className={`sectionAdmin`}>
      <DashNav />
      <div className={`admin-container`}>
        <div className="">
          <JeopardyQuestionForm />
        </div>
      </div>
    </section>
  );
};

export default JeopardyQuestion;
