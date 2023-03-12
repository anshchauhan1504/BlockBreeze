import "./App.css";
import Header from "./Components/Header";
import Homepage from "./pages/Homepage";
import Coinpage from "./pages/Coinpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { makeStyles} from "@material-ui/core";
import  Alert  from "./Components/Alert"

const useStyles = makeStyles(() => ({
  App: {
    // backgroundImage: "url(./banner.png)",
    // backgroundRepeat: "no-repeat",
    // backgroundSize:"cover",
    color: "white",
    minHeight:"100vh",
    
  },
  media:{
    mobile:"768px",
    tab:"998px",
  }
}));

function App() {
  const classes = useStyles();
  return (
    
    <BrowserRouter>
    
    <div className={classes.App}>
    <Header />
      <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<Coinpage />} exact /> 
      </Routes>
      </div>
      <Alert/>
    </BrowserRouter>
  );
};


export default App;