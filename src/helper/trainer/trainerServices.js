import AxiosInstance from "../instance/AxiosInstance"

const trainerServices ={
registerTrainer:async(payload)=>{
 
        let {data}=await AxiosInstance.post("/auth/register",payload)
        console.log(data);
        return data
  
},
loginTrainer:async(payload)=>{

        let data=await AxiosInstance.post("/auth/login",payload)
        // console.log(data);
        return data

},
addGrooming:async(payload)=>{

        let data=await AxiosInstance.post("/groomings",payload)
        // console.log(data);
        return data

},getAllGrooming:async()=>{

        let data=await AxiosInstance.get("/groomings")
        // console.log(data);
        return data

},
getAllTrainer:async()=>{

        let data=await AxiosInstance.get("/trainers")
        // console.log(data);
        return data

},
addTrainer:async(payload)=>{

        let data=await AxiosInstance.post("/trainers",payload)
        // console.log(data);
        return data

}
} 


export default trainerServices