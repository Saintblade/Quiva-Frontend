import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios-instance';

const initialState = {
    sendOtp: {
        isLoading: false,
        error: null,
        success: false,
        email: null
    },
    verifyOtp: {
        isLoading: false,
        error: null,
        success: false
    },
    user: {
        token: null,
        data: null,
        expiresAt: null,
        isAuthenticated: false
    },
    profile: {
        data: null,
        isLoading: false,
        error: null
    }
};

// Async thunk for sending OTP via email
export const sendOtpEmail = createAsyncThunk(
    'auth/sendOtpEmail',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/email/send-otp', credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 
                error.response?.data || 
                'Failed to send OTP'
            );
        }
    }
);

// Async thunk for verifying OTP
export const verifyOtpEmail = createAsyncThunk(
    'auth/verifyOtpEmail',
    async (otpData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/email/verify-otp', otpData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 
                error.response?.data || 
                'Failed to verify OTP'
            );
        }
    }
);

// Async thunk for getting user profile
export const getUserProfile = createAsyncThunk(
    'auth/getUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/auth/profile');
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 
                error.response?.data || 
                'Failed to get user profile'
            );
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Reset OTP states
        resetOtpStates: (state) => {
            state.sendOtp = {
                isLoading: false,
                error: null,
                success: false,
                email: null
            };
            state.verifyOtp = {
                isLoading: false,
                error: null,
                success: false
            };
        },
        
        // Set token manually (if needed)
        setToken: (state, action) => {
            const { token, expiresAt, user } = action.payload;
            state.user.token = token;
            state.user.expiresAt = expiresAt;
            state.user.data = user;
            state.user.isAuthenticated = true;
        },
        
        // Logout user
        logout: (state) => {
            state.user = {
                token: null,
                data: null,
                expiresAt: null,
                isAuthenticated: false
            };
            state.profile.data = null;
            // Clear localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('userData');
                localStorage.removeItem('token');
            }
        },
        
        // Clear errors
        clearErrors: (state) => {
            state.sendOtp.error = null;
            state.verifyOtp.error = null;
            state.profile.error = null;
        }
    },
    extraReducers: (builder) => {
        // Send OTP Email
        builder
            .addCase(sendOtpEmail.pending, (state) => {
                state.sendOtp.isLoading = true;
                state.sendOtp.error = null;
                state.sendOtp.success = false;
            })
            .addCase(sendOtpEmail.fulfilled, (state, action) => {
                state.sendOtp.isLoading = false;
                state.sendOtp.success = true;
                state.sendOtp.email = action.meta.arg.email; // Store the email used
            })
            .addCase(sendOtpEmail.rejected, (state, action) => {
                state.sendOtp.isLoading = false;
                state.sendOtp.error = action.payload;
                state.sendOtp.success = false;
            });

        // Verify OTP Email
        builder
            .addCase(verifyOtpEmail.pending, (state) => {
                state.verifyOtp.isLoading = true;
                state.verifyOtp.error = null;
                state.verifyOtp.success = false;
            })
            .addCase(verifyOtpEmail.fulfilled, (state, action) => {
                state.verifyOtp.isLoading = false;
                state.verifyOtp.success = true;
                
                // Set user data if verification includes auth data
                if (action.payload.token) {
                    state.user.token = action.payload.token;
                    state.user.data = action.payload.user;
                    state.user.isAuthenticated = true;
                    
                    // Store in localStorage
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('userData', JSON.stringify(action.payload));
                        localStorage.setItem('token', action.payload.token);
                    }
                }
            })
            .addCase(verifyOtpEmail.rejected, (state, action) => {
                state.verifyOtp.isLoading = false;
                state.verifyOtp.error = action.payload;
                state.verifyOtp.success = false;
            });

        // Get User Profile
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.profile.isLoading = true;
                state.profile.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.profile.isLoading = false;
                state.profile.data = action.payload.data;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.profile.isLoading = false;
                state.profile.error = action.payload;
            });
    }
});

export const { 
    resetOtpStates, 
    setToken, 
    logout, 
    clearErrors 
} = authSlice.actions;

export default authSlice.reducer;