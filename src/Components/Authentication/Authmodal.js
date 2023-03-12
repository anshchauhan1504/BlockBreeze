import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { AppBar, Box, Button, Tab, Tabs } from "@material-ui/core";
import "./Auth.css"
import Login from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../Firebase";
import { Cryptostate } from "../../BlockContext";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    color: "white",
    borderRadius: 10,
  },
  googleAuth:{
    padding:24,
    paddingTop:0,
    display:"flex",
    flexDirection:"column",
    textAlign:"center",
    gap:20,
    fontSize:20,

  },
  
}));

export default function Authmodal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
   
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {setAlert}=Cryptostate();
  const googleprovider=new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleprovider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  return (
    <div>
      <Button variant="contained" className="loginbutton" onClick={handleOpen}>
       Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
           <AppBar position="static"
           className="navtabs">
            <Tabs 
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            className="tabs1">
              <Tab label="Login"/>
              <Tab label="Sign Up" />
            </Tabs>
           </AppBar>
            {/* Conditional Rendering*/}
            {value==0 && <Login handleClose={handleClose}/>}
            {value==1 && <Signup handleClose={handleClose}/>}
            <Box className={classes.googleAuth}>
              <span>OR</span>
              <GoogleButton
              className="googlebuttonstyle"
              onClick={signInWithGoogle}/>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
