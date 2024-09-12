import React, { useEffect, useState } from 'react'
import './Weather.css'

export default function Weather() {
    const[apiData, setApiData] = useState([]);
    const[search, setSearch] = useState('bhopal');
    const api_key = '6afb922bdfe2d7d4ea7a6b2633e7e4c4'

    const callApi = async(city) => {
      const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
      const data = await get.json();
      setApiData(data);
      console.log(data);  
    }

    useEffect(() => {
        callApi("bhopal")
        setSearch("")
    },[])

    const trigger = () => {
        callApi(search);
        setSearch("")
    }


const tempCelsius = apiData && apiData.main ? Math.floor(apiData.main.temp - 273.15) : null;


  return (
    <div>
      <div className="container">
       <input type="text" placeholder='Enter Location' 
       onChange={(e) => setSearch(e.target.value)} value={search}/>
       <button onClick={trigger}>search</button>
       <div className="output">
      
      {apiData && apiData.weather ? (
             <div>
                <h1>{apiData.name}</h1>
                <h2>{tempCelsius}°C</h2>
                <h2>{apiData.weather[0].description}</h2>
             </div>
      ) : ("Api not found")}
       </div>
      </div>
    </div>
  )
}

