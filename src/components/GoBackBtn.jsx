import { Link } from "react-router-dom";
import '../styles/GoBackBtn.scss';

const GoBackBtn = () => {
  return (
    <div className="goBackBtn">
      <Link to='/'><i className="fa-solid fa-chevron-left"></i></Link>
      <span className="label">Go Back</span>
    </div>
  );
};

export default GoBackBtn;
