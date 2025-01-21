import { Navigate, Outlet } from "react-router-dom";
import { LoginImg } from "../assets";
import Footer from "../components/Footer";
import { useUserContext } from "../context/AuthContext";

const AuthLayout = () => {
    const { isAuthenticated } = useUserContext();
  return (
    <>
        {isAuthenticated ? (
            <Navigate to="/" />
        ) : (
            <>
                <section className="relative flex flex-1 justify-center items-center flex-col py-10 bg-background-main">
                    <Outlet />
                    <Footer />
                </section>

                <img src={LoginImg} alt="Login Image" className="hidden xl:block lg:block h-screen w-1/2 object-cover bg-no-repeat" />
            </>
        )}
    </>
  )
}

export default AuthLayout
