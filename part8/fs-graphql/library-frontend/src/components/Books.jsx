import { useState } from 'react'

const Books = (props) => {
  const [filter, setFilter] = useState('all')
  
  if (!props.show) {
    return null
  }

  const books = props.books ? props.books : []
  const uniqueGenres = [...new Set(books.flatMap(book => book.genres.map(genre => genre.toLowerCase())))]
  uniqueGenres.unshift('All')

  const booksToDisplay = filter === 'all' 
    ? books 
    : books.filter(book => 
        book.genres
          .map(g => g.toLowerCase())
          .includes(filter.toLowerCase())
      )

  return (
    <div>
      <h2>books</h2>
      {filter !== 'all' && <p>in genre <b>{filter.charAt(0).toUpperCase()+filter.slice(1)}</b></p>}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToDisplay.map((a) => (
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
          {uniqueGenres.map((a, index) =>
            <option key={index} value={a.toLowerCase()}>
              {a.charAt(0).toUpperCase()+a.slice(1)}
            </option>
          )}
        </select>
      </div>
    </div>
  )
}

export default Books
