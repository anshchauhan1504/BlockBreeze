import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { Cryptostate } from '../../BlockContext';

const Login = ({handleClose}) => {
  const {setAlert}=Cryptostate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  let name,value;
 const logindata=(e)=>{
  name=e.target.name;
  value=e.target.value;
  setUser({ ...user, [name]: value });
 };

 const setuserdata=async(e)=>{
  if (!user.email || !user.password) {
    setAlert({
      open: true,
      message: "Please fill all the Fields",
      type: "error",
    });
    return;
  }
  e.preventDefault();
  try {
    const result=await signInWithEmailAndPassword(auth,user.email,user.password).then((res)=>{
      setAlert({
        open: true,
        message: `Log In Successful. Welcome back`,
        type: "success",
      });
      handleClose();
    })
  } catch (error) {
    setAlert({
      open: true,
      message: error.message,
      type: "error",
    });
    return;
    
  }

 }
  
  return (
    <Box p={3} className="mainbox">
      <TextField
        variant="outlined"
        type="emai"
        name='email'
        label="Enter email"
        value={user.email}
        onChange={logindata}
        fullWidth
        required
        autoComplete="off"
      />
      <TextField
        variant="outlined"
        name='password'
        label="Enter Password"
        type="password"
        value={user.password}
        onChange={logindata}
        fullWidth
        required
        autoComplete="off"
      />

      <Button
      variant="contained"
      size="large"
      className="signupbutton"
      onClick={setuserdata}>
        Login
      </Button>
    </Box>
   
  )
}

export default Login
