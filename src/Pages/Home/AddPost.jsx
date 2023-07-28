import UseAuthContext from "../../Hooks/UseAuthContext";
import frame from "./../../assets/photo-frame.png"
const AddPost = () => {
    const {user} = UseAuthContext();
    return (
        <section className="bg-white p-3 my-5 rounded-lg shadow-2xl flex items-center justify-between">
            <button className="w-[10%]">
                <img src={user?.photoURL} alt="" className="w-14 h-1/4 rounded-full"/>
            </button>
            <button className="w-[80%] text-xl font-mono bg-gray-200 py-2 px-5 text-left rounded-3xl">Express your feelings!</button>
            <button className="w-fit">
                <img src={frame} alt="" />
            </button>
        </section>
    );
};

export default AddPost;