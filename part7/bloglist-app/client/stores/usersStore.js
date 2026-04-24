import { create } from 'zustand'
import loginService from '../src/services/login'
import blogService from '../src/services/blogs'
import { getUser, saveUser, removeUser } from '../src/services/persistentUser'


const useUsersStore = create(set => ({
  user: null,
  actions: {
    initialize: () => {
      const loggedUserJSON = getUser()
      console.log("hello")
      console.log(loggedUserJSON)
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        set({ user })
      }
    },
    login: async (credentials) => {
      const user = await loginService.login({ username: credentials.username, 
                                      password: credentials.password })
      console.log(user)
      saveUser(user)
      blogService.setToken(user.token)
      set({ user })
      return user
    },
    logout: () => {
      removeUser()
      set({ user: null })
    }
  }
}))

export const useUser = () => useUsersStore(state => state.user)
export const useUserActions = () => useUsersStore(state => state.actions)

export default useUsersStore