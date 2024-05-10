import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_APIKEY

const Language = (props) => {
  return (
    <li>
      {props.language}
    </li>
  )
}

const Country = (props) => {
  return (
    <div>
      {props.country}
      <button onClick={() => props.viewCountry(props.country)}> show </button>
    </div>
  )
}

const Countries = (props) => {
  if(props.countries.length <= 10 || props.countries.length === undefined) {
    if((props.countries.length === 1 && props.country !== null) || props.countries.length === undefined ) {
      let temperature = 0
      let wind = 0
      let icon = ""
      if(props.weather !== null) {
        temperature = props.weather.main.temp
        wind = props.weather.wind.speed
        icon = `https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`
      }
      const languages_array = Object.keys(props.country.languages).map((key) => [key, props.country.languages[key]])
      const languages_kvpair = {lang: []}

      languages_array.forEach(language => {languages_kvpair.lang.push(language[1])})

      return (
        <div>
          <h1>{props.country.name.common}</h1>
          capital {props.country.capital} <br/>
          area {props.country.area} <br/>
          <h2>languages:</h2>
          <ul>
          {languages_kvpair.lang.map(language => <Language key = {language} language = {language} /> ) }
          </ul>
          <img src={props.country.flags.png}></img>
          <h2>Weather in {props.country.capital}</h2>
          temperature {temperature} Celcius <br/>
          <img src={icon}></img> <br/>
          wind {wind} m/s
        </div>
      )
    }
    else {
  return (
    <div>
    {props.countries.map(country => 
      <Country key = {country} country = {country} viewCountry = {props.viewCountry} />
    )}
    </div>
  )
}
}
else {
  return (
    <div>
      Too many matches, specify another filter
    </div>
  )
}
}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const handleChange = (event) => {
    if (event.target.value) {
      const countries_to_search = event.target.value
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const all_countries = response.data
          const country_names = all_countries.map(country => country.name.common)
          const filtered_countries = country_names.filter(name => name.toLowerCase().includes(countries_to_search.toLowerCase()))
          const country_to_get = filtered_countries[0]
          if(filtered_countries.length === 1) {
            viewCountry(country_to_get)
          }
          setCountries(filtered_countries)
        })
    }
    setValue(event.target.value)
  }

  const viewCountry = (country) => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
    .then(response => {
      setCountry(response.data)
      setCountries(response.data)
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${response.data.capital},${response.data.name.common}&units=metric&APPID=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
    })
  }
  
  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange} />
      </form>
      <Countries countries={countries} country={country} setCountry={setCountry} viewCountry={viewCountry} weather={weather} />
    </div>
  )

}

export default App
