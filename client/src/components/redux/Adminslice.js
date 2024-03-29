import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import produce from 'immer'
export const fetchData=createAsyncThunk(
    'cart/fetchData',

async()=>{
    try{
      
        const response = await axios.get("/api/product/getall")
        /*console.log(response.data)
        console.log(`Response data: ${JSON.stringify(response.data)}`);
       */ return response.data;
    }
    catch(err)
    {
      console.log(err)
    }
}
);
export const adminSlice=createSlice({
    name:"admin",
    initialState:{
        pending: false,
    fulfilled: false,
    rejected: false,
    error: null,
        items:[]
    },
    reducers:{
       
            add: (state, action) => {
                const data = action.payload.data;
                const id = data.id;
                const response = state.items.find((item) => item.id === id);
              
                if (!response) {
                  state.items.push({
                    id: data.id,
                    name: data.name,
                    category: data.category,
                    price: data.price,
                    stock: data.count,
                  });
                }
            },
            remove: (state, action) => {
              const id = action.payload.id;
          
          
              const index = state.items.findIndex((item) => item.id === id);
              if (index !== -1) {
                // use produce function to safely modify the state object
                return produce(state, (draftState) => {
                  draftState.items.splice(index, 1);
                });
              }
              // if id not found, return the original state object
              return state;
            },
        
    },


    extraReducers:(builder)=>{
      
        builder
        .addCase(fetchData.pending, (state) => {
            state.pending = true;
            state.fulfilled = false;
            state.rejected = false;
          })
          .addCase(fetchData.fulfilled, (state, action) => {
            state.pending = false;
            state.fulfilled = true;
            state.rejected = false;
            if (action.payload && action.payload.data !== undefined) {
                state.items = action.payload.data;
              } else {
              state.items = [];
             
            }
         
          })
          .addCase(fetchData.rejected, (state, action) => {
            state.pending = false;
            state.fulfilled = false;
            state.rejected = true;
            state.error = action.error.message;
          });

    }


})
export const {remove}=adminSlice.actions
export default adminSlice.reducer;