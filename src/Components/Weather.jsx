import React, { useEffect, useState, useSyncExternalStore } from 'react'
import './Weather.css'
import search_icon from'../assets/search.png'
import clear_icon from'../assets/clear.png'
import cloud_icon from'../assets/cloud.png'
import drizzle_icon from'../assets/drizzle.png'
import humidity_icon from'../assets/humidity.png'
import rain_icon from'../assets/rain.png'
import snow_icon from'../assets/wind.png'
import wind_icon from'../assets/wind.png'

const Weather = () => {

  const [weatherData, setWeatherData] = useState (false);

  const allIcons = {
    '01d': clear_icon,
    '02d': cloud_icon,
    '04d': drizzle_icon,
    '09d': rain_icon,
    '13d': snow_icon,
  }

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      console.log(data);
      setWeatherData ({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
      
      
    } catch (error) {
      
    }
  }

  useEffect (()=>{

    search ('New Delhi');
  }, [])
  return (
    <div className = 'weather'>
      <h1>Weather</h1>
        <div className="search_bar">
          <input type="text" placeholder = 'Search'/>
          <img src={search_icon} alt="" />
        </div>
        <img src={weatherData.icon} alt="" className = 'weather_icon'/>
        <p className = 'temperature'>{weatherData.temperature} °C</p>
        <p className = 'city_name'>{weatherData.location}</p>
        <div className="weather_data">
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div className="humid_text">
              <p>{weatherData.humidity}% </p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
            <div className="wind_text">
              <p>{weatherData.windSpeed} Km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      
    </div>
  )
}

export default Weather
