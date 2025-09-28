import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios-instance";

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

export const walletAuth = createAsyncThunk<
  WalletAuthResponse,
  WalletAuthPayload,
  { rejectValue: string }
>("auth/walletAuth", async ({ walletAddress }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/auth/wallet/message", {
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
    const response = await axiosInstance.post(
      "/auth/wallet/verify",
      payload
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ||
        error.response?.data ||
        "Wallet verification failed"
    );
  }
});
