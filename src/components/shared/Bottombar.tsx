import { NavLink } from 'react-router-dom'
import { purpleAddPost, purpleGallery, purpleHome, purpleSaved } from '../../assets'

const Bottombar = () => {
  return (
    <div className="sticky z-10 bottom-0 md:hidden min-md:hidden sm:block text-white h-20 bg-[#131313] w-full">
      <ul className="relative flex items-center justify-evenly w-full h-full">
        <li className="h-full w-1/4">
          <NavLink to="/" className={({isActive}) =>
          `flex items-center justify-center flex-col w-full h-full ${isActive ? "bg-white/20" : ""}`}>
            <img src={purpleHome} height={30} width={30} alt="HomeIcon" />
            <p>Home</p>
          </NavLink>
        </li>
        <li className="h-full w-1/4">
          <NavLink to="/explore" className={({isActive}) =>
          `flex items-center justify-center flex-col w-full h-full ${isActive ? "bg-white/20" : ""}`}>
            <img src={purpleGallery} height={30} width={30} alt="Explore" />
            <p>Explore</p>
          </NavLink>
        </li>
        <li className="h-full w-1/4">
          <NavLink to="/saved" className={({isActive}) =>
          `flex items-center justify-center flex-col w-full h-full ${isActive ? "bg-white/20" : ""}`}>
            <img src={purpleSaved} height={30} width={30} alt="Saved" />
            <p>Saved</p>
          </NavLink>
        </li>
        <li className="h-full w-1/4">
          <NavLink to="/create-post" className={({isActive}) =>
          `flex items-center justify-center flex-col w-full h-full ${isActive ? "bg-white/20" : ""}`}>
            <img src={purpleAddPost} height={30} width={30} alt="AddPost" />
            <p>Create</p>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Bottombar
