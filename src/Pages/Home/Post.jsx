import UseAuthContext from "../../Hooks/UseAuthContext";
import img1 from "./../../assets/IMG_20211202_144319.jpg"
import { BsThreeDots } from "react-icons/bs";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
const Post = () => {
    const {user} = UseAuthContext();
    return (
        <>
            <div className="bg-white my-4 rounded-lg shadow-xl">
                <div className="flex justify-between items-center p-3">
                    <div className="flex gap-4 items-center">
                        <img className="w-14 h-14 object-cover rounded-full" src={user?.photoURL} alt="" />
                        <div className="">
                            <h3 className="text-xl font-medium">{user?.displayName}</h3>
                            <span className="text-sm">2d ago</span>
                        </div>
                    </div>
                    <div className="">
                        <button className="text-3xl"><BsThreeDots/></button>
                    </div>
                </div>
                <div className="p-3 text-lg">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam laborum soluta omnis? Ut omnis explicabo, nulla provident necessitatibus soluta corporis veniam dignissimos minima, tempore nam et, illo dolorum autem ab!</p>
                </div>
                <div className=" overflow-hidden h-[80vh]">
                    <img src={img1} className="object-cover h-full w-full" alt="" />
                </div>
                <div className="border-x flex justify-around py-3">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <FaRegHeart className="text-3xl"/>
                        <span className="text-xl font-medium">Love</span>
                    </div>
                    <div className="flex items-center gap-3 cursor-pointer">
                        <FaRegComment className="text-3xl"/>
                        <span className="text-xl font-medium">Comment</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;