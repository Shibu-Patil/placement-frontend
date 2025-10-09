import axios from "axios";
const BASEURL="http://192.168.0.46:5000/api"
let AxiosInstance=axios.create({
    baseURL:BASEURL
})

export default AxiosInstance