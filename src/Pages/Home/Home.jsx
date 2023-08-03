import UseAuthContext from "../../Hooks/UseAuthContext";
import AddPost from "./AddPost";
import Post from "./Post";

const Home = () => {
    const {user} = UseAuthContext();
    return (
        <div className="content_container">
            {user && <AddPost></AddPost>}
            <Post></Post>
        </div>
    );
};

export default Home;