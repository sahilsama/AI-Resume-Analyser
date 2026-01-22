import { Link } from "react-router"
const Navbar = () => {
  return (
    
    <nav className=" flex flex-row justify-between items-cente rounded border p-4 w-full max-w-[1200px] mx-auto">
        <Link to="/">
        <p className="underline-animate text-2xl font-bold text-amber-300 font-modern-antiqua mt-1">AI Resume Analyser</p>
        </Link>

        <Link to="/docs">
        <p className="underline-animate text-2xl font-light font-roboto-slab text-white mt-1">Docs</p>
        </Link>
        
        <Link to="/upload">
        <p className="border-1 border-black hover:bg-blue-700 text-white bg-blue-500 rounded px-4 py-2 cursor-pointer w-fit">Upload Resume</p>
        </Link>
        
    </nav>
  )
}

export default Navbar