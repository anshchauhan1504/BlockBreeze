import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { Avatar } from "@material-ui/core";
import { Cryptostate } from "../../BlockContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../Firebase";
import "./usersidebar.css";
import { numberWithCommas } from "../Banner/Carouselcoins";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
const useStyles = makeStyles({
  avatarstyle: {
    height: 38,
    width: 38,
    cursor: "pointer",
    backgroundColor: "#EEBC1D",
  },
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Poppins', sans-serif",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
  picture: {
    width: 180,
    height: 180,
    cursor: "pointer",
    backgroundColor: "#EEBC1D",
    objectFit: "contain",
  },
  username: {
    width: "100%",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bolder",
    wordWrap: "break-word",
    fontFamily: "'Poppins', sans-serif",
  },
  lgout: {
    height: "8%",
    width: "100%",
    backgroundColor: "purple",
    marginTop: 20,
  },
  watchlist: {
    flex: 1,
    width: "100%",
    backgroundColor: "light grey",
    borderRadius: 30,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  },
  watchlist_title: {
    fontSize: 15,
    textShadow: "0 0 5px black",
  },
  displaycoin: {
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEBC1D",
    boxShadow: "0 0 3px black",
  },
});
export default function Usersidebar() {
  const { user, setAlert, monitorlist, coins, symbol } = Cryptostate();
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
 
  //Remove from monitor list
  const removemonitorlist = async (coin) => {
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




  const logout = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });
    toggleDrawer();
  };
  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            className={classes.avatarstyle}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span className={classes.username}>
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchlist}>
                  <span className={classes.watchlist_title}>
                    Monitoring list
                  </span>
                  {coins.map((coin) => {
                    if (monitorlist.includes(coin.id))
                      return (
                        <div className={classes.displaycoin}>
                          <span>{coin.name}</span>&nbsp;
                          <span>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                          </span>
                          &nbsp;
                          <span className="coinrankvalue">
                            {coin.market_cap_rank}
                            <AiFillDelete
                              style={{ cursor: "pointer", marginLeft: 5 }}
                              fontSize="16"
                              onClick={()=>removemonitorlist(coin)}
                            />
                          </span>
                        </div>
                      );
                  })}
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.lgout}
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
