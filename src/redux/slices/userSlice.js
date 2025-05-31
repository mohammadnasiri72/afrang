import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfile } from '@/services/Auth/authService';

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (_, { getState }) => {
        const state = getState();
        const token = state.user.user?.token;

       
        
        if (!token) {
            throw new Error('No token available');
        }

        try {
            const response = await getUserProfile(token);
            return response;
        } catch (error) {
            throw error;
        }
    }
);

const initialState = {
    user: null,
    userProfile: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        updateUserFields: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        clearUser: (state) => {
            state.user = null;
            state.userProfile = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userProfile = action.payload;
                state.error = null;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { setUser, setStatus, setError, clearUser, updateUserFields } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectUserProfile = (state) => state.user.userProfile;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer; 