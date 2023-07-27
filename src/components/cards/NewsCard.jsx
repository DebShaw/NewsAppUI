import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveNews, visitNews } from "../../actions/news";
import "./NewsCard.css";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const NewsCard = (props) => {
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSave = () => {
    if (User === null) {
      alert("Login or Signup before saving any news...");
      navigate("/Auth");
    } else {
      dispatch(
        saveNews({
          userId: User.result._id,
          newsUrl: props.url,
          newsImage: props.image,
          newsTitle: props.title,
          newsDescription: props.description,
        })
      );
      props.setDisplayToast(true);
    }
  };
  const visit = () => {
    if (User !== null) {
      dispatch(
        visitNews({
          userId: User.result._id,
          newsUrl: props.url,
          newsImage: props.image,
          newsTitle: props.title,
          newsDescription: props.description,
        })
      );
    }
    window.open(props.url);
  };
  return (
    <div>
      <div className="save-btn-div">
        <button onClick={handleSave} className="save-btn">
          <BookmarkBorderIcon
            style={{
              color: "white",
              fontSize: "30px",
              transition: "0.4s",
            }}
          ></BookmarkBorderIcon>
        </button>
      </div>
      <button onClick={visit} className="doctor-container">
        <div className="doctor-card">
          <img src={props.image} alt="news-card-cap" />
          <div className="doctor-intro">
            <div>
              <h1>{props.title}</h1>
            </div>
            <p>{props.description}</p>
          </div>
        </div>
      </button>
    </div>
  );
};
export default NewsCard;
