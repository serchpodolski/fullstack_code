import { useBlogs } from "../../stores/blogStore"
import Blog from "../components/Blog"
import '../styles/blogStyles.css'

const BlogList = ({ user }) => {
    const blogs = useBlogs()
    return(
    <div className="top-blogs-ctn">
      <h1>Blogs</h1>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        //   updateBlog={updateBlog}
        //   removeBlog={removeBlog}
          user={user}
        />
      ))}
    </div>
    )
}

export default BlogList