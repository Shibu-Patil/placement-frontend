import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import trainerServices from "../helper/trainer/trainerServices"
import toast from "react-hot-toast"

export const userThunk = createAsyncThunk(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      const { data } = await trainerServices.registerTrainer(payload)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      )
    }
  }
)

export const userLoginThunk = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const { data } = await trainerServices.loginTrainer(payload)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      )
    }
  }
)

export const getAllTrainersThunk = createAsyncThunk(
  "trainers/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await trainerServices.getAllTrainer()
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch trainers"
      )
    }
  }
)

export const addTrainerThunk=createAsyncThunk("addTrainer",async(payload,thunkAPI)=>{
    try {
        let {data}=await trainerServices.addTrainer(payload)
        console.log(data);
        return data
        
    } catch (error) {
       return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add trainers"
      ) 
    }
})

export const addGroomingThunk=createAsyncThunk("addGrooming",async(payload,thunkAPI)=>{
    try {
        let {data}=await trainerServices.addGrooming(payload)
        console.log(data);
        return data
        
    } catch (error) {
       return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add trainers"
      ) 
    }
})

export const allGroomingThunk=createAsyncThunk("allGrooming",async(_,thunkAPI)=>{
    try {
        let {data}=await trainerServices.getAllGrooming()
        // console.log(data);
        return data
        
    } catch (error) {
       return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add trainers"
      ) 
    }
})

export const updateGroomingThunk=createAsyncThunk("updateGrooming",async(payload,thunkAPI)=>{
    try {
      const { id, ...rest } = payload;
      const {data} = await trainerServices.updateGrooming(rest, id);
      console.log(data);
      return data;
    } catch (error) {
       return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add trainers"
      ) 
    }
})

export const deleteGroomingThunk=createAsyncThunk("deleteGrooming",async(payload,thunkAPI)=>{
    try {
      const {data} = await trainerServices.deleteGrooming(payload);
      console.log(data);
      return data;
    } catch (error) {
       return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add trainers"
      ) 
    }
})

const initialState = {
  isLogged: false,
  username: null,
  email: null,
  loggedId: null,
  token: null,
  loading: false,
  error: null,
  allTrainers: [],
  isTrainersPresent: true,
  allGrooming:[]
}

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedUser: (state, action) => {
      const { email, username, loggedId, token } = action.payload
      state.email = email
      state.loggedId = loggedId
      state.username = username
      state.token = token
      state.isLogged = true
    },
    loggedOutUser: (state) => {
      state.email = null
      state.loggedId = null
      state.username = null
      state.token = null
      state.isLogged = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(userThunk.rejected, (state, action) => {
        state.isLogged = false
        state.loading = false
        state.error = action.payload || "Registration failed"
      })
      .addCase(userLoginThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userLoginThunk.fulfilled, (state, action) => {
        const { token, user } = action.payload
        state.email = user?.email
        state.loggedId = user?.id
        state.username = user?.username
        state.token = token
        state.isLogged = true
        state.loading = false
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.isLogged = false
        state.loading = false
        state.error = action.payload || "Login failed"
      })
      .addCase(getAllTrainersThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllTrainersThunk.fulfilled, (state, action) => {
        state.allTrainers = action.payload
        state.isTrainersPresent = action.payload?.length > 0
        state.loading = false
      })
      .addCase(getAllTrainersThunk.rejected, (state, action) => {
        state.allTrainers = []
        state.isTrainersPresent = false
        state.loading = false
        state.error = action.payload
      })
            .addCase(addTrainerThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addTrainerThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        // console.log(state.allTrainers);
        
        state.allTrainers = [...state.allTrainers,action.payload.trainer]
        state.isTrainersPresent = action.payload?.length > 0
        state.loading = false
      })
      .addCase(addTrainerThunk.rejected, (state, action) => {
        state.allTrainers = state.allTrainers
        state.isTrainersPresent = false
        state.loading = false
        state.error = action.payload
      }) .addCase(allGroomingThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(allGroomingThunk.fulfilled, (state, action) => {
        state.allGrooming = action.payload
        state.loading = false
      })
      .addCase(allGroomingThunk.rejected, (state, action) => {
        state.allGrooming = []
        state.loading = false
        state.error = action.payload
      }).addCase(addGroomingThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addGroomingThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        // console.log(state.allTrainers);
        
        state.allGrooming = [...state.allGrooming,action.payload.grooming]
        state.loading = false
        toast.success(action.payload.msg)
      })
      .addCase(addGroomingThunk.rejected, (state, action) => {
        state.allGrooming = state.allGrooming
        state.loading = false
        state.error = action.payload
      }).addCase(updateGroomingThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateGroomingThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        // console.log(state.allTrainers);
        
        state.allGrooming = [...state.allGrooming.filter((val)=>val._id!=action.payload.grooming._id),action.payload.grooming]
        state.loading = false
        toast.success(action.payload.msg)
      })
      .addCase(updateGroomingThunk.rejected, (state, action) => {
        state.allGrooming = state.allGrooming
        state.loading = false
        state.error = action.payload
      }).addCase(deleteGroomingThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteGroomingThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        // console.log(state.allTrainers);
        
        state.allGrooming = state.allGrooming.filter((val)=>val._id!=action.payload.grooming._id)
        state.loading = false
        toast.success(action.payload.msg)
      })
      .addCase(deleteGroomingThunk.rejected, (state, action) => {
        state.allGrooming = state.allGrooming
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { loggedUser, loggedOutUser } = AuthSlice.actions
export default AuthSlice.reducer
