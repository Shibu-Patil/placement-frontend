import axios from "axios";
const BASEURL="http://localhost:5000/api"
let AxiosInstance=axios.create({
    baseURL:BASEURL
})

export default AxiosInstance