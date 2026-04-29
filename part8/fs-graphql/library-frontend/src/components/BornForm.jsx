import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client/react"
import { EDIT_BORN, ALL_AUTHORS } from "../utilities/queries"

const BornForm = () => {
  const [born, setBorn] = useState('')
  const [author, setAuthor] = useState('')

  const { data, loading, error } = useQuery(ALL_AUTHORS)
  const authors = data?.allAuthors || []

  // useEffect(() => {
  //   if (!author && authors.length > 0) {
  //     setAuthor(authors[0].name)
  //   }
  // }, [authors, author])

  const [editBorn] = useMutation(EDIT_BORN)

  const submit = (event) => {
    event.preventDefault()

    editBorn({
      variables: { name: author, setBornTo: Number(born) }
    })

    setBorn('')
  }

  if (loading) {
    return <div>Loading authors...</div>
  }

  if (error) {
    return <div>Error loading authors</div>
  }

  return(
    <div>
      <h2>Edit DOB</h2>
      <form onSubmit={submit}>
        <div>
          <select
            name="authors"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          >
            {authors.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )

}

export default BornForm