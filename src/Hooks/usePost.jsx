import { useQuery } from "@tanstack/react-query";
import useaxiosSecure from "./useaxiosSecure";
import UseAuthContext from "./UseAuthContext";

const usePost = () => {
    const {axiosSecured} = useaxiosSecure();
    const {user,loading} = UseAuthContext();
    const {data: post, loading: postLoading,refetch: postRefetch} = useQuery({
        queryKey: ["post", user?.email],
        enabled: !loading,
        queryFn: async() => {
            if(user?.email){
                const res =await axiosSecured('/post');
                return res.data;
            }
        }
    })
    return {post,postLoading,postRefetch}
};

export default usePost;