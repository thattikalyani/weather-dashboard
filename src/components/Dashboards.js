import React, { useState } from 'react';
import WeatherCard from '../components/WeatherCard'
import axios from 'axios';
function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
      loading: false,
      data: {},
      error: false,
  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const search = async (event) => {
    
        event.preventDefault();
        setInput('');
        setIsOpen(!isOpen);
        setWeather({ ...weather, loading: true });
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=f00c38e0279b7bc85480c3fe775d518c`;
        await axios
            .get(url, {
                params: {
                    units: 'metric',
                },
            })
            .then((res) => {
                console.log('res', res);
                setWeather({ data: res.data, loading: false, error: false });
            })
            .catch((error) => {
                setWeather({ ...weather, data: {}, error: true });
                setInput('');
                console.log('error', error);
            });
    
};

return (
  <div className="App">
      <h1 className="app-name">
      Weather Dashboard
      </h1>
      <div className="search-bar">
          <input
              type="text"
              className="city-search"
              placeholder="Please Enter City Name.."
              name="query"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              
          />
          <button className='btn' onClick={search}>Get Report</button>
      </div>
    
    {isOpen && <WeatherCard 
      weather = {weather}
      handleClose={togglePopup}
    />}
  </div>
)}

export default Dashboard;