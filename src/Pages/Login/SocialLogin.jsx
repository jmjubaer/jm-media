import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
    return (
        <div className="">
        <button className="flex items-center gap-3 disc_effects_up p-3 px-8 w-1/2 font-bold text-center mx-auto justify-center text-red-500 active rounded-xl"><FaGoogle className="text-2xl"/><span>Google</span></button>
    </div>
    );
};

export default SocialLogin;