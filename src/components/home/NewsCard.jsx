import { Stack, Button, Grid, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveNews, visitNews } from "../../actions/news";
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
    <Stack
      sx={{
        backgroundColor: "#f6f6f6",
        borderRadius: "10px",
      }}
      position="relative"
      margin="1rem"
      width={{ xs: "90%", sm: "90%", md: "250px" }}
    >
      <Button
        position="absolute"
        variant="text"
        sx={{ margin: "1rem 0 0 1rem" }}
        style={{ width: "fit-content", border: "2px solid black" }}
        onClick={handleSave}
      >
        <BookmarkBorderIcon
          style={{
            color: "black",
            fontSize: "30px",
            transition: "0.4s",
          }}
        ></BookmarkBorderIcon>
      </Button>
      <Button
        variant="text"
        target="_blank"
        onClick={visit}
        style={{ textTransform: "none", color: "rgba(0,0,0,0.8)" }}
      >
        <Grid height="500px" item>
          <Stack height="140px" justifyContent="center" alignItems="center">
            <Typography fontSize="14px" textAlign="center" margin="5px">
              <b>{props.title}</b>
            </Typography>
          </Stack>
          <img
            src={props.image}
            alt={props.title}
            style={{
              marginLeft: "2.5%",
              marginBottom: "1rem",
              width: "95%",
              height: "150px",
              border: "none",
              borderRadius: "10px",
            }}
          ></img>
          <Stack height="120px" alignItems="top">
            <Typography
              padding="0 0.5rem"
              lineHeight="14px"
              fontSize="12px"
              textAlign="justify"
              margin="5px"
            >
              {props.description}
            </Typography>
          </Stack>
          <Stack height="30px">
            <Typography fontSize="12px" textAlign="left" margin="5px">
              Author: <i style={{ color: "red" }}>{props.author}</i>
            </Typography>
          </Stack>
        </Grid>
      </Button>
    </Stack>
  );
};

export default NewsCard;
