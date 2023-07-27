import { Link, NavLink } from "react-router-dom";
import logo from "./../assets/JMMedia-logo.jpg";
import UseAuthContext from "../Hooks/UseAuthContext";
import { ImExit } from "react-icons/im";
import { useState } from "react";

const Navbar = () => {
    const { user, logOut } = UseAuthContext();
    const [control, setControl] = useState(false);
    return (
        <div className="bg-white">
            <nav className="flex justify-between items-center py-1 jm_container">
                <div className="text-4xl">
                    <Link to="/">
                        <img className="w-44" src={logo} alt="" />
                    </Link>
                </div>

                <ul className="flex flex-col lg:flex-row gap-3 lg:gap-x-7">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-blue-e" : ""
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "text-blue-e" : ""
                            }
                            to="/statistics"
                        >
                            Statistics
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "text-blue-e" : ""
                            }
                            to="/applied"
                        >
                            Applied Jobs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "text-blue-e" : ""
                            }
                            to="/blogs"
                        >
                            Blog
                        </NavLink>
                    </li>
                </ul>

                {user ? (
                    <div className="relative">
                        <button onClick={() => setControl(!control)}>
                            <img
                                className="w-14 h-14 rounded-full object-cover border-2"
                                src={user?.photoURL}
                                alt="Profile Image"
                            />
                        </button>
                        <div
                            className={`bg-white absolute top-[65px] right-0 w-60 p-3 rounded-xl shadow-xl border ${
                                control ? "block" : "hidden"
                            }`}
                        >
                            <ul>
                                <li>
                                    <Link className="flex items-center gap-5">
                                        <img
                                            className="w-11 h-11 rounded-full object-cover border-2"
                                            src={user?.photoURL}
                                            alt="Profile Image"
                                        />
                                        <span className="text-xl font-medium">
                                            {user?.displayName}
                                        </span>
                                    </Link>
                                </li>
                                <li className="mt-4">
                                    <button
                                        onClick={logOut}
                                        className="flex gap-4 text-xl font-medium items-center"
                                    >
                                        <div className="bg-[#ddd] w-11 h-11 rounded-full flex items-center justify-center ">
                                            <ImExit className="text-2xl" />
                                        </div>
                                        <span>Log Out</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <Link to={"/login"}>
                        <button className="btn bg-[#014A97] text-white mt-10 lg:mt-0">
                            Login
                        </button>
                    </Link>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
