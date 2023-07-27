import { Stack, Typography, Grid } from "@mui/material";
import NewsCard from "../components/home/NewsCard";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchedPage = () => {
  const location = useLocation();
  const [displayToast, setDisplayToast] = useState(false);
  const notify = () => {
    toast.success("News Saved!", {
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
  if (displayToast) {
    notify();
  }
  return (
    <Stack spacing={2}>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Grid justifyContent="center" padding="2% 0" container>
        <Stack marginBottom="2rem" width="100%">
          <Typography variant="h4" color="primary" textAlign="center">
            {location.state.query} News
          </Typography>
        </Stack>
        {location.state.data.map((g,index) => (
          <Grid justifyContent="center" key={index} item>
            <NewsCard
              author={g.author}
              description={g.description}
              sources={g.source}
              image={g.urlToImage}
              url={g.url}
              title={g.title}
              date={g.publishedAt}
              content={g.content}
              setDisplayToast={setDisplayToast}
            ></NewsCard>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default SearchedPage;
