import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import trainerServices from "../helper/trainer/trainerServices"

export let userThunk= createAsyncThunk("auth/register",async(payload,thunkAPI)=>{
try {
    console.log(payload);
    
    let data=await trainerServices.registerTrainer(payload)
    console.log(data);
    
    return data 
} catch (error) {
    
    return thunkAPI.rejectWithValue(error.message || "Something went wrong");
}
})

export let userLoginThunk= createAsyncThunk("auth/login",async(payload,thunkAPI)=>{
    try {
        // console.log(payload);
        
        let {data}=await trainerServices.loginTrainer(payload)
        console.log(data);
        
        return data 
    } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response?.data?.message);
}
})
const initialState={
    isLogged:false,
    username:null,
    email:null,
    loggedId:null,
    token:null,
    loading:false,
    error:null,
    allTrainers:[]
}

export const AuthSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        loggedUser:(state,action)=>{
            let {email,username,loggedId,token}=action.payload
            state.email=email,
            state.loggedId=loggedId,
            state.username=username,
            state.token=token,
            state.isLogged=true,
            state.allTrainers=[]
        },
        loggedOutUser:(state,action)=>{
            let {email,username,loggedId,token}=action.payload
            state.email=email,
            state.loggedId=loggedId,
            state.username=username,
            state.token=token,
            state.isLogged=true,
            state.allTrainers=[]

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(userThunk.rejected, (state, action) => {
        state.isLogged = false;
        state.loading = false;
        state.error = action.payload.response.data || "Login failed";
      }).addCase(userLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(userLoginThunk.fulfilled,(state,action)=>{
            console.log(action);
            
 const { token } = action.payload;
 const { email,id,username } = action.payload.user;
        state.email = email;
        state.loggedId = id;
        state.username = username;
        state.token = token;
        state.isLogged = true;
        state.loading = false;
        state.allTrainers=[];

        })   .addCase(userLoginThunk.rejected, (state, action) => {
        state.isLogged = false;
        state.loading = false;
        state.error =  action.payload || "Login failed";
      });
    }
})


export const {loggedUser, loggedOutUser } =AuthSlice.actions
export default AuthSlice.reducer;