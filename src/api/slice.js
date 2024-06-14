import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'


const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// Async thunk to login a user

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (userCredential, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/login",
        userCredential
      );
      const admin = response.data;
      const access_token = response.data.token;
      localStorage.setItem("token", JSON.stringify(access_token));
      localStorage.setItem("admin", JSON.stringify(admin));
      return admin , access_token;
    } catch (err) {
      // Handle errors by returning a rejected promise with the error message
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userCredential, thunkAPI) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/login",
          userCredential
        );
        const user = response.data;
        const access_token = response.data.token;
        localStorage.setItem("token", JSON.stringify(access_token));
        localStorage.setItem("user", JSON.stringify(user));
        return user , access_token;
      } catch (err) {
        // Handle errors by returning a rejected promise with the error message
        return thunkAPI.rejectWithValue(err.response.data.errors);
      }
    }
  );

  export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/register",
          userData
        );
        const user = response.data;
        const access_token = response.data.token;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(access_token));

        return  user , access_token ;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.errors);
      }
    }
  );


  export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, thunkAPI) => {
      try {
        let token = localStorage.getItem("token") ?? "";
        token = token.replace(/"/g, "");
  
        console.log("Token:", token);  // Log the token for debugging
  
        const response = await axios.get("http://127.0.0.1:8000/api/profile", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("Response data:", response.data);  // Log response for debugging
  
        return response.data.user;
      } catch (err) {
        console.error("Error fetching current user:", err.response);  // Log error for debugging
  
        // Handle errors by returning a rejected promise with the error message
        return thunkAPI.rejectWithValue(err.response?.data?.errors || "Unknown error");
      }
    }
  );

// Create a user slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoading = false;
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    // Reducers for handling registration actions
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(registerUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload; // Set the error message
        state.isLoading = false;        
      });

    // Reducers for handling login actions
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload; // Set the error message
        state.isLoading = false;
      });

    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});




export default userSlice.reducer;
export const { logout } = userSlice.actions;