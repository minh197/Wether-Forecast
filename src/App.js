import React, {Component} from 'react';
import { css } from "@emotion/core";
import PacmanLoader
from "react-spinners/PacmanLoader";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
  size: 25;
`;



export default class App extends Component {


  





  constructor(props){
    super(props)
    this.state={
      weatherResult:null
    }
  }
  
  

   currentWeather = async (long,lat) => {
     try{

      console.log("here")
      let api = process.env.REACT_APP_APIKEY;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&apiKey=${api}&units=metric`
      let data = await fetch(url);
      if(data == null){
        throw new Error("There is no data")
      }
      let result = await data.json();
      let resultForFiveDays = this.getFiveDaysWeather(lat,long)
      this.setState({weatherResult:result,fiveDaysWeather:resultForFiveDays})
      this.setState({weatherResult:result})
      
  
     }catch (err){
       alert(err.message)
     }
    
    
  };
  getFiveDaysWeather = async(lat,long) =>{
    try{

      console.log("here")
      let api = process.env.REACT_APP_APIKEY;
      let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&apiKey=${api}&units=metric`
      let data = await fetch(url);
      if(data == null){
        throw new Error("There is no data")
      }
      let result = await data.json();
  
      return result.list
      
  
     }catch (err){
       alert(err.message)
     }
  }


  getLocation  = () => {
    console.log("location")
    navigator.geolocation.getCurrentPosition((post) => {
      this.currentWeather(post.coords.longitude, post.coords.latitude)
    })
  }

  
  componentDidMount(){
    console.log("am i here?")
    this.getLocation()
  }
 

  render() {


    if(this.state.weatherResult == null){
      return (<div className="sweet-loading">
      <PacmanLoader

        css={override}
        size={30}
        margin={5}
        padding={5}
        color={"#123abc"}
        loading={this.state.loading}
      />
    </div>)
    }
    return (
      
      <div className="App">
        <div class="bg-img">
        <div class="content-wrapper">   
        <div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-white">
               Weather Forecast
            </h1>
            <h2 className="col-12 text-white">Location: {this.state.weatherResult.name}</h2>
            <h3 className="col-12 text-warning">Temperature: Current tempurature:{this.state.weatherResult.main.temp} C</h3>
            <h3 className="col-12 text-warning"> Feels like: {this.state.weatherResult.main.feels_like} C</h3>
            <h3 className="col-12 text-white">Weather Description: {this.state.weatherResult.weather[0].description} </h3>
            {/* <div>
              {this.state.fiveDaysWeather.map(item =>{return(
                <h3>{item.dt_txt}</h3>
                <h4>{item.main.temp}</h4>
              )})}
            </div> */}
          </div>
        </div>
      </div>
     </div> 
     </div>
     
      
    </div>
    )
  }
}












