import { useState, useEffect } from 'react'
import axios from 'axios'

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
    </div>
  )
}

const Countries = (props) => {
  if(props.countries.length <= 10) {
    if(props.countries.length === 1 && props.country !== null) {
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
        </div>
      )
    }
    else {
  return (
    <div>
    {props.countries.map(country => 
      <Country key = {country} country = {country} />
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
              axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country_to_get}`)
            .then(response => {
              setCountry(response.data)
            })
          }
          setCountries(filtered_countries)
        })
    }
    setValue(event.target.value)
  }
  
  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange} />
      </form>
      <Countries countries={countries} country={country} setCountry={setCountry} />
    </div>
  )

}

export default App
