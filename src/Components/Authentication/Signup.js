import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Cryptostate } from "../../BlockContext";
import "./Sign.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase";
const Signup = ({ handleClose }) => {
  //3 states will be there
  const { setAlert } = Cryptostate();
  const [signupdisable, setSignupDisable] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value }); //[name]->dynamic data
  };
  const postData = async (e) => {
    // const { name, email, password, confirmPassword } = user;
    if (!user.email || !user.password || !user.name) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setAlert({
        open: true,
        message: "Password do not match",
        type: "error",
      });
      return;
    }
    try {
      setSignupDisable(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      ).then((res) => {
        setSignupDisable(false);
        const user1 = res.user;
        updateProfile(user, {
          displayName: user.name,
        });
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${user.name}`,
          type: "success",
        });
        handleClose();
      });
    } catch (error) {
      setSignupDisable(false);
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };
  console.log(user.displayName);

  return (
    // Box is similar to div it just have some extra functionalities like padding etc.

    <Box p={3} className="mainbox">
      <TextField
        variant="outlined"
        type="text"
        name="name"
        label="Enter your name"
        value={user.name}
        onChange={getUserData}
        autoComplete="off"
        required
        fullWidth
      />
      <TextField
        variant="outlined"
        type="email"
        name="email"
        label="Enter email"
        value={user.email}
        onChange={getUserData}
        autoComplete="off"
        required
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        name="password"
        type="password"
        value={user.password}
        onChange={getUserData}
        required
        autoComplete="off"
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={user.confirmPassword}
        onChange={getUserData}
        required
        autoComplete="off"
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        className="signupbutton"
        onClick={postData}
        // onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
