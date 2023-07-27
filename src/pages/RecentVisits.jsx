import { Stack, Slide, Typography, Alert, Grid } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecentVisits } from "../actions/news";
import { visitNews, removeNews } from "../actions/news";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecentVisits = () => {
  const recents = useSelector((state) => state.visitedReducer);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchRecents();
    //eslint-disable-next-line
  }, []);
  const fetchRecents = () => {
    dispatch(fetchRecentVisits(id));
    setLoading(false);
  };
  const notify = () => {
    toast.success("News Removed!", {
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
  }
  const removeVisit = (newsId) => {
    dispatch(removeNews({ userId: id, newsId }));
    notify();
  }
  return (
    <Stack minHeight="100vh" marginBottom="1.5rem">
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
      <Stack>
        {loading && (
          <Slide direction="down" in={loading}>
            <Stack>
              <RotateLeftIcon
                sx={{
                  fontSize: "3rem",
                  margin: "0 auto",
                  color: "white",
                  animation: "spin 2s linear infinite",
                  "@keyframes spin": {
                    "0%": {
                      transform: "rotate(360deg)",
                    },
                    "100%": {
                      transform: "rotate(0deg)",
                    },
                  },
                }}
              />
            </Stack>
          </Slide>
        )}
        {!loading && (
          <Stack>
            <Stack>
              <Stack margin="2rem 0" width="100%">
                <Typography variant="h4" color="primary" textAlign="center">
                  Recently Visited Articles
                </Typography>
              </Stack>
              {(recents?.length === 0 || recents === null) && (
                <Stack margin="0 auto" width="60%">
                  <Alert severity="error">No Articles Visited Yet!</Alert>
                </Stack>
              )}
            </Stack>
            <Stack justifyContent="center">
              {recents !== null && recents?.length !== 0 && (
                <Grid
                  justifyContent="center"
                  spacing={4}
                  padding="2% 5%"
                  container
                >
                  {recents
                    ?.slice(0)
                    ?.reverse()
                    ?.map((g) => (
                      <Grid item key={g._id}>
                        <Typography
                          variant="body1"
                          margin="0.5rem"
                          color="white"
                        >
                          Visited {moment(g.visitedOn).fromNow()}
                        </Typography>
                        <div className="save-btn-div">
                          <button
                            className="save-btn"
                            onClick={() => removeVisit(g._id)}
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
                        <button
                          onClick={() => visit(g)}
                          className="doctor-container"
                        >
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
        )}
      </Stack>
    </Stack>
  );
};

export default RecentVisits;
