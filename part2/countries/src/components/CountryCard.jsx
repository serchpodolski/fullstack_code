const CountryCard = ({ country }) => {
    // console.log(country)
    return (
        
        <div>
            <h1>{country.commonName}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <ul style={{ listStyleType: 'none', padding: 0 }}> 
            {country.languages.map((language, index) => (
                <li key={index} >{language}</li>
            ))}
            </ul>
            <img src={country.flagUrl} alt={country.flagAlt} />
            {country.weather && (
                <div>
                    <h2>Weather in {country.capital}</h2>
                    <p>Temperature: {country.weather.main.temp} °C</p>
                    <img src={`http://openweathermap.org/img/wn/${country.weather.weather[0].icon}@2x.png`} 
                        alt={country.weather.weather[0].description} />
                    <p>Weather: {country.weather.weather[0].description}</p>
                    <p>Wind: {country.weather.wind.speed} m/s</p>
                    <p>Humidity: {country.weather.main.humidity}%</p>
                </div>
            )}
        </div>
  )
}

export default CountryCard