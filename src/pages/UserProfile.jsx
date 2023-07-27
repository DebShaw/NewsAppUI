import {
  Stack,
  Divider,
  Button,
  TextField,
  Typography,
  Hidden,
} from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../actions/currentUser";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = (temp) => {
    dispatch({ type: "LOGOUT" });
    dispatch(setCurrentUser(null));
    if (temp === "Yes") {
      alert("You Have Been Successfully Logged Out!");
    }
    navigate("/");
  };
  
  return (
    <Stack minHeight="100vh">
      <Navbar />
      <Stack
        width="100%"
        height="87vh"
        direction={{ xs: "column", sm: "column", md: "row" }}
      >
        <Stack
          display={{ xs: "none", sm: "none", md: "block" }}
          width={{ xs: "100%", sm: "100%", md: "20%" }}
          padding="1% 3%"
          alignItems="center"
        >
          <Button
            style={{
              width: "100%",
              textTransform: "capitalize",
              color: "white",
              fontSize: "18px",
            }}
            variant="outlined"
            onClick={() => handleLogout("Yes")}
            startIcon={<PowerSettingsNewIcon />}
          >
            Log out
          </Button>
        </Stack>
        <Hidden only={["xs", "sm"]}>
          <Divider
            orientation="vertical"
            variant="middle"
            height="100%"
            flexItem
            color="white"
          />
        </Hidden>
        <Stack width="80%" spacing={6} padding="2% 6%">
          <Stack>
            <Typography variant="h3" color="white" marginBottom="0.5rem">
              My Profile
            </Typography>
            <Divider
              color="white"
              width={{ xs: "80%", sm: "80%", md: "20%" }}
            />
          </Stack>
          <TextField
            style={{ width: "70%" }}
            value={location.state.name}
            label="Name"
            variant="outlined"
            focused
            InputProps={{ readOnly: true }}
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
          />
          <TextField
            style={{ width: "70%" }}
            value={location.state.email}
            label="Email"
            variant="outlined"
            focused
            InputProps={{ readOnly: true }}
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
          />
          <Stack
            display={{ xs: "block", sm: "block", md: "none" }}
            width={{ xs: "100%", sm: "100%", md: "20%" }}
            padding="1% 3%"
            alignItems="center"
          >
            <Button
              style={{
                width: "fit-content",
                textTransform: "capitalize",
                color: "white",
                fontSize: "18px",
              }}
              variant="outlined"
              onClick={() => handleLogout("Yes")}
              startIcon={<PowerSettingsNewIcon />}
            >
              Log out
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserProfile;
