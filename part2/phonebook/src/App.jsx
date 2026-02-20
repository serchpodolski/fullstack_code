import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import axios from 'axios'
import noteService from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([])
  const [statusMessage, setStatusMessage] = useState({message: null, type: null})

  useEffect(() => {
    noteService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }, [])
  // console.log('render', persons.length, 'persons')

  const [draft, setDraft] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setDraft(prevDraft => ({
      ...prevDraft,
      [name]: value
    }))
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(!draft.name || !draft.number) return;
    if(persons.some(person => person.name === draft.name)) {
      if(window.confirm(`${draft.name} is already added to phonebook, replace the old number with a new one?`)) {
        const existingPerson = persons.find(person => person.name === draft.name)
        noteService.update(existingPerson.id, { ...draft })
          .then(returnedEntry => {
            setPersons(prevPersons => 
              prevPersons.map(p => p.id === existingPerson.id ? returnedEntry : p)
            )
            setStatusMessage({message: `Updated ${draft.name}`, type: 'success'})
            setTimeout(() => {
              setStatusMessage(null)
            }, 5000)
            setDraft({ name: '', number: '' })
          })
          .catch(error => {
            console.error('Error updating person:', error)
          })
      }
      return
    }
    const newEntry = {
      ...draft
    }

    noteService.create(newEntry)
      .then(returnedEntry => {
        setPersons(prevPersons => prevPersons.concat(returnedEntry))
        setStatusMessage({message: `Added ${draft.name}`, type: 'success'})
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
        setDraft({ name: '', number: '' })
      })
     .catch(error => {
      console.error('Error adding person:', error)
     })
  }
    
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const deletePerson = (id) => {
    console.log(id)
    if (window.confirm(`Delete ${persons.find(p => p.id === id)?.name}?`)) {
      noteService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          console.error('Error deleting person:', error)
          setStatusMessage({message: `Information of ${persons.find(p => p.id === id)?.name} has already been removed from server`, type: 'error'})
          setTimeout(() => {
            setStatusMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Notification message={statusMessage?.message} type={statusMessage?.type} />
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        
        <h2>add a new</h2>
        <PersonForm 
            addPerson={addPerson} 
            draftName={draft.name}
            handleChange={handleChange}
            draftNumber={draft.number}
        />

        <h2>Numbers</h2>
        <Persons filteredPersons={filteredPersons} handleDelete={deletePerson} />
      </div>
    </>
  )

}

export default App
