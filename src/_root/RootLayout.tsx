import { Outlet } from "react-router-dom"
import Topbar from "../components/shared/Topbar"
import Bottombar from "../components/shared/Bottombar"
import Navbar from "../components/shared/Navbar"

const RootLayout = () => {
  return (
    <div className="relative min-h-screen my-auto w-full md:flex flex flex-col bg-[#070707]">
      <Topbar />
      <Navbar />

      <section className="relative flex h-full justify-start w-full items-center flex-row">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  )
}

export default RootLayout

