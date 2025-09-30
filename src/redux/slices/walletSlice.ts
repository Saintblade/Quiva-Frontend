import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios-instance";

// Types
interface WalletAuthResponse {
  message: string;
}

interface WalletVerifyResponse {
  token: string;
  user: any;
}

interface WalletAuthPayload {
  walletAddress: `0x${string}`;
}

interface WalletVerifyPayload {
  walletAddress: `0x${string}`;
  message: string;
  signature: `0x${string}`;
}

interface WalletAuthState {
  isLoading: boolean;
  isVerifying: boolean;
  error: string | null;
  message: string | null;
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  walletAddress: `0x${string}` | null;
}

// Initial state
const initialState: WalletAuthState = {
  isLoading: false,
  isVerifying: false,
  error: null,
  message: null,
  token: null,
  user: null,
  isAuthenticated: false,
  walletAddress: null,
};

// Async thunks
export const walletAuth = createAsyncThunk<
  WalletAuthResponse,
  WalletAuthPayload,
  { rejectValue: string }
>("auth/walletAuth", async ({ walletAddress }, { rejectWithValue }) => {
  try {
    console.log(walletAddress);
    console.log("I am in slice");
    const response = await axiosInstance.post("/wallet/message", {
      walletAddress,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ||
        error.response?.data ||
        "Failed to get wallet message"
    );
  }
});

export const walletVerifyAuth = createAsyncThunk<
  WalletVerifyResponse,
  WalletVerifyPayload,
  { rejectValue: string }
>("auth/walletVerifyAuth", async (payload, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/wallet/verify", payload);
    console.log(`Wallet verification response: ${JSON.stringify(response.data)}`);
    
    // Store token in localStorage if needed
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ||
        error.response?.data ||
        "Wallet verification failed"
    );
  }
});

const walletAuthSlice = createSlice({
  name: "walletAuth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.walletAddress = null;
      state.message = null;
      state.error = null;
      localStorage.removeItem('authToken');
    },
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Wallet Auth (Get Message)
    builder
      .addCase(walletAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(walletAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(walletAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to get wallet message";
      });

    // Wallet Verify Auth
    builder
      .addCase(walletVerifyAuth.pending, (state) => {
        state.isVerifying = true;
        state.error = null;
      })
      .addCase(walletVerifyAuth.fulfilled, (state, action) => {
        state.isVerifying = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(walletVerifyAuth.rejected, (state, action) => {
        state.isVerifying = false;
        state.error = action.payload || "Wallet verification failed";
        state.isAuthenticated = false;
      });
  },
});

// Actions
export const { clearError, clearMessage, logout, setWalletAddress } = walletAuthSlice.actions;

// Selectors
export const selectWalletAuth = (state: { walletAuth: WalletAuthState }) => state.walletAuth;
export const selectIsAuthenticated = (state: { walletAuth: WalletAuthState }) => state.walletAuth.isAuthenticated;
export const selectUser = (state: { walletAuth: WalletAuthState }) => state.walletAuth.user;
export const selectWalletAddress = (state: { walletAuth: WalletAuthState }) => state.walletAuth.walletAddress;

// Reducer
export default walletAuthSlice.reducer;