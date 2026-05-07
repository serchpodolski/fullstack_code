import { useState } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './utilities/queries'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { addBookToCache } from './utilities/apolloClient'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      addBookToCache(client.cache, addedBook)
    }
  })
  
  const authorsQuery = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS, { variables: { genre: null } })
  if(authorsQuery.loading || books.loading) return <div>Loading...</div>

  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }


  if(!token) {
    return (
      <div>
        <h1>Login</h1>
        <Notification message={errorMessage} />
        <LoginForm
          setError={notify}
          setToken={setToken}
        />
      </div>
    )
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={onLogout}>logout</button>
      </div>

      <Notification message={errorMessage} />

      <Authors show={page === 'authors'}  authors={authorsQuery.data.allAuthors} />

      <Books show={page === 'books'} books={books.data.allBooks} />

      <NewBook show={page === 'add'} />

      <Recommend show={page === 'recommend'} />


    </div>
  )
}

export default App
