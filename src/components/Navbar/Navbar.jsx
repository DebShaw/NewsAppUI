import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Search } from "../Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";
import logo from "../../assets/news-logo.jpg";
import {
  Stack,
  Menu,
  MenuItem,
  Button,
  Fade,
  Typography,
  Slide,
  Hidden,
} from "@mui/material";
import { IoIosArrowUp } from "react-icons/io";
import axios from "axios";
import NEWS_API_KEY from "../../Key";

function Navbar() {
  // eslint-disable-next-line
  const User = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sourcesAnchor, setSourcesAnchor] = useState(null);
  const sourcesOpen = Boolean(sourcesAnchor);
  const [categoriesAnchor, setCategoriesAnchor] = useState(null);
  const categoriesOpen = Boolean(categoriesAnchor);
  const [mobNav, setMobNav] = useState(false);
  const handleAuth = () => {
    setMobNav(false);
    navigate("/Auth");
  };
  const handleLogout = (temp) => {
    dispatch({ type: "LOGOUT" });
    dispatch(setCurrentUser(null));
    if (temp === "Yes") {
      alert("You Have Been Successfully Logged Out!");
    }
    navigate("/");
  };
  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        alert("You Have Been Logged Out \n Session Timed Out!");
        handleLogout("No");
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    //eslint-disable-next-line
  }, [dispatch]);
  const handleSave = () => {
    if (User === null) {
      alert("Login or Signup to see saved articles!");
      navigate("/Auth");
      return;
    }
    navigate(`/savednews/${User.result._id}`, {
      state: { data: User?.result?.savedNews },
    });
  };
  const handleNav = async (query) => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`
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
      const words = query.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      setCategoriesAnchor(null);
      setSourcesAnchor(null);
      const newQuery = words.join(" ");
      navigate(`/search/${query}`, {
        state: {
          query: newQuery,
          data: slicedData,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const openProfile = () => {
    navigate(`/user/${User?.result?._id}`, {
      state: {
        name: User.result.name,
        email: User.result.email,
        token: User.token,
      },
    });
  };
  const handleRecents = () => {
    if (User === null) {
      alert("Login or Signup to see recently visited articles!");
      navigate("/Auth");
      return;
    }
    navigate(`/user/recent/${User?.result?._id}`);
  };

  return (
    <Stack direction="column">
      <Hidden only={["xs", "sm"]}>
        <Stack
          justifyContent="space-evenly"
          direction="row"
          alignItems="center"
          borderBottom="2px solid rgba(255,255,255,0.7)"
        >
          <Stack padding="0.5rem">
            <Link to="/" style={{ textDecoration: "none" }}>
              <img style={{ width: "160px" }} src={logo} alt="website-logo" />
            </Link>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              style={{
                width: "fit-content",
                textTransform: "none",
                backgroundColor: "transparent",
                fontSize: "14px",
              }}
              variant="contained"
              aria-controls={sourcesOpen ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={sourcesOpen ? "true" : undefined}
              onClick={(e) => setSourcesAnchor(e.currentTarget)}
            >
              Sources
            </Button>
            <Menu
              anchorEl={sourcesAnchor}
              open={sourcesOpen}
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              onClose={() => setSourcesAnchor(null)}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={() => handleNav("google")}>
                Google News
              </MenuItem>
              <MenuItem onClick={() => handleNav("BBC")}>BBC News</MenuItem>
              <MenuItem onClick={() => handleNav("new york times")}>
                New York Times
              </MenuItem>
              <MenuItem onClick={() => handleNav("times of india")}>
                Times of India
              </MenuItem>
              <MenuItem onClick={() => handleNav("NDTV")}>NDTV News</MenuItem>
              <MenuItem onClick={() => handleNav("AajTak")}>AajTak</MenuItem>
            </Menu>
            <Button
              style={{
                width: "fit-content",
                textTransform: "none",
                backgroundColor: "transparent",
                fontSize: "14px",
              }}
              variant="contained"
              aria-controls={categoriesOpen ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={categoriesOpen ? "true" : undefined}
              onClick={(e) => setCategoriesAnchor(e.currentTarget)}
            >
              Categories
            </Button>
            <Menu
              style={{ color: "#0c111b" }}
              anchorEl={categoriesAnchor}
              open={categoriesOpen}
              onClose={() => setCategoriesAnchor(null)}
              TransitionComponent={Fade}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem onClick={() => handleNav("general")}>General</MenuItem>
              <MenuItem onClick={() => handleNav("sports")}>Sports</MenuItem>
              <MenuItem onClick={() => handleNav("entertainment")}>
                Entertainment
              </MenuItem>
              <MenuItem onClick={() => handleNav("technology")}>
                Technology
              </MenuItem>
              <MenuItem onClick={() => handleNav("science")}>Science</MenuItem>
              <MenuItem onClick={() => handleNav("business")}>
                Business
              </MenuItem>
              <MenuItem onClick={() => handleNav("health")}>Health</MenuItem>
            </Menu>
            <Button
              style={{
                width: "fit-content",
                textTransform: "none",
                backgroundColor: "transparent",
                fontSize: "14px",
              }}
              variant="contained"
            >
              <Link
                to="/contact"
                style={{ textDecoration: "none", color: "white" }}
              >
                Contact Us
              </Link>
            </Button>
            <Button
              style={{
                width: "fit-content",
                textTransform: "none",
                backgroundColor: "transparent",
                fontSize: "14px",
              }}
              variant="contained"
              onClick={handleSave}
            >
              Saved Articles
            </Button>
            <Button
              variant="contained"
              style={{
                width: "fit-content",
                textTransform: "none",
                backgroundColor: "transparent",
                fontSize: "14px",
              }}
              onClick={handleRecents}
            >
              Recently Visited
            </Button>
          </Stack>
          <Stack>
            <Search />
          </Stack>
          <Stack>
            {User === null ? (
              <Link
                to="/Auth"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                Log In
              </Link>
            ) : (
              <Stack marginLeft="0.5rem" direction="row" spacing={1}>
                <Stack
                  borderRadius="50%"
                  width="35px"
                  height="35px"
                  backgroundColor="rgba(255,255,255,0.5)"
                >
                  <Typography
                    onClick={openProfile}
                    textAlign="center"
                    fontSize="24px"
                    style={{ cursor: "pointer" }}
                  >
                    {User?.result?.name?.charAt(0).toUpperCase()}
                  </Typography>
                </Stack>
                <Button
                  style={{
                    width: "fit-content",
                    textTransform: "none",
                    backgroundColor: "transparent",
                    fontSize: "18px",
                  }}
                  variant="contained"
                  onClick={() => handleLogout("Yes")}
                >
                  Log out
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <Stack
          padding="1% 3%"
          direction="row"
          alignItems="center"
          justifyContent="space-around"
          borderBottom="2px solid rgba(255,255,255,0.7)"
        >
          ,
          <Stack padding="0.4rem">
            <Link to="/" style={{ textDecoration: "none" }}>
              <img style={{ width: "120px" }} src={logo} alt="website-logo" />
            </Link>
          </Stack>
          <Stack spacing={2} direction="row">
            {User !== null && (
              <Stack
                borderRadius="50%"
                width="35px"
                height="35px"
                backgroundColor="rgba(255,255,255,0.5)"
              >
                <Typography
                  onClick={openProfile}
                  textAlign="center"
                  fontSize="24px"
                  style={{ cursor: "pointer" }}
                >
                  {User?.result?.name?.charAt(0).toUpperCase()}
                </Typography>
              </Stack>
            )}
            <Button
              style={{
                width: "fit-content",
                textTransform: "none",
                backgroundColor: "transparent",
                fontSize: "18px",
              }}
              variant="contained"
              onClick={() => setMobNav(!mobNav)}
            >
              <IoIosArrowUp
                style={{
                  fontSize: "24px",
                  color: "white",
                  transform: mobNav ? "rotate(0deg)" : "rotate(180deg)",
                  transition: "transform 0.4s ease-in-out",
                }}
              ></IoIosArrowUp>
            </Button>
          </Stack>
        </Stack>
        {mobNav && (
          <Slide direction="down" in={mobNav} mountOnEnter unmountOnExit>
            <Stack
              padding="0% 5%"
              justifyContent="left"
              borderBottom="2px solid rgba(255,255,255,0.7)"
            >
              <Stack paddingLeft="5%" margin="1rem 0">
                <Search />
              </Stack>
              <Button
                style={{
                  width: "fit-content",
                  textTransform: "none",
                  backgroundColor: "transparent",
                  fontSize: "18px",
                }}
                variant="contained"
                aria-controls={sourcesOpen ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={sourcesOpen ? "true" : undefined}
                onClick={(e) => setSourcesAnchor(e.currentTarget)}
              >
                Sources
              </Button>
              <Menu
                anchorEl={sourcesAnchor}
                open={sourcesOpen}
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                onClose={() => setSourcesAnchor(null)}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={() => handleNav("google")}>
                  Google News
                </MenuItem>
                <MenuItem onClick={() => handleNav("BBC")}>BBC News</MenuItem>
                <MenuItem onClick={() => handleNav("new york times")}>
                  New York Times
                </MenuItem>
                <MenuItem onClick={() => handleNav("times of india")}>
                  Times of India
                </MenuItem>
                <MenuItem onClick={() => handleNav("NDTV")}>NDTV News</MenuItem>
                <MenuItem onClick={() => handleNav("AajTak")}>AajTak</MenuItem>
              </Menu>
              <Button
                style={{
                  width: "fit-content",
                  textTransform: "none",
                  backgroundColor: "transparent",
                  fontSize: "18px",
                }}
                variant="contained"
                aria-controls={categoriesOpen ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={categoriesOpen ? "true" : undefined}
                onClick={(e) => setCategoriesAnchor(e.currentTarget)}
              >
                Categories
              </Button>
              <Menu
                style={{ color: "#0c111b" }}
                anchorEl={categoriesAnchor}
                open={categoriesOpen}
                onClose={() => setCategoriesAnchor(null)}
                TransitionComponent={Fade}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: "20ch",
                  },
                }}
              >
                <MenuItem onClick={() => handleNav("general")}>
                  General
                </MenuItem>
                <MenuItem onClick={() => handleNav("sports")}>Sports</MenuItem>
                <MenuItem onClick={() => handleNav("entertainment")}>
                  Entertainment
                </MenuItem>
                <MenuItem onClick={() => handleNav("technology")}>
                  Technology
                </MenuItem>
                <MenuItem onClick={() => handleNav("science")}>
                  Science
                </MenuItem>
                <MenuItem onClick={() => handleNav("business")}>
                  Business
                </MenuItem>
                <MenuItem onClick={() => handleNav("health")}>Health</MenuItem>
              </Menu>
              <Button
                style={{
                  width: "fit-content",
                  textTransform: "none",
                  backgroundColor: "transparent",
                  fontSize: "18px",
                }}
                variant="contained"
              >
                <Link
                  to="/contact"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Contact Us
                </Link>
              </Button>
              <Button
                style={{
                  width: "fit-content",
                  textTransform: "none",
                  backgroundColor: "transparent",
                  fontSize: "18px",
                }}
                variant="contained"
                onClick={handleSave}
              >
                Saved Articles
              </Button>
              <Button
                variant="contained"
                style={{
                  width: "fit-content",
                  textTransform: "none",
                  backgroundColor: "transparent",
                  fontSize: "18px",
                }}
                onClick={handleRecents}
              >
                Recently Visited
              </Button>
              <Stack>
                {User === null ? (
                  <Button
                    onClick={handleAuth}
                    style={{
                      width: "fit-content",
                      textTransform: "none",
                      backgroundColor: "transparent",
                      fontSize: "18px",
                    }}
                    variant="contained"
                  >
                    Log In
                  </Button>
                ) : (
                  <Button
                    style={{
                      width: "fit-content",
                      textTransform: "none",
                      backgroundColor: "transparent",
                      fontSize: "18px",
                    }}
                    variant="contained"
                    onClick={() => handleLogout("Yes")}
                  >
                    Log out
                  </Button>
                )}
              </Stack>
            </Stack>
          </Slide>
        )}
      </Hidden>
    </Stack>
  );
}

export default Navbar;
