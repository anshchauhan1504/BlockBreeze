import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import CoinsTable from "../CoinsTable";
import Carouselcoins from "./Carouselcoins";
import "./Banner.css"

// const useStyles = makeStyles(() => ({
//   // banner: {
//   //   backgroundImage: "url(./banner.png)",
//   //   backgroundRepeat: "no-repeat",
//   //   backgroundSize: "cover",
    
//   //   // opacity:0.8,
//   //   // backgroundPositionX:0,
//   // },
//   bannerContent: {
//     height: 300,
//     display: "flex",
//     flexDirection: "column",
//     paddingTop: 25,
//     justifyContent: "space-around",
//   },
//   tagline: {
//     display: "flex",
//     height: "30%",
//     flexDirection: "column",
//     justifyContent: "center",
//     textAlign: "center",
//   },
// }));

const Banner = () => {
  // const classes = useStyles();
  return (
    <div>
      <Container className="bannerContent">
        <div className="tagline">
          <Typography
            variant="h2"
            className="titlestyle"
          >
           <b>BlockBreeze</b> 
          </Typography>
          <Typography variant="h6"
          className="subheadingstyle"
          >
           <i>Get all the info about your favourite crypto coin</i> 
          </Typography>
        </div>
        <Carouselcoins />
      </Container>
    </div>
  );
};

export default Banner;
