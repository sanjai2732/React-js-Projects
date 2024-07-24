import React, { useEffect, useState } from 'react'
/*Images */
import searchIcon from './assets/search.png'
import  clearIcon from './assets/clear.png'
import cloudIcon from './assets/clouds.png'
import drizzleIcon from './assets/drizzle.png'
import humidityIcon from './assets/humidity.png'
import mistIcon from './assets/mist.png'
import rainIcon from './assets/rain.png'
import snowIcon from './assets/snow.png'
import windIcon from './assets/wind.png'
/*Css style sheet */
import './weather.css'
const WeatherDetails=({icon,temp,city,country,lat,long,humidity,wind})=>{
   
    return(
    <>
        <div className="image">
            <img src={icon} alt="weatherImage" />
        </div>
        <div className="temp">{temp}°C</div>
        <div className="city">{city}</div>
        <div className="country">{country}</div>
        <div className="cord">
            <div>
                <span className='latitute'>latitute</span>
                <span>{lat}</span>
            </div>
            <div>
                <span className='longitute'>longitute</span>
                <span>{long}</span>
            </div>
        </div>
        <div className="data-container">
            <div className="element">
                <img src={humidityIcon} alt="humidityIron" className='icon' />
                <div className="data">
                    <div className="humidity-percentage elementData">{humidity} %</div>
                    <div className='text'>Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={windIcon} alt="wind" className='icon'/>
                <div className="data">
                    <div className="wind-speed elementData">{wind} Km/h</div>
                    <div className='text'>Wind Speed</div>
                </div>
            </div>
        </div>
    
    </>)
}

export const WeatherApp = () => {
    const [useIcon,setIcon]=useState('')
    const [useTemp,setTemp]=useState(0)
    const [city,setCity]=useState('')
    const [country,setCountry]=useState('')
    const [lat,setLat]=useState(0)
    const [long,setLong]=useState(0)
    const [humidity,setHumidity]=useState(0)
    const [wind,setWind]=useState(0)
    const [text,setText]=useState('london')
    const[cityNotFound,setCityNotFound]=useState(false)
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState(null)
    const weatherIconMap = {
        "01d" :clearIcon,
        "01n" :clearIcon,
        "02d" :cloudIcon,
        "02n" :cloudIcon,
        "03d" :drizzleIcon,
        "03n" :drizzleIcon,
        "04n" :drizzleIcon,
        "04d" :drizzleIcon,
        "09d" :rainIcon,
        "09n" :rainIcon,
        "010n" :rainIcon,
        "010d" :rainIcon,
        "013d" :snowIcon,
        "013n" :snowIcon
    }
    const url_key=`4d82260ecea6107e17bf5e96a68f29a2`
    const search= async () =>{
        setLoading(true);
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${url_key}&units=Metric`
        try {
            let res=await fetch(url)
            let data=await res.json()
            if(data.cod === "404"){
                console.error("City not found")
                setCityNotFound(true)
                setLoading(false);
                return;
            }
            setHumidity(data.main.humidity)
            setWind(data.wind.speed)
            setTemp(Math.floor(data.main.temp))
            setCity(data.name)
            setCountry(data.sys.country)
            setLat(data.coord.lat)
            setLong(data.coord.lon)
            const weatherIconCode=data.weather[0].icon;
            setIcon(weatherIconMap[weatherIconCode] || clearIcon)
            setCityNotFound(false)
            
        } catch (error) {
            console.error('An error occurred',error.message)
            setError("An error occurred while fetching weather data.")
        }
        finally{
            setLoading(false);
        }
        
    }




    const handleCity=(e)=>{
        setText(e.target.value)
    }
    const handleKeyDown=(e)=>{
        if(e.key==='Enter'){
            search();
        }
    }
    useEffect (function(){
        search();
    },[])
  return (
    <>
    <div className="container">
        <div className="input-container">
            <input type="text" placeholder='Search city' onChange={handleCity} className='search' value={text} onKeyDown={handleKeyDown} />
            <div className="search-icon" onClick={()=>search()}>
                <img src={searchIcon} alt="search"  />
            </div>
        </div>
        {loading &&<div className="loading-message">loading...</div>}
        {error && <div className="error-message">{error}</div>}
        { cityNotFound && <div className="city-not-found">city not found</div>}
        {!loading && !cityNotFound && <WeatherDetails icon={useIcon} temp={useTemp} city={city} country={country} lat={lat} long={long} humidity={humidity} wind={wind}/>}
        
    </div>
    </>
  )
}
