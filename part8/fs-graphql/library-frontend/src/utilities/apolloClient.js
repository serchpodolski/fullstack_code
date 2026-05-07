import { ALL_BOOKS } from "./queries";

export const addBookToCache = (cache, bookToAdd) => {
    cache.updateQuery({ query: ALL_BOOKS, variables: { genre: null } }, (data) => {
        if (!data) return

        const bookExists = data.allBooks.some(b => b.title === bookToAdd.title)
        if (bookExists) {
            return data
        }
        
        return {
            allBooks: data.allBooks.concat(bookToAdd)
        }
    })
}