import { create } from 'zustand'
import blogService from '../src/services/blogs'
import useUsersStore from './usersStore'

const useBlogStore = create(set => ({
  blogs: [],
  actions: {
    initialize: async () => {
      const blogs = await blogService.getAll()
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      console.log(blogs)
      set(() => ({ blogs: sortedBlogs }))
    },
    createBlog: async (blog) => {
      const newBlog = await blogService.create(blog)
      const currentUser = useUsersStore.getState().user
      const blogWithUser = { ...newBlog, user: { id: newBlog.user, name: currentUser.name } }
      console.log(newBlog)
      set((state) => {
        const updatedBlogs = [...state.blogs, blogWithUser].sort((a, b) => b.likes - a.likes)
        return { blogs: updatedBlogs }
        })
    },
    likeBlog: async (blogToUpdate) => {
      const changedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }
      const updatedBlog = await blogService.update(blogToUpdate.id, changedBlog)
      set((state) => {
        const sortedBlogs = state.blogs
                              .map((blog) => blog.id === updatedBlog.id ? updatedBlog : blog)
                              .sort((a, b) => b.likes - a.likes)
        return { blogs: sortedBlogs }
      })

    },
    removeBlog: async (blog) => {
      const currentUser = useUsersStore.getState().user

      console.log(currentUser)
      if(blog.user.name !== currentUser.name){
        throw Error("Unauthorized")
      }
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
        await blogService.remove(blog.id)
        set((state) => {
          const updatedBlogs = state.blogs.filter((b) => b.id !== blog.id)
          return { blogs: updatedBlogs }
        })
      }

    },
    commentBlog: async (blog, comment) => {
      const updatedBlog = await blogService.comment(blog.id, comment)
      set((state) => {
        const sortedBlogs = state.blogs
                              .map((b) => b.id === updatedBlog.id ? updatedBlog : b)
        return { blogs: sortedBlogs }
      })
    }

  }
})
)

export const useBlogs = () => useBlogStore((state) => state.blogs)
export const useBlogActions = () => useBlogStore((state) => state.actions)

export default useBlogStore

//