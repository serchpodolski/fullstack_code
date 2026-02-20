import { useState, useEffect } from 'react'
import './App.css'
import countriesInfo from './services/countriesApi'
import Countries from './components/Countries'
import CountryCard from './components/CountryCard'
import weatherInfo from './services/weather'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [countryInfo, setCountryInfo] = useState({name: {common: ''}, capital: '', area: '', languages: [], flags: {png: ''}})

 useEffect(() =>  {
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    try {
      countriesInfo
        .getAll()
        .then(data => setCountries(data))
    } catch (error) {
      console.log(error.response.data)
    }
  }, [])

  const handleFilterChange = (event) => {
    event.preventDefault()
    const filterValue = event.target.value.toLowerCase()
    setFilter(filterValue)
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter))
  

  useEffect(() => {
      if (filteredCountries.length === 1) {
        const name = filteredCountries[0].name.common
        countriesInfo.getByName(name)
          .then(data => {
            const { name, capital, area, languages, flags } = data;

            weatherInfo.getWeather(capital[0]).then(
              data => {
                const weatherData = data;
                // 2. Format the data for your state
                setCountryInfo({
                  ...data,
                  commonName: name.common,
                  capital: capital ? capital[0] : 'N/A', // Handle missing capitals
                  area: area,
                  languages: languages ? Object.values(languages) : [], // Object to Array
                  flagUrl: flags.png,
                  flagAlt: flags.alt,
                  weather: weatherData// Fetch weather for the capital
                })
              }
            ).catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      } else {
        // Clear info if we aren't looking at exactly 1 country
        setCountryInfo(null)
      }
    }, [filter, countries])

  const renderContent = () => {
    if (filter === '') return null
    if (filteredCountries.length > 10) return <p>Too many matches...</p>
    
    if (filteredCountries.length === 1) {
      return countryInfo ? <CountryCard country={countryInfo} /> : <p>Loading...</p>
    }

    return <Countries countries={filteredCountries} handleClick={handleClick} />
  }

  const handleClick = (name) => {
    setFilter(name.toLowerCase())
  }

  return (
    <>
      <div>
        <h1>Countries</h1>
        <label htmlFor="filter">Find countries: </label>
        <input id="filter" type="text" onChange={handleFilterChange} />
        {renderContent()}
      </div>
    </>
  )

}

export default App
