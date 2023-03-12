import {
  Button,
  createTheme,
  makeStyles,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Cryptostate } from "../BlockContext";
import axios from "axios";
import { SingleCoin } from "../Config/Api";
import Coindetails from "../Components/Coindetails";
import ReactHtmlParser from "html-react-parser";
import "./Coinpage.css";
import { numberWithCommas } from "../Components/Banner/Carouselcoins";
import Description from "./Description";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: "url(../coinpagebg.png)",
    minHeight: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      //Responsiveness
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "4px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "'Poppins', sans-serif",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastThreshold: 4.5,
    },
    type: "dark",
  },
});
const Coinpage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol, user, monitorlist, setAlert } = Cryptostate();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
  }, []);

  const inmonitorlist = monitorlist.includes(coin?.id); //If monitorlist includes coin?.id already then inmonitorlist will be true otherwise false.
  const addtoMonitorlist = async () => {
    const coinref = doc(db, "monitoringlist", user.uid);
    try {
      await setDoc(coinref, {
        coin: monitorlist ? [...monitorlist, coin?.id] : [coin?.id],
      });
      setAlert({
        open: true,
        message: `${coin.name} Added to the Monitor List !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removemonitorlist = async () => {
    const coinref = doc(db, "monitoringlist", user.uid);
    try {
      await setDoc(
        coinref,
        {
          coin: monitorlist.filter((monitor) => monitor != coin?.id), //This is going to remove coin from monitor list
        },
        {
          merge: "true",
        }
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed from the Monitor List !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
  // if(txt1.search("<a")!=-1){
  //   txt2=ReactHtmlParser(txt1.en.split(". ")[0]);
  // }
  // else{
  //   txt2=(txt1.en.split(". ")[0]);
  // }

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        {/* sidebar */}
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          className="currency_img"
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className="description">
          {coin?.description.en.split(". ")[0]}.{/* {txt2} */}
        </Typography>
        <div className={classes.marketData}>
          <span className="Rank">
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            {/* nbsp is for space */}
            &nbsp; &nbsp;
            <Typography variant="h5" className="Rankvalue">
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span className="Rank">
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" className="Rankvalue">
              {symbol} {coin?.market_data.current_price[currency.toLowerCase()]}
            </Typography>
          </span>
          <span className="Rank">
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" className="Rankvalue">
              {symbol}{" "}
              {coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)}
              M
            </Typography>
          </span>
          {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inmonitorlist ? "#ff0000" : "#EEBC1D",
              }}
              onClick={inmonitorlist ? removemonitorlist : addtoMonitorlist}
            >
              {inmonitorlist
                ? "Remove from Monitor List"
                : "Add to Monitor List"}
            </Button>
          )}
        </div>
      </div>
      {/* Coin chart */}
      <Coindetails coin={coin} />
    </div>
  );
};

export default Coinpage;
