// import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import { FaBars,FaTimes } from 'react-icons/fa';
import logo from "./../assets/JMMedia-logo.jpg"

const Navbar = () => {
    // const [open, setOpen] = useState(false);
    return (
        <div className="bg-white">
            <nav className='flex justify-between items-center py-1 jm_container'>
                <div className='text-4xl'>
                    <Link to="/">
                        <img className="w-44" src={logo} alt="" />
                    </Link>
                </div>

                {/* <div className={`jm_nav ${open ? "w-4/5 md:w-1/2 p-5" : "w-0"}`}> */}
                {/* </div> */}
                <ul className='flex flex-col lg:flex-row gap-3 lg:gap-x-7'>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "text-blue-e" : "" }>Home</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? "text-blue-e" : "" } to="/statistics">Statistics</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? "text-blue-e" : "" } to="/applied">Applied Jobs</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? "text-blue-e" : "" } to="/blogs">Blog</NavLink></li>
                </ul>
                <Link to={"/login"}>                    
                    <button className='btn bg-[#014A97] text-white mt-10 lg:mt-0'>Login</button>
                </Link>
                {/* <button onClick={() => setOpen(!open)} className='block lg:hidden'>{open ? <FaTimes/> : <FaBars/>}</button> */}
            </nav>
        </div>
    );
};

export default Navbar;
