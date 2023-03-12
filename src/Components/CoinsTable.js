import {
  Container,
  createTheme,
  Grid,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cryptostate } from "../BlockContext";
import { CoinList } from "../Config/Api";
import "./CoinsTable.css";
import { numberWithCommas } from "./Banner/Carouselcoins";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  row: {
    // backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "'Poppins', sans-serif",
  },
  Pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
}));
const darkTheme = createTheme({
  palette: {
    primary: {
      // main: "#fff",
      main: "#fff",
      contrastThreshold: 4.5,
    },
    type: "dark",
  },
});
const CoinsTable = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { currency, symbol,coins,loading,fetchCoins } = Cryptostate();
 

  useEffect(() => {
    //Everytime currency changes then call fetchCoin function
    fetchCoins();
  }, [currency]);

  //Handling the search by any cryptocurrency name or symbol
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search) ||
        coin.symbol.toUpperCase().includes(search) ||
        coin.name.toUpperCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container className="Container">
        <Typography variant="h4" className="Coinsheading">
          <i>Market Capitalization of Cryptocurrencies</i>
        </Typography>
        <TextField
          label="Search for any Crypto Currency"
          variant="outlined"
          className="Textfield"
          onChange={(e) => setSearch(e.target.value)} //Everytime we search it takes its value and search in page
        />
        <TableContainer>
          {loading ? (
            <LinearProgress className="Linearprogress" />
          ) : (
            <Grid item xs={12}>
              <Table aria-label="simple table">
                <TableHead className="Tablehead">
                  <TableRow>
                    {["Coin", "Price", "24H Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          className="Thcell"
                          key={head} //Providing key to the map
                          align={head === "Coin" ? "" : "right"} //Sufficient space between coin and its other properties
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10) //Showing page (0 to 10) then (10 to 20) and so on
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          onClick={() => navigate(`/coins/${row.id}`)}
                          className={classes.row}
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            className="Tcell"
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              className="tcellimage"
                            />
                            <div className="tcellcontent">
                              <span className="tcproperties1">
                                {row.symbol}
                              </span>
                              <span className="tcproperties2">{row.name}</span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14,203,129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Grid>
          )}
        </TableContainer>
        <Pagination
          className="pagination"
          count={(handleSearch()?.length / 10).toFixed(0)}
          classes={{ ul: classes.Pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 500);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
