import {  makeStyles } from "@material-ui/core";
import React from "react";
import Banner from "../Components/Banner/Banner";
import CoinsTable from "../Components/CoinsTable";


const useStyles = makeStyles(()=>({
  bgimg:{
    backgroundImage: "url(./banner.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize:"cover",
    minHeight:"100vh",
    // backgroundColor:"transparent",
         
  }

}))
const Homepage = () => {
  const classes=useStyles();
  return (
    <div className={classes.bgimg} >
      
      <Banner />
      <CoinsTable />
    
    </div>
  );
};

export default Homepage;
