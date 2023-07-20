import { Link } from 'react-router-dom';
import SocialLogin from '../SocialLogin';

const SignUp = () => {
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
                <div className="grid grid-cols-2 gap-5">
                    <div className="w-full flex flex-col">
                        <label className="text-xl mb-4" htmlFor="firstName">First Name:</label>
                        <input required placeholder="First Name ...... " type="text" name="firstName" id="firstName" className="disc_effects p-3 px-5 rounded-xl outline-none"/>
                    </div>
                    <div className="w-full flex flex-col">
                        <label className="text-xl mb-4" htmlFor="lastName">Last Name:</label>
                        <input required placeholder="Last Name ...... " type="text" name="lastName" id="lastName" className="disc_effects p-3 px-5 rounded-xl outline-none"/>
                    </div>
                </div>
                <div className="w-full flex flex-col mt-8">
                    <label className="text-xl mb-4" htmlFor="">Profile Image:</label>
                    <input required type="file" name="pImage" id="" className="disc_effects rounded-xl outline-none file-input"/>
                </div>
                {/* <div className="w-full flex flex-col mt-8">
                    <label className="text-xl mb-4" htmlFor="">Banner Image:</label>
                    <input required type="file" name="pImage" id="" className="disc_effects rounded-xl outline-none file-input"/>
                </div> */}
                <div className="w-full flex flex-col mt-8">
                    <label className="text-xl mb-4" htmlFor="email">Email:</label>
                    <input required placeholder="Enter Your Email ...... " type="email" name="email" id="email" className="disc_effects p-3 px-5 rounded-xl outline-none"/>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-8">
                    <div className="w-full flex flex-col">
                        <label className="text-xl mb-4" htmlFor="firstName">Password:</label>
                        <input required placeholder="First Name ...... " type="password" name="firstName" id="firstName" className="disc_effects p-3 px-5 rounded-xl outline-none"/>
                    </div>
                    <div className="w-full flex flex-col">
                        <label className="text-xl mb-4" htmlFor="lastName">Confirm Password:</label>
                        <input required placeholder="Last Name ...... " type="password" name="lastName" id="lastName" className="disc_effects p-3 px-5 rounded-xl outline-none"/>
                    </div>
                </div> 
                <input type="submit" value="Register" className="disc_effects_up btn w-1/2 mt-8 mx-auto block active font-bold"/>
            </form>
            <p className="text-xl font-bold mt-5">Already have an account? 
            <Link className="text-blue-700 font-medium underline ml-2" to={"/login"}>Login Now. </Link></p>
            <div className="divider"> or </div>
            <SocialLogin></SocialLogin>
        </div>
    );

};

export default SignUp;