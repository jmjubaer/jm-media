import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin";
import "./Login.css"
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UseAuthContext from "../../../Hooks/UseAuthContext";
import Swal from "sweetalert2";
/* eslint-disable no-undef */
const Login = () => {
    const [show,setShow] = useState(true);
    const navigate = useNavigate();
    const {singIn} = UseAuthContext();
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form?.email.value;
        const password = form?.pass.value;
        singIn(email, password)
        .then(result => {
            const user = result.user;
            if(user) {
                Swal.fire({
                    icon: 'success',
                    title: 'User Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                  })
                navigate('/')
                form.reset();
            }
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.message}`,
              })
        })
    }
    return (
        <div className="bg-white rounded-xl p-5 my-10 disc_effects_up ">
            <form onSubmit={handleLogin} className="">
                <div className="w-full flex flex-col">
                    <label className="text-xl mb-4" htmlFor="email">Email:</label>
                    <input required placeholder="Enter Your Email ...... " type="email" name="email" id="email" className="disc_effects p-3 px-5 rounded-xl outline-none"/>
                </div>
                <div className="w-full flex flex-col mt-8 relative">
                    <label className="text-xl mb-4" htmlFor="pass">Password:</label>
                    <input required placeholder="Password " type={show ? "password" : "text"} name="pass" id="pass" className="disc_effects p-3 px-5 rounded-xl outline-none"/>
                    <span onClick={() => setShow(!show)} className="text-2xl absolute right-5 bottom-3 cursor-pointer">{show ? <FaEye/> : <FaEyeSlash/>}</span>
                </div>
                <input type="submit" value="Log In" className="disc_effects_up btn w-1/2 mt-8 mx-auto block active font-bold"/>
            </form>
            <p className="text-xl font-bold mt-5">New to JM Media?
            <Link className="text-blue-700 font-medium underline ml-2" to={"/signUp"}>Create Account. </Link></p>
            <div className="divider"> or </div>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;
