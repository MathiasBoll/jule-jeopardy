import s from "./DashBoard.module.css";
import JeopardyQuestionForm from "./JeopardyQuestionForm";

const GamesDashboard = () => {
  return (
    <section>
      <div className={s.container}>
        <h2 className={s.dashTitle}>Games Dashboard</h2>
        <JeopardyQuestionForm />
      </div>
    </section>
  );
};

export default GamesDashboard;
