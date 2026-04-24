const getUser = () => {
    return window.localStorage.getItem('loggedBlogappUser')
}

const saveUser = (user) => {
    return window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
}

const removeUser = () => {
    return window.localStorage.removeItem('loggedBlogappUser')
}

export { getUser, saveUser, removeUser }