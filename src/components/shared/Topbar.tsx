import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Logo, purpleLogout } from '../../assets'
import { useLogOutAccount } from '../../lib/react-query/queriesAndMutations'
import { useUserContext } from '../../context/AuthContext'

const Topbar = () => {
    const { mutate: logOut, isSuccess } = useLogOutAccount()
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
    if(isSuccess) navigate(0);
    }, [isSuccess, navigate])

  return (
    <div className="sticky top-0 z-50 md:hidden min-md:hidden max-sm:block text-white h-16 bg-[#131313] w-full">
        <div className="relative flex items-center justify-between flex-row py-1">
            <div className="flex items-center justify-start gap-2 ml-3">
                <img src={Logo} height={60} width={60} alt="Logo" className="" />
            </div>
            <div className="flex items-center justify-center gap-6 mr-3 h-10">

                <button onClick={() => logOut()} className={``}>
                    <img src={purpleLogout} width={30} height={30} className="" alt="Logout" />
                </button>

                <NavLink to={`/profile/${user.id}`} className={({isActive}) =>
                `flex flex-row justify-center items-center px-1 py-1 transition-all rounded-full duration-200 ${isActive ? "border bg-background-main active:bg-white/10 border-purple-1 text-purple-1" : "active:bg-white/10"}`
                }>
                    <img
                    src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                    alt="avatar"
                    className="h-8 w-8 rounded-full"
                    /> 
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default Topbar
