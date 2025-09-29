import AxiosInstance from "../instance/AxiosInstance"

const trainerServices ={
registerTrainer:async(payload)=>{
    try {
        let {data}=await AxiosInstance.post("/auth/register",payload)
        console.log(data);
        return data
        
    } catch (error) {
        console.log(error);
        return error
        
    }
},
loginTrainer:async(payload)=>{

        let data=await AxiosInstance.post("/auth/login",payload)
        // console.log(data);
        return data

}
} 


export default trainerServices