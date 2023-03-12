import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Line } from 'react-chartjs-2';
import { Cryptostate } from '../BlockContext';
import { HistoricalChart } from '../Config/Api';
import { chartDays } from '../Config/data';
import SelectBtn from './SelectBtn';
import Chart from 'chart.js/auto';
import { useParams } from 'react-router-dom';
const Coindetails = ({coin}) => {
  const [historicaldata,setHistoricalData]=useState();
  const { id } = useParams(); 
  const [days,setDays]=useState(1);
  const {currency} = Cryptostate();
  const [flag,setflag]=useState(false);
  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes=useStyles();
  // var id=coin.id
  // console.log(coin)
  // console.log(coin.id)
  // console.log(coin.name)
  // console.log(coin[0])
  
  const fetchhistoricaldata=async()=>{
    
    const{data}=await axios.get(HistoricalChart(id,days,currency));
   
    setflag(true);
    setHistoricalData(data.prices);
  };
  
  useEffect(()=>{
    fetchhistoricaldata();
  },[days])
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });



  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
         {!historicaldata | flag===false ? (
          <CircularProgress
          style={{ color: "gold" }}
          size={250}
          thickness={1}
        />
         ):(
          <>
          <Line
              data={{
                labels: historicaldata.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicaldata.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectBtn
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectBtn>
              ))}
            </div>

          </>
         
        )}
      </div>
    </ThemeProvider>
  );
};

export default Coindetails;

