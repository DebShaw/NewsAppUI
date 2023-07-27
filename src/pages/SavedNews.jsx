import { useParams } from "react-router-dom";
import { Stack, Grid, Typography, Alert } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { deleteNews, fetchSavedNews, visitNews } from "../actions/news";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const SavedNews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSavedNews(id));
    // eslint-disable-next-line
  }, []);
  const User = useSelector((state) => state.newsReducer);
  const handleDelete = (newsId) => {
    dispatch(deleteNews({ userId: id, newsId }));
    notify();
  };
  const notify = () => {
    toast.success("News Deleted!", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const visit = (news) => {
    dispatch(
      visitNews({
        userId: id,
        newsUrl: news.newsUrl,
        newsImage: news.newsImage,
        newsTitle: news.newsTitle,
        newsDescription: news.newsDescription,
      })
    );
    window.open(news.newsUrl);
  };
  return (
    <Stack minHeight="100vh" marginBottom="2rem">
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Stack margin="2rem 0" width="100%">
        <Typography variant="h4" color="primary" textAlign="center">
          Saved Articles
        </Typography>
      </Stack>
      {(User?.length === 0 || User === null) && (
        <Stack margin="0 auto" width="60%">
          <Alert severity="error">No Articles Saved Yet!</Alert>
        </Stack>
      )}
      <Stack justifyContent="center">
        {User !== null && User?.length !== 0 && (
          <Grid justifyContent="center" spacing={4} padding="2% 5%" container>
            {User?.slice(0)
              ?.reverse()
              ?.map((g) => (
                <Grid item key={g._id}>
                  <Typography variant="body1" margin="0.5rem" color="white">
                    Saved {moment(g.savedOn).fromNow()}
                  </Typography>
                  <div className="save-btn-div">
                    <button
                      onClick={() => handleDelete(g._id)}
                      className="save-btn"
                    >
                      <DeleteIcon
                        style={{
                          color: "white",
                          fontSize: "36px",
                          transition: "0.4s",
                        }}
                      ></DeleteIcon>
                    </button>
                  </div>
                  <button onClick={() => visit(g)} className="doctor-container">
                    <div className="doctor-card">
                      <img src={g.newsImage} alt="news-card-cap" />
                      <div className="doctor-intro">
                        <div>
                          <h1>{g.newsTitle}</h1>
                        </div>
                        <p>{g.newsDescription}</p>
                      </div>
                    </div>
                  </button>
                </Grid>
              ))}
          </Grid>
        )}
      </Stack>
    </Stack>
  );
};

export default SavedNews;
