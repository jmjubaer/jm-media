import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const UseAuthContext = () => {
    const auth = useContext(AuthContext)
    return auth;
};

export default UseAuthContext;