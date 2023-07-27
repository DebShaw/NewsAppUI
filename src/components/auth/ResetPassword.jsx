import { Stack, TextField, Button, Typography } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../actions/auth";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!location.search) {
    alert("Token Absent!");
    navigate("/");
  }
  const handleReset = () => {
    if (!password) {
      alert("Enter New Password!");
    } else if (password.length < 8) {
      alert("Passwords must contain at least eight characters.");
    } else if (
      password.search(/[0-9]/) === -1 &&
      (password.search(/[a-z]/) === -1 || password.search(/[A-Z]/) === -1)
    ) {
      alert("Password must contain at least 1 digit & at least 1 letter");
    } else if (!confirmPassword) {
      alert("Enter Confirm New Password");
    } else if (confirmPassword !== password) {
      alert("Password and Confirmed does not match");
    }
    dispatch(
      resetPassword({ password, token: location.search.substring(7) }, navigate)
    );
  };
  return (
    <Stack minHeight="100vh">
      <Navbar />
      <Stack
        padding="5%"
        spacing={6}
        width="fit-content"
        direction="column"
        margin="0 auto"
      >
        <Typography variant="h4" color="white">
          Reset Your Password
        </Typography>
        <TextField
          style={{ width: "100%" }}
          value={password}
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          label="New Password"
          variant="outlined"
          focused
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
          style={{ width: "100%" }}
          value={confirmPassword}
          required
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm New Password"
          variant="outlined"
          focused
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
        <Stack>
          <Button
            variant="outlined"
            style={{
              width: "fit-content",
              color: "white",
              padding: "10px 20px",
            }}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ResetPassword;
