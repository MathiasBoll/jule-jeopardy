import { useParams } from "react-router-dom";
import heroImg from "../../assets/img/hero_img.png";
import BackButton from "../../components/ui/BackButton";
import QuestionForm from "./QuestionForm";
import useFetchQuestion from "./useFetchQuestion";

import "./AdminQuestionEdit.css";

const AdminQuestionEdit = () => {
  const { gameId, categoryId, questionId } = useParams();
  const { question, gameName, categoryName, loading, error } = useFetchQuestion(
    gameId,
    categoryId,
    questionId
  );

  if (loading) {
    return (
      <div className="aqe-page-container">
        <img src={heroImg} alt="" className="aqe-hero-background" />
        <p className="aqe-loading-text">Indlæser...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="aqe-page-container">
        <img src={heroImg} alt="" className="aqe-hero-background" />
        <p className="aqe-error-text">Fejl: {error}</p>
      </div>
    );
  }

  return (
    <div className="aqe-page-container">
      <img src={heroImg} alt="" className="aqe-hero-background" />
      <BackButton to={`/admin/questions/${gameId}/${categoryId}`} />

      <main className="aqe-admin-main">
        <QuestionForm
          gameId={gameId}
          categoryId={categoryId}
          questionId={questionId}
          initialData={question}
          gameName={gameName}
          categoryName={categoryName}
        />
      </main>
    </div>
  );
};

export default AdminQuestionEdit;
