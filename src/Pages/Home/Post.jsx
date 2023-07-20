import img1 from "./../../assets/IMG_20211202_144319.jpg"
const Post = () => {
    return (
        <div className="">
            <div className="">
                <div className=" overflow-hidden h-[80vh] rounded-xl">
                    <img src={img1} className="object-cover h-full w-full" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Post;