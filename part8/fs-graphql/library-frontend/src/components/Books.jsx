import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../utilities/queries'


const Books = (props) => {
  const [filter, setFilter] = useState('all')
  
  const booksQuery = useQuery(ALL_BOOKS, {
    fetchPolicy: 'network-only',
    variables:{
      genre: filter === 'all' ? null : filter
    },
  })
  
  if (!props.show) {
    return null
  }

  if (booksQuery.loading) {
    return <div>Loading books...</div>
  }

  if (booksQuery.error) {
    return <div>Error loading books</div>
  }

  const books = props.books ? props.books : []
  const uniqueGenres = [...new Set(books.flatMap(book => book.genres.map(genre => genre.toLowerCase())))]
  uniqueGenres.unshift('All')

  // const booksToDisplay = filter !== 'all' ? books.filter(book => 
  //                                 book.genres
  //                                 .map(genre => genre.toLowerCase())
  //                                 .includes(filter)) : books



  return (
    <div>
      <h2>books</h2>
      {filter !== 'all' && <p>in genre <b>{filter.charAt(0).toUpperCase()+filter.slice(1)}</b></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksQuery.data?.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author?.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Filter By:</h3>
        <select
          name="filter"
          value={filter}
          onChange={({ target }) => setFilter(target.value)}
        >
          {uniqueGenres.map((a) =>
            <option key={a.id} value={a.toLowerCase()} name={a.toLowerCase()}>
              {a.charAt(0).toUpperCase()+a.slice(1)}
            </option>
          )}
        </select>
      </div>
    </div>
  )
}

export default Books
