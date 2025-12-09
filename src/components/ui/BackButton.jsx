import { useNavigate } from "react-router-dom";
import "./BackButton.css";

const BackButton = ({ to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button className="jeopardy-back-button" onClick={handleClick}>
      <div className="back-arrow">‹</div>
      <div className="back-text">
        <span>B</span>
        <span>A</span>
        <span>C</span>
        <span>K</span>
      </div>
    </button>
  );
};

export default BackButton;
