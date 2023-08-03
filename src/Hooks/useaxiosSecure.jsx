import axios from "axios";

const axiosSecured = axios.create({
    baseURL: 'http://localhost:5000'
})
const useaxiosSecure = () => {
    return {axiosSecured}
};

export default useaxiosSecure;