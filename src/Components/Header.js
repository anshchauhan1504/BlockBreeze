import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  Box,
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import logo from "../Components/assests/gw.png";
import { useNavigate } from "react-router-dom";
import { Cryptostate } from "../BlockContext";
import Authmodal from "./Authentication/Authmodal";
import { ProviderId } from "firebase/auth";
import Usersidebar from "./Authentication/Usersidebar";

const Header = () => {
  const navigate = useNavigate();
  const {currency,setcurrency,user}=Cryptostate()
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: "dark",
    },
  }); 
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar style={{ background: '#4a148c'}} position="static">
        <Container>
          <Toolbar>
            <div>
              <img
                onClick={() => navigate("/")}
                src={logo}
                width="200"
                height="60"
                style={{ cursor: "pointer" }}
              />
            </div>

            {/* <Typography>
            Block-Breeze
          </Typography> */}
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight:15,
              }}
              value={currency}
              onChange={(e)=>setcurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            {user? <Usersidebar/> :<Authmodal/>}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
