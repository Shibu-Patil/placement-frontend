// features/graph/graphSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import trainerServices from "../helper/trainer/trainerServices";


// Fetch graph data from backend
export const fetchGraphData = createAsyncThunk(
  "graph/fetchGraphData",
  async (_, thunkAPI) => {
    try {
      const {data} = await trainerServices.graphData()// /api/graph?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
      console.log(data);
      
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.msg || "Failed to fetch graph data");
    }
  }
);

const graphSlice = createSlice({
  name: "graph",
  initialState: {
    loading: false,
    overall: {},
    monthWise: {},
    allGroomings: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGraphData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGraphData.fulfilled, (state, action) => {
        console.log(action);
        
        state.loading = false;
        state.overall = action.payload.overall;
        state.monthWise = action.payload.monthWise;
        state.allGroomings = action.payload.allGroomings;
      })
      .addCase(fetchGraphData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default graphSlice.reducer;
