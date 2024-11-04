import { Link, NavLink, useNavigate } from 'react-router-dom'
import { addPost, galleryIcon, HomeIcon, Logo, LogoutIcon, PeopleIcon, saveNavIcon } from '../../assets'
import GradientShadowButton from '../Button'
import { useEffect } from 'react'
import { useUserContext } from '../../context/AuthContext'
import { useLogOutAccount } from '../../lib/react-query/queriesAndMutations'

const Navbar = () => {

    const { mutate: logOut, isSuccess } = useLogOutAccount()
    const navigate = useNavigate();
    const { user } = useUserContext()

    useEffect(() => {
        if(isSuccess) navigate(0);
    }, [isSuccess, navigate])

  return (
    <nav className="max-sm:hidden sm:hidden xl:block lg:block md:block top-0 fixed z-10 bg-[#131313] md:h-14 lg:h-20 xl:h-20 w-full text-white">
        <div className="flex items-center justify-between">
            <div className='px-4 flex items-center justify-center flex-row xl:gap-16 lg:gap-12 md:gap-5'>
              <Link to="/" className='cursor-pointer'>
                <img src={Logo} width={80} height={80} className="lg:block xl:block xl:h-[80px] xl:w-[80px] lg:h-[80px] lg:w-[80px] md:h-[40px] md:w-[40px] max-sm:h-12 max-sm:w-12" alt="Logo" />
              </Link>

              <ul className='flex items-center justify-start xl:gap-12 lg:gap-8 md:gap-3 transition-all duration-200'>
                <li>
                  <NavLink to="/" className={({isActive}) =>
                  `font-light active:bg-indigo-700 xl:text-lg lg:text-base md:text-sm flex flex-row hover:bg-indigo-400 gap-2 py-1 xl:px-4 lg:px-2 md:px-1 xl:rounded-full lg:rounded-lg md:rounded-lg ${isActive ? "bg-purple-1" : ""}`
                  }>
                  <img src={HomeIcon} width={20} height={20} className="lg:block xl:block md:hidden" alt="Home" /> Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/explore" className={({isActive}) =>
                  `font-light xl:text-lg active:bg-indigo-700 lg:text-base md:text-sm flex flex-row hover:bg-indigo-400 gap-2 py-1 xl:px-4 lg:px-2 md:px-1 xl:rounded-full lg:rounded-lg md:rounded-lg ${isActive ? "bg-purple-1" : ""}`
                  }>
                  <img src={galleryIcon} width={20} height={20} className="lg:block xl:block md:hidden" alt="Explore" /> Explore
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/all-users" className={({isActive}) =>
                  `font-light xl:text-lg active:bg-indigo-700 lg:text-base md:text-sm flex flex-row hover:bg-indigo-400 gap-2 py-1 xl:px-4 lg:px-2 md:px-1 xl:rounded-full lg:rounded-lg md:rounded-lg ${isActive ? "bg-purple-1" : ""}`
                  }>
                  <img src={PeopleIcon} width={20} height={20} className="lg:block xl:block md:hidden" alt="People" /> People
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/saved" className={({isActive}) =>
                  `font-light xl:text-lg active:bg-indigo-700 lg:text-base md:text-sm flex flex-row hover:bg-indigo-400 gap-2 py-1 xl:px-4 lg:px-2 md:px-1 xl:rounded-full lg:rounded-lg md:rounded-lg ${isActive ? "bg-purple-1" : ""}`
                  }>
                  <img src={saveNavIcon} width={20} height={20} className="lg:block xl:block md:hidden" alt="People" /> Saved
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/create-post" className={({isActive}) =>
                  `font-light xl:text-lg active:bg-indigo-700 lg:text-base md:text-sm flex flex-row hover:bg-indigo-400 gap-2 py-1 xl:px-4 lg:px-2 md:px-1 xl:rounded-full lg:rounded-lg md:rounded-lg ${isActive ? "bg-purple-1" : ""}`
                  }>
                  <img src={addPost} width={20} height={20} className="lg:block xl:block md:hidden" alt="Add Post" /> Create
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className='relative right-8 xl:px-4 lg:px-2 md:px-1 flex items-center justify-center flex-row xl:gap-12 lg:gap-8 md:gap-4'>
              <div>
                <NavLink to={`/profile/${user.id}`} className={({isActive}) =>
                `ml-5 text-wrap font-light xl:text-lg lg:text-base md:text-sm flex flex-row items-center md:py-0 gap-2 py-1 transition-all duration-200 xl:px-4 lg:px-2 md:px-1 xl:rounded-full lg:rounded-lg md:rounded-lg ${isActive ? "border bg-background-main active:bg-white/10 border-purple-1 text-purple-1 hover:bg-black hover:scale-105" : "hover:bg-black/80 hover:text-purple-1 hover:border active:bg-white/10 hover:border-purple-1"}`
                }>
                 <img
                  src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                  alt="profile"
                  className="h-8 w-8 rounded-full"
                /> 
                <div className='flex flex-col px-2'>
                  {user.name}
                  <p className='text-xs lowercase'>@{user.username}</p>
                </div>
              
                </NavLink>
              </div>
              <GradientShadowButton onClick={() => logOut()} className={`block py-2`}>
                 <h2 className='flex flex-row xl:text-lg lg:text-base md:text-sm xl:gap-4 lg:gap-2 md:gap-1'>
                  <img src={LogoutIcon} width={20} height={20} alt="Logout" />
                  Logout
                 </h2>
              </GradientShadowButton>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
