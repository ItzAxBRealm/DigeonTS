const Footer = () => {
    return (
      <div className="absolute bottom-0 w-full h-8 font-normal text-lg text-black bg-primary-dark">
              <ul className="flex items-center justify-evenly gap-5 px-5 py-1">
                  <li className="hover:underline"><a href="">About</a></li>
                  <li className="hover:underline"><a href="">Help Center</a></li>
                  <li className="hover:underline"><a href="">Terms of Services</a></li>
                  <li className="hover:underline"><a href="">Privacy Policy</a></li>
                  <li className="hover:underline"><a href="">Contact us</a></li>
                  <li className="hover:underline"><a href="">Developers</a></li>
                  <li><p>&#169; 2024</p></li>
              </ul>
      </div>
    )
  }
  
  export default Footer
  