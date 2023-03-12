import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Cryptostate } from "../../BlockContext";
import { TrendingCoins } from "../../Config/Api";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";



const useStyles = makeStyles((theme) => ({
  carousel: {
      
      display: "flex",
      alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //Here we are using regular expression concept in javascript which means we will get x it will be converted to string then using regex , will be there at suitable decimal places.
}
const Carouselcoins = () => {
  const [trending, setTrending] = useState([]);
  const { currency,symbol } = Cryptostate();
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]); //Everytime the currency will change price of coins will be fetch again
  const classes = useStyles();

  const items = trending.map((coin) => {
    let profit=coin.price_change_percentage_24h>=0; //Checking whether profit is >= 0
    
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>{coin?.symbol} 
          &nbsp;
          <span style={{
            color: profit>0 ? "rgb(14,203,129)":"red",
            fontWeight:500,
          }}>
            {/* Down below we are checking if profit >=0 then only make + otherwise display profit and fixed upto 2 decimal places */}
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{fontSize:22,fontWeight:500}}>
          {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1400}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carouselcoins;
