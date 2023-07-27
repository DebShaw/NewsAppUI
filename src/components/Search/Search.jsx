import { useEffect, useState } from "react";
import { Stack, TextField, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import NEWS_API_KEY from "../../Key";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveKeyword, fetchKeywords } from "../../actions/news";
import moment from "moment";

export const Search = () => {
  const User = useSelector((state) => state.currentUserReducer);
  const searches = useSelector((state) => state.keywordReducer);
  const [anchor, setAnchor] = useState(false);
  useEffect(() => {
    if (User !== null) {
      dispatch(fetchKeywords(User.result._id));
    }
    // eslint-disable-next-line
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const clearBtn = () => {
    // setData([]);
    setText("");
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=${text}&apiKey=${NEWS_API_KEY}`
      );
      const slicedData = [];
      if (res !== null) {
        // eslint-disable-next-line
        res.data.articles?.map((e) => {
          if (
            e.author !== null &&
            e.urlToImage !== null &&
            e.title !== null &&
            e.description !== null &&
            e.content !== null &&
            e.publishedAt !== null &&
            e.url !== null &&
            e.source !== null
          ) {
            slicedData.push(e);
          }
        });
      }
      if (slicedData.length === 0) {
        alert("Invalid Search Keyword");
        setText("");
        setAnchor(false);
        navigate("/");
        return;
      }
      if (User !== null) {
        dispatch(saveKeyword({ userId: User.result._id, keyword: text }));
      }
      const words = text.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      const newQuery = words.join(" ");
      navigate(`/search/${text}`, {
        state: {
          query: newQuery,
          data: slicedData,
        },
      });
    } catch (err) {
      alert("Invalid Search Keyword");
      navigate("/");
    }
    setText("");
    setAnchor(false);
  };
  return (
    <Stack position="relative">
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          label="Enter the keywords to search for"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onClick={() => setAnchor(true)}
          onKeyPress={handleEnter}
          focused
          variant="standard"
          sx={{
            "& .MuiInputBase-root": {
              color: "white",
            },
            "& .MuiFormLabel-root": {
              color: "white",
            },
            "& .MuiFormLabel-root.Mui-focused": {
              color: "white",
            },
          }}
        ></TextField>
        <SearchIcon
          onClick={handleSearch}
          style={{ color: "white", cursor: "pointer" }}
        />
        {text !== "" && (
          <CloseIcon
            onClick={clearBtn}
            style={{ color: "white", cursor: "pointer" }}
          />
        )}
      </Stack>
      {anchor && (
        <Stack
          sx={{ backgroundColor: "black" }}
          style={{ zIndex: "10" }}
          position="absolute"
          marginTop="4rem"
        >
          {User !== null && (
            <Stack sx={{ width: "100%" }} justifyContent="right">
              <CloseIcon
                onClick={() => setAnchor(false)}
                color="primary"
                style={{ cursor: "pointer" }}
              />
            </Stack>
          )}
          <Stack maxHeight="200px" overflow="auto">
            {searches
              ?.slice(0)
              ?.reverse()
              ?.map((search) => (
                <Button
                  style={{
                    width: "max-content",
                    textTransform: "capitalize",
                  }}
                  onClick={() => setText(search.keyword)}
                  key={search._id}
                >
                  <Typography color="white" variant="body1" marginRight="1rem">
                    {search.keyword}
                  </Typography>
                  <Typography variant="caption">
                    {moment(search.savedOn).fromNow()}
                  </Typography>
                </Button>
              ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
