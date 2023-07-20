import { Link } from "react-router-dom";
import SocialLogin from "../SocialLogin";
import "./Login.css"
/* eslint-disable no-undef */
const Login = () => {
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const fullName = firstName + ' ' + lastName;
        console.log(fullName);
    }
    return (
        <div className="bg-white rounded-xl p-5 my-10 disc_effects_up ">
            <form onSubmit={handleLogin} className="">
                <div className="w-full flex flex-col">
                    <label className="text-xl mb-4" htmlFor="email">Email:</label>
                    <input required placeholder="Enter Your Email ...... " type="email" name="email" id="email" className="disc_effects p-3 px-5 rounded-xl outline-none"/>
                </div>
                <div className="w-full flex flex-col mt-8">
                    <label className="text-xl mb-4" htmlFor="firstName">Password:</label>
                    <input required placeholder="First Name ...... " type="password" name="firstName" id="firstName" className="disc_effects p-3 px-5 rounded-xl outline-none"/>
                </div>
                <input type="submit" value="Register" className="disc_effects_up btn w-1/2 mt-8 mx-auto block active font-bold"/>
            </form>
            <p className="text-xl font-bold mt-5">New to JM Media?
            <Link className="text-blue-700 font-medium underline ml-2" to={"/signUp"}>Create Account. </Link></p>
            <div className="divider"> or </div>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;
