import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import { useUser } from '../../stores/usersStore'
import fuel from '../assets/fuel.png'
import discover from '../assets/discover.png'
import smarter from '../assets/smarter.png'
import blogapp from '../assets/blogapp.png'
import { RiScrollToBottomLine } from "react-icons/ri";
import '../styles/homeStyles.css'

const Home = () => {
  const navigate = useNavigate()
  const loggedUser = useUser()

  const nextSectionRef = useRef(null)

  const scrollToNext = () => {
    nextSectionRef.current.scrollIntoView({ behavior: 'smooth' })
  }


  return (
    <div className="home-ctn">
        <div className="welcome-ctn">
          <img src={blogapp} alt="Blog Tracker App" className="welcome-logo" />
          <h1>bloggapp</h1>
        </div>
        <div className="scroll-down" onClick={scrollToNext}>
          <RiScrollToBottomLine className="scroll-arrow" size={100} />
        </div>
        <div className="content-ctn" ref={nextSectionRef}>
          <h2>Love Blogs? Get access to the most liked blogs in the world!</h2>
          <img src={fuel} alt="homepage" className="homepage-image" />
        </div>
        <div className="content-ctn">
          <img src={discover} alt="homepage" className="homepage-image" />
          <h2>Discover new blogs, share your thoughts and connect with other blog enthusiasts.</h2>
        </div>
        <div className="content-ctn">
          <h2>Smarter blogging experience with personalized recommendations and insights.</h2>
          <img src={smarter} alt="homepage" className="homepage-image" />
        </div>
        {!loggedUser ? (
          <button onClick={() => navigate('/login')}>Get Started</button>
        ) : (
          <button onClick={() => navigate('/blogs')}>View Blogs</button>
        )}
    </div>
  )
}

export default Home