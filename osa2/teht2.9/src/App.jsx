import { useState } from 'react'

const Person = (props) => {
  
  return (
    <div>
      {props.name} {props.number} <br/>
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

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
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
      <div>
          filter shown with: <input 
          value={filter_shown_with}
          onChange={handleFilterShownWithChange}
          />
        </div>
      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      {peopleToShow.map(person => 
          <Person key={person.name} name={person.name} number={person.number} />
        )}
    </div>
  )

}

export default App