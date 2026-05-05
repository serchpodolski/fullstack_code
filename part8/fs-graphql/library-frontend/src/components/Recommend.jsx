// import { useState } from 'react'
import { ME, ALL_BOOKS } from '../utilities/queries'
import { useQuery } from '@apollo/client/react'

const Recommend = (props) => {
  const userMe = useQuery(ME, {
    fetchPolicy: 'network-only'
  })

  const favoriteGenre = userMe.data?.me?.favoriteGenre
  
  const books = useQuery(ALL_BOOKS, {
    variables:{
      genre: favoriteGenre
    },
    skip: !favoriteGenre,
    fetchPolicy: 'network-only'
  })

  if(!props.show) return null
  
  console.log(books)
  
  // 1. Handle the loading state
  if (userMe.loading || books.loading) {
    return <div>loading...</div>
  }
  
  // 2. Handle potential errors (server down, token expired, etc.)
  if (userMe.error) return <div>Error: {userMe.error.message}</div>
  if (books.error) return <div>Error: {books.error.message}</div>

  const booksToShow = books.data?.allBooks || [] 

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre: <strong>{favoriteGenre.charAt(0).toUpperCase()+favoriteGenre.slice(1)}</strong></p>
      
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map(a => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend;
