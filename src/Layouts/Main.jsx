import { Outlet } from "react-router-dom";
import Navbar from "../SheredPages/Navbar";

const Main = () => {
    return (
        <div className="bg-[#edf1f4] overflow-hidden">
            <Navbar></Navbar>
            <div className="content_container min-h-[calc(100vh-50px)] ">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;