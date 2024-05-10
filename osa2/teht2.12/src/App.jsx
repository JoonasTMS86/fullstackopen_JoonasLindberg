import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = (props) => {
  
  return (
    <div>
      {props.name} {props.number} <br/>
    </div>
  )
}

const Persons = (props) => {
  
  return (
    <div>
    {props.peopleToShow.map(person => 
      <Person key={person.name} name={person.name} number={person.number} />
    )}
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
    <div>
      name: <input 
      value={props.newName}
      onChange={props.handleNameChange}
      />
    </div>
    <div>
      number: <input 
      value={props.newNumber}
      onChange={props.handleNumberChange}
    />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Filter = (props) => {
  return (
    <div>
    filter shown with: <input 
    value={props.filter_shown_with}
    onChange={props.handleFilterShownWithChange}
    />
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const [newName, setNewName] = useState(
    ''
  )

  const [newNumber, setNewNumber] = useState(
    ''
  )
  const [filter_shown_with, setFilter_shown_with] = useState(
    ''
  )
  const [showOnlyFilteredEntries, setShowOnlyFilteredEntries] = useState(
    false
  )

  const peopleToShow = showOnlyFilteredEntries
    ? persons.filter(person => person.name.toLowerCase().includes(filter_shown_with.toLowerCase()))
    : persons

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if(names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
  
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterShownWithChange = (event) => {
    console.log(event.target.value)
    setFilter_shown_with(event.target.value)
    const fieldnotempty = event.target.value.length > 0 ? true : false
    setShowOnlyFilteredEntries(fieldnotempty)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter_shown_with = {filter_shown_with} handleFilterShownWithChange = {handleFilterShownWithChange} />

      <h3>Add a new</h3>

      <PersonForm 
      addPerson = {addPerson} 
      newName = {newName} 
      handleNameChange = {handleNameChange}
      newNumber = {newNumber}
      handleNumberChange = {handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons peopleToShow = {peopleToShow} />
    </div>
  )
}

export default App
