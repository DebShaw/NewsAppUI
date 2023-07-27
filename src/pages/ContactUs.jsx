import { Stack, Typography, Divider, Button } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import { useRef } from "react";
import emailjs from "emailjs-com";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const ContactUs = () => {
  const form = useRef();
  const User = useSelector((state) => state.currentUserReducer);
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      "service_1brlmda",
      "template_z880qw7",
      form.current,
      "BoAtUKQsYJpdTQLul"
    );
    notify();
    e.target.reset();
  };
  const notify = () => {
    toast.success("Message Sent!", {
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
  return (
    <Stack minHeight="100vh">
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
      <Stack
        width="100%"
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={4}
      >
        <Stack
          width={{ xs: "100%", sm: "100%", md: "50%" }}
          padding="5% 10%"
          spacing={8}
        >
          <Stack>
            <Typography color="white" marginBottom="5px" variant="h4">
              CONTACT US
            </Typography>
            <Divider color="white" />
            <Typography color="white" marginTop="0.5rem" variant="body1">
              Feel free to get in touch with us.
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="subtitle1" color="primary">
              EMAIL
            </Typography>
            <Divider color="white" width="15%" />
            <Typography variant="h6" color="white" marginTop="0.5rem">
              group15@email.com
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="subtitle1" color="primary">
              PHONE
            </Typography>
            <Divider color="white" width="15%" />
            <Typography variant="h6" color="white" marginTop="0.5rem">
              +91-9876543210
            </Typography>
          </Stack>
        </Stack>
        <Stack
          padding={{ xs: "5% 2% 5% 10%", sm: "5% 2% 5% 10%", md: "2% 5%" }}
          width={{ xs: "100%", sm: "100%", md: "50%" }}
          spacing={4}
        >
          <Stack>
            <Typography
              width="fit-content"
              variant="h5"
              marginBottom="5px"
              color="white"
            >
              Send Us A Message
            </Typography>
            <Divider color="white" width="80%" />
          </Stack>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
            ref={form}
            onSubmit={sendEmail}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={User?.result?.name}
              required
              style={{
                width: "90%",
                padding: "1.5rem",
                borderRadius: "0.5rem",
                background: "transparent",
                border: "2px solid #1565c0",
                resize: "none",
                color: "white",
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={User?.result?.email}
              style={{
                width: "90%",
                padding: "1.5rem",
                borderRadius: "0.5rem",
                background: "transparent",
                border: "2px solid #1565c0",
                resize: "none",
                color: "white",
              }}
            />
            <textarea
              name="message"
              rows="7"
              placeholder="Your Message"
              required
              style={{
                width: "90%",
                padding: "1.5rem",
                borderRadius: "0.5rem",
                background: "transparent",
                border: "2px solid #1565c0",
                resize: "none",
                color: "white",
              }}
            ></textarea>
            <Button
              type="submit"
              variant="outlined"
              style={{
                width: "fit-content",
                color: "white",
                padding: "10px 20px",
              }}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ContactUs;
