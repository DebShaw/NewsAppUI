import { Stack, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NEWS_API_KEY from "../../Key";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsCard from "../cards/NewsCard";
import CircleLoader from "react-spinners/ClipLoader";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useDispatch } from "react-redux";
import { saveKeyword, visitNews, saveNews } from "../../actions/news";
import { setCurrentUser } from "../../actions/currentUser";

const Home = () => {
  const [displayToast, setDisplayToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const color = "#ffffff";
  const User = JSON.parse(localStorage.getItem("Profile"));
  console.log(User);
  const dispatch = useDispatch();

  const alanKey =
    "68b7bd471db3d3990e794d8ce4c652cf2e956eca572e1d8b807a3e2338fdd0dc/stage";
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, query }) => {
        if (command === "newHeadlines") {
          if (articles?.length !== 0) {
            handleNav(query, articles);
          } else {
            navigate(-1);
          }
        } else if (command === "open") {
          const article = articles[query - 1];
          if (User !== null) {
            dispatch(
              visitNews({
                userId: User.result._id,
                newsUrl: article.url,
                newsImage: article.urlToImage,
                newsTitle: article.title,
                newsDescription: article.description,
              })
            );
          }
          window.open(article.url);
        } else if (command === "recents") {
          if (User === null) {
            alert("Login or Signup to see recently visited articles!");
            navigate("/Auth");
            return;
          }
          navigate(`/user/recent/${User?.result?._id}`);
        } else if (command === "saved") {
          if (User === null) {
            alert("Login or Signup to see saved articles!");
            navigate("/Auth");
            return;
          }
          navigate(`/savednews/${User.result._id}`);
        } else if (command === "logout") {
          if (User === null) {
            alert("You haven't logged in yet");
            return;
          }
          dispatch({ type: "LOGOUT" });
          dispatch(setCurrentUser(null));
          alert("You Have Been Successfully Logged Out!");
          navigate("/");
        } else if (command === "login") {
          if (User !== null) {
            alert("You are already logged in!");
            return;
          }
          navigate("/Auth");
        } else if (command === "contact") {
          navigate("/contact");
        } else if (command === "save") {
          const article = articles[query - 1];
          if (User === null) {
            alert("Login or Signup before saving any news!");
            navigate("/Auth");
          } else {
            dispatch(
              saveNews({
                userId: User.result._id,
                newsUrl: article.url,
                newsImage: article.urlToImage,
                newsTitle: article.title,
                newsDescription: article.description,
              })
            );
          }
        }
      }
    })
  });
  const handleNav = (query, articles) => {
    const slicedData = [];
    if (articles !== null) {
      // eslint-disable-next-line
      articles?.map((e) => {
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
    if (User !== null) {
      dispatch(saveKeyword({ userId: User.result._id, keyword: query }));
    }
    const words = query.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    const newQuery = words.join(" ");
    navigate(`/search/${query}`, {
      state: {
        query: newQuery,
        data: slicedData,
      },
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    fetchGeneral();
    fetchEntertainment();
    fetchSports();
    fetchTechnology();
    fetchScience();
    fetchHealth();
    fetchBusiness();

    // eslint-disable-next-line
  }, []);
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
  const [general, setGeneral] = useState([]);
  const slicedGeneral = [];
  // eslint-disable-next-line
  general.map((g) => {
    if (
      g.author !== null &&
      g.urlToImage !== null &&
      g.title !== null &&
      g.description !== null &&
      g.content !== null &&
      g.publishedAt !== null &&
      g.url !== null &&
      g.source !== null
    ) {
      slicedGeneral.push(g);
    }
  });
  const fetchGeneral = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=general&apiKey=${NEWS_API_KEY}`
      );
      setGeneral(res.data.articles);
      // setGeneralLoad(false);
      // handleLoader();
    } catch (err) {
      console.log(err.message);
    }
  };

  const [entertainment, setEntertainment] = useState([]);
  const slicedEntertainment = [];
  // eslint-disable-next-line
  entertainment.map((e) => {
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
      slicedEntertainment.push(e);
    }
  });
  const fetchEntertainment = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=entertainment&apiKey=${NEWS_API_KEY}`
      );
      setEntertainment(res.data.articles);
      // setEntertainmentLoad(false);
      // handleLoader();
    } catch (err) {
      console.log(err.message);
    }
  };

  const [sports, setSports] = useState([]);
  const slicedSports = [];
  // eslint-disable-next-line
  sports.map((e) => {
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
      slicedSports.push(e);
    }
  });
  const fetchSports = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=sports&apiKey=${NEWS_API_KEY}`
      );
      setSports(res.data.articles);
      // setSportsLoad(false);
      // handleLoader();
    } catch (err) {
      console.log(err.message);
    }
  };

  const [technology, setTechnology] = useState([]);
  const slicedTechnology = [];
  // eslint-disable-next-line
  technology.map((e) => {
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
      slicedTechnology.push(e);
    }
  });
  const fetchTechnology = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=technology&apiKey=${NEWS_API_KEY}`
      );
      setTechnology(res.data.articles);
      // setTechnologyLoad(false);
      // handleLoader();
    } catch (err) {
      console.log(err.message);
    }
  };

  const [science, setScience] = useState([]);
  const slicedScience = [];
  // eslint-disable-next-line
  science.map((e) => {
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
      slicedScience.push(e);
    }
  });
  const fetchScience = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=science&apiKey=${NEWS_API_KEY}`
      );
      setScience(res.data.articles);
      // setScienceLoad(false);
      // handleLoader();
    } catch (err) {
      console.log(err.message);
    }
  };

  const [health, setHealth] = useState([]);
  const slicedHealth = [];
  // eslint-disable-next-line
  health.map((e) => {
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
      slicedHealth.push(e);
    }
  });
  const fetchHealth = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=health&apiKey=${NEWS_API_KEY}`
      );
      setHealth(res.data.articles);
      // setHealthLoad(false);
      // handleLoader();
    } catch (err) {
      console.log(err.message);
    }
  };

  const [business, setBusiness] = useState([]);
  const slicedBusiness = [];
  // eslint-disable-next-line
  business.map((e) => {
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
      slicedBusiness.push(e);
    }
  });

  const fetchBusiness = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=business&apiKey=${NEWS_API_KEY}`
      );
      setBusiness(res.data.articles);
      // setBusinessLoad(false);
      // handleLoader();
    } catch (err) {
      console.log(err.message);
    }
  };

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 8000,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 650,
        settings: {
          dots: false,
          speed: 2000,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
    ],
  };

  const navigate = useNavigate();

  const handleGeneral = (data) => {
    navigate("/general", {
      state: { data: data },
    });
  };

  const handleEntertainment = (data) => {
    navigate("/entertainment", {
      state: { data: data },
    });
  };

  const handleSports = (data) => {
    navigate("/sports", {
      state: { data: data },
    });
  };

  const handleTechnology = (data) => {
    navigate("/technology", {
      state: { data: data },
    });
  };

  const handleScience = (data) => {
    navigate("/science", {
      state: { data: data },
    });
  };

  const handleHealth = (data) => {
    navigate("/health", {
      state: { data: data },
    });
  };

  const handleBusiness = (data) => {
    navigate("/business", {
      state: { data: data },
    });
  };

  return (
    <Stack minHeight="100vh" style={{ backgroundColor: "#0c111b" }}>
      <Navbar />
      {isLoading && (
        <div
          style={{
            display: "flex",
            height: "80vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircleLoader
            color={color}
            loading={isLoading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {!isLoading && (
        <div>
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
          <Stack margin="2rem 0" direction="column">
            <Stack
              margin={{ xs: "0 auto", sm: "0 auto", md: "0" }}
              width={{ xs: "90%", sm: "90%", md: "100%" }}
              spacing={2}
            >
              <Button
                onClick={() => handleGeneral(slicedGeneral)}
                style={{
                  width: "fit-content",
                  justifyContent: "left",
                  textTransform: "capitalize",
                  fontSize: "24px",
                  marginLeft: "4rem",
                }}
              >
                General News
              </Button>
              <Stack>
                <Slider
                  style={{ width: "90%", margin: "0 auto 1rem" }}
                  {...settings}
                >
                  {slicedGeneral.map((g, index) => (
                    <NewsCard
                      author={g.author}
                      description={g.description}
                      sources={g.source}
                      image={g.urlToImage}
                      url={g.url}
                      title={g.title}
                      date={g.publishedAt}
                      content={g.content}
                      key={index}
                      setDisplayToast={setDisplayToast}
                    ></NewsCard>
                  ))}
                </Slider>
              </Stack>
            </Stack>
            <Stack
              margin={{ xs: "0 auto", sm: "0 auto", md: "0" }}
              width={{ xs: "90%", sm: "90%", md: "100%" }}
              spacing={2}
            >
              <Button
                onClick={() => handleEntertainment(slicedEntertainment)}
                style={{
                  width: "fit-content",
                  justifyContent: "left",
                  textTransform: "capitalize",
                  fontSize: "24px",
                  marginLeft: "4rem",
                }}
              >
                Entertainment
              </Button>
              <Stack>
                <Slider
                  style={{ width: "90%", margin: "0 auto 1rem" }}
                  {...settings}
                >
                  {slicedEntertainment.map((g, index) => (
                    <NewsCard
                      author={g.author}
                      description={g.description}
                      sources={g.source}
                      image={g.urlToImage}
                      url={g.url}
                      title={g.title}
                      date={g.publishedAt}
                      content={g.content}
                      key={index}
                      setDisplayToast={setDisplayToast}
                    ></NewsCard>
                  ))}
                </Slider>
              </Stack>
            </Stack>
            <Stack
              margin={{ xs: "0 auto", sm: "0 auto", md: "0" }}
              width={{ xs: "90%", sm: "90%", md: "100%" }}
              spacing={2}
            >
              <Button
                onClick={() => handleSports(slicedSports)}
                style={{
                  width: "fit-content",
                  justifyContent: "left",
                  textTransform: "capitalize",
                  fontSize: "24px",
                  marginLeft: "4rem",
                }}
              >
                Sports
              </Button>
              <Stack>
                <Slider
                  style={{ width: "90%", margin: "0 auto 1rem" }}
                  {...settings}
                >
                  {slicedSports.map((g, index) => (
                    <NewsCard
                      author={g.author}
                      description={g.description}
                      sources={g.source}
                      image={g.urlToImage}
                      url={g.url}
                      title={g.title}
                      date={g.publishedAt}
                      content={g.content}
                      key={index}
                      setDisplayToast={setDisplayToast}
                    ></NewsCard>
                  ))}
                </Slider>
              </Stack>
            </Stack>
            <Stack
              margin={{ xs: "0 auto", sm: "0 auto", md: "0" }}
              width={{ xs: "90%", sm: "90%", md: "100%" }}
              spacing={2}
            >
              <Button
                onClick={() => handleTechnology(slicedTechnology)}
                style={{
                  width: "fit-content",
                  justifyContent: "left",
                  textTransform: "capitalize",
                  fontSize: "24px",
                  marginLeft: "4rem",
                }}
              >
                Technology
              </Button>
              <Stack>
                <Slider
                  style={{ width: "90%", margin: "0 auto 1rem" }}
                  {...settings}
                >
                  {slicedTechnology.map((g, index) => (
                    <NewsCard
                      author={g.author}
                      description={g.description}
                      sources={g.source}
                      image={g.urlToImage}
                      url={g.url}
                      title={g.title}
                      date={g.publishedAt}
                      content={g.content}
                      key={index}
                      setDisplayToast={setDisplayToast}
                    ></NewsCard>
                  ))}
                </Slider>
              </Stack>
            </Stack>
            <Stack
              margin={{ xs: "0 auto", sm: "0 auto", md: "0" }}
              width={{ xs: "90%", sm: "90%", md: "100%" }}
              spacing={2}
            >
              <Button
                onClick={() => handleScience(slicedScience)}
                style={{
                  width: "fit-content",
                  justifyContent: "left",
                  textTransform: "capitalize",
                  fontSize: "24px",
                  marginLeft: "4rem",
                }}
              >
                Science
              </Button>
              <Stack>
                <Slider
                  style={{ width: "90%", margin: "0 auto 1rem" }}
                  {...settings}
                >
                  {slicedScience.map((g, index) => (
                    <NewsCard
                      author={g.author}
                      description={g.description}
                      sources={g.source}
                      image={g.urlToImage}
                      url={g.url}
                      title={g.title}
                      date={g.publishedAt}
                      content={g.content}
                      key={index}
                      setDisplayToast={setDisplayToast}
                    ></NewsCard>
                  ))}
                </Slider>
              </Stack>
            </Stack>
            <Stack
              margin={{ xs: "0 auto", sm: "0 auto", md: "0" }}
              width={{ xs: "90%", sm: "90%", md: "100%" }}
              spacing={2}
            >
              <Button
                onClick={() => handleHealth(slicedHealth)}
                style={{
                  width: "fit-content",
                  justifyContent: "left",
                  textTransform: "capitalize",
                  fontSize: "24px",
                  marginLeft: "4rem",
                }}
              >
                Health
              </Button>
              <Stack>
                <Slider
                  style={{ width: "90%", margin: "0 auto 1rem" }}
                  {...settings}
                >
                  {slicedHealth.map((g, index) => (
                    <NewsCard
                      author={g.author}
                      description={g.description}
                      sources={g.source}
                      image={g.urlToImage}
                      url={g.url}
                      title={g.title}
                      date={g.publishedAt}
                      content={g.content}
                      key={index}
                      setDisplayToast={setDisplayToast}
                    ></NewsCard>
                  ))}
                </Slider>
              </Stack>
            </Stack>
            <Stack
              margin={{ xs: "0 auto", sm: "0 auto", md: "0" }}
              width={{ xs: "90%", sm: "90%", md: "100%" }}
              spacing={2}
            >
              <Button
                onClick={() => handleBusiness(slicedBusiness)}
                style={{
                  width: "fit-content",
                  justifyContent: "left",
                  textTransform: "capitalize",
                  fontSize: "24px",
                  marginLeft: "4rem",
                }}
              >
                Business
              </Button>
              <Stack>
                <Slider
                  style={{ width: "90%", margin: "0 auto 1rem" }}
                  {...settings}
                >
                  {slicedBusiness.map((g, index) => (
                    <NewsCard
                      author={g.author}
                      description={g.description}
                      sources={g.source}
                      image={g.urlToImage}
                      url={g.url}
                      title={g.title}
                      date={g.publishedAt}
                      content={g.content}
                      key={index}
                      setDisplayToast={setDisplayToast}
                    ></NewsCard>
                  ))}
                </Slider>
              </Stack>
            </Stack>
          </Stack>
        </div>
      )}
    </Stack>
  );
};

export default Home;
