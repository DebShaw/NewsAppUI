import "./App.css";
import "./fonts/helmet-1.0/Helmet-Regular.ttf";
import "./fonts/HelveticaNeue-Light/HelveticaNeue-Light.ttf";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import GeneralNews from "./components/news-page/GeneralNews";
import EntertainmentNews from "./components/news-page/EntertainmentNews";
import SportsNews from "./components/news-page/SportsNews";
import ScienceNews from "./components/news-page/ScienceNews";
import TechnologyNews from "./components/news-page/TechnologyNews";
import HealthNews from "./components/news-page/HealthNews";
import BusinessNews from "./components/news-page/BusinessNews";
import { Stack } from "@mui/material";
import SavedNews from "./pages/SavedNews";
import SearchedPage from "./pages/SearchedPage";
import ContactUs from "./pages/ContactUs";
import UserProfile from "./pages/UserProfile";
import RecentVisits from "./pages/RecentVisits";
import ResetPassword from "./components/auth/ResetPassword";

function App() {
  return (
    <Stack style={{ backgroundColor: "#0c111b" }} className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/general" element={<GeneralNews />} />
          <Route path="/entertainment" element={<EntertainmentNews />} />
          <Route path="/sports" element={<SportsNews />} />
          <Route path="/science" element={<ScienceNews />} />
          <Route path="/technology" element={<TechnologyNews />} />
          <Route path="/health" element={<HealthNews />} />
          <Route path="/business" element={<BusinessNews />} />
          <Route path="/savednews/:id" element={<SavedNews />} />
          <Route path="/search/:id" element={<SearchedPage />}/>
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/search/:id" element={<SearchedPage />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/user/recent/:id" element={<RecentVisits />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </Stack>
  );
}

export default App;
