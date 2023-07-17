import { Outlet } from "react-router-dom";
import Navbar from "../SheredPages/Navbar";

const Main = () => {
    return (
        <div className="">
            <Navbar></Navbar>
            <div className="jm_container min-h-screen">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;