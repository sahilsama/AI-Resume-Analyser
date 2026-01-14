import { Link } from "react-router"
const Navbar = () => {
  return (
    <nav className="navbar">
        <Link to="/">
        <p className="text-2xl font-bold text-gradient">AI Resume Analyser</p>
        </Link>
        
        <Link to="/upload">
        <p className=" text-white bg-black rounded-full px-4 py-2 cursor-pointer w-fit">Upload Resume</p>
        </Link>

        
    </nav>
  )
}

export default Navbar