import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
const SignUp = () => {
    const { register, handleSubmit,reset } = useForm();
    const { createUser } = useContext(AuthContext);
    const hostingUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_KEY
    }`;
    const navigate = useNavigate();
    const handleSingUp = (data) => {
        const fullName = data?.firstName + " " + data?.lastName;
        const formData = new FormData();
        formData.append("image", data?.image[0]);
        if (data?.pass === data?.confirmPass) {
            fetch(hostingUrl, {
                method: "POST",
                body: formData,
            })
                .then((res) => res.json())
                .then((imgRes) => {
                    if (imgRes.success) {
                        console.log(imgRes?.data?.display_url);
                        createUser(data?.email,data?.pass)
                        .then(result => {
                            const user = result.user;
                            if(user){
                                updateProfile(user,{
                                    displayName: fullName,
                                    photoURL: imgRes?.data?.display_url
                                })
                                .then(() =>{
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Sign UP success',
                                        showConfirmButton: false,
                                        timer: 1500
                                      })
                                      reset()
                                      navigate('/')
                                })  
                            }
                        })
                        .catch(err => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: `${err.message}`
                              })
                        })
                    }
                });
        } else {
            toast("Password does not match");
        }
    };
    return (
        <div className="bg-white rounded-xl p-5 my-10 disc_effects_up ">
            <form onSubmit={handleSubmit(handleSingUp)} className="">
                <div className="grid grid-cols-2 gap-5">
                    <div className="w-full flex flex-col">
                        <label className="text-xl mb-4" htmlFor="firstName">
                            First Name:
                        </label>
                        <input
                            required
                            placeholder="First Name ...... "
                            type="text"
                            {...register("firstName")}
                            id="firstName"
                            className="disc_effects p-3 px-5 rounded-xl outline-none"
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label className="text-xl mb-4" htmlFor="lastName">
                            Last Name:
                        </label>
                        <input
                            required
                            placeholder="Last Name ...... "
                            type="text"
                            {...register("lastName")}
                            id="lastName"
                            className="disc_effects p-3 px-5 rounded-xl outline-none"
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col mt-8">
                    <label className="text-xl mb-4" htmlFor="">
                        Profile Image:
                    </label>
                    <input
                        required
                        type="file"
                        {...register("image")}
                        id=""
                        className="disc_effects rounded-xl outline-none file-input"
                    />
                </div>
                {/* <div className="w-full flex flex-col mt-8">
                    <label className="text-xl mb-4" htmlFor="">Banner Image:</label>
                    <input required type="file" {...register("bannerImage")} id="" className="disc_effects rounded-xl outline-none file-input"/>
                </div> */}
                <div className="w-full flex flex-col mt-8">
                    <label className="text-xl mb-4" htmlFor="email">
                        Email:
                    </label>
                    <input
                        required
                        placeholder="Enter Your Email ...... "
                        type="email"
                        {...register("email")}
                        id="email"
                        className="disc_effects p-3 px-5 rounded-xl outline-none"
                    />
                </div>
                <div className="grid grid-cols-2 gap-5 mt-8">
                    <div className="w-full flex flex-col">
                        <label className="text-xl mb-4" htmlFor="pass">
                            Password:
                        </label>
                        <input
                            required
                            placeholder="First Name ...... "
                            type="password"
                            {...register("pass")}
                            id="pass"
                            className="disc_effects p-3 px-5 rounded-xl outline-none"
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label className="text-xl mb-4" htmlFor="cPass">
                            Confirm Password:
                        </label>
                        <input
                            required
                            placeholder="Last Name ...... "
                            type="password"
                            {...register("confirmPass")}
                            id="cPass"
                            className="disc_effects p-3 px-5 rounded-xl outline-none"
                        />
                    </div>
                </div>
                <input
                    type="submit"
                    value="Sign Up"
                    className="disc_effects_up btn w-1/2 mt-8 mx-auto block active font-bold"
                />
            </form>
            <p className="text-xl font-bold mt-5">
                Already have an account?
                <Link
                    className="text-blue-700 font-medium underline ml-2"
                    to={"/login"}
                >
                    Login Now.{" "}
                </Link>
            </p>
            <div className="divider"> or </div>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default SignUp;
