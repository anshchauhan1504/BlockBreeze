import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "./Config/Api";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Firebase";
import { doc, onSnapshot } from "firebase/firestore";
const crypto = createContext();
export const Blockcontext = ({ children }) => {
  const [currency, setcurrency] = useState("INR");
  const [symbol, setsymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [monitorlist, setMonitorlist] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  useEffect(() => {
    if (user) {
      const coinref = doc(db, "monitoringlist", user.uid);
      var unsubs = onSnapshot(coinref, (coin) => {
        if (coin.exists()) {
          setMonitorlist(coin.data().coin);
        } else {
          console.log("No items in monitor list");
        }
      });
      return () => {
        unsubs();
      };
    }
  }, [user]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  const fetchCoins = async () => {
    //In order to fetch coins
    setLoading(true);
    const { data } = await axios.get(CoinList(currency)); //Whatever we will be receiving from API it will be there in data and we are destructuring that data
    setCoins(data); //data we have received from API
    setLoading(false);
  };
  useEffect(() => {
    if (currency === "INR") setsymbol("₹");
    else if (currency === "USD") setsymbol("$");
  }, [currency]);
  return (
    <crypto.Provider
      value={{
        currency,
        symbol,
        setcurrency,
        coins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        user,
        monitorlist,
      }}
    >
      {children}
    </crypto.Provider>
  );
};

export default Blockcontext;
export const Cryptostate = () => {
  return useContext(crypto);
};
