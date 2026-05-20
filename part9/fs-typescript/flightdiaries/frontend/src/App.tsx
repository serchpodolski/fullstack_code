import { useEffect, useState } from 'react';
import type { DiaryEntry, NewDiaryEntry } from './types';
import diaryService from './services/diaryService';
import Diary from './components/Diary';
import NewDiaryForm from './components/NewDiaryForm';
import Notification from './components/Notification';
import axios from 'axios';
import './App.css';

const App = () => {
  // const [newDiaryEntry, setNewDiaryEntry] = useState('')
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log('effect')
    diaryService.getAll().then(initialDiaryEntries => {
      console.log('promise fulfilled')
      setDiaryEntries(initialDiaryEntries)
    })
  }, [])

  const addDiaryEntry = (newEntry: NewDiaryEntry) => {
    // event.preventDefault()
    console.log('New Entry:' + newEntry.comment + ' ' + newEntry.date + ' ' + newEntry.visibility + ' ' + newEntry.weather + ' added')
    diaryService.create(newEntry)
      .then(returnedEntry => {
        setDiaryEntries(diaryEntries.concat(returnedEntry))
      })
      .catch(error => {
        console.log('Failed to save entry:', error)
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage('An unexpected network error occurred.');
        }
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
    

  return(
    <>
      <Notification message={errorMessage} />
      <Diary diaryEntries={diaryEntries} />
      <NewDiaryForm onCreate={addDiaryEntry} />
    </>
  )
}

export default App
