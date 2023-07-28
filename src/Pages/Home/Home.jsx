import AddPost from "./AddPost";
import Post from "./Post";

const Home = () => {
    return (
        <div className="content_container">
            <AddPost></AddPost>
            <Post></Post>
        </div>
    );
};

export default Home;