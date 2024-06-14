// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios'

// export const addToCart = createAsyncThunk(
//     "cart/addToCart",
//     async ({ productId, quantity = 1 }, thunkAPI) => {
//       try {
//         let token = localStorage.getItem("token") ?? "";
//         token = token.replace(/"/g, "");
  
//         const response = await axios.post(
//           "http://127.0.0.1:8000/api/add-to-cart",
//           {
//             product_id: productId,
//             quantity: quantity,
//           },
//           {
//             headers: {
//               Accept: "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
  
//         return response.data;
//       } catch (err) {
//         console.error("Error adding product to cart:", err.response);
//         return thunkAPI.rejectWithValue(err.response?.data?.errors || "Unknown error");
//       }
//     }
//   );

//   const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//       items: [],
//       loading: false,
//       error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//       builder
//         .addCase(addToCart.pending, (state) => {
//           state.loading = true;
//           state.error = null;
//         })
//         .addCase(addToCart.fulfilled, (state, action) => {
//           state.items.push(action.payload);
//           state.loading = false;
//         })
//         .addCase(addToCart.rejected, (state, action) => {
//           state.error = action.payload;
//           state.loading = false;
//         });
//     },
//   });
  
//   export default cartSlice.reducer;