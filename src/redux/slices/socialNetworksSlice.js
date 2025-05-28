import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    socialNetworks: [],
};

const socialNetworksSlice = createSlice({
    name: 'socialNetworks',
    initialState,
    reducers: {
        setSocialNetworks: (state, action) => {
            state.socialNetworks = action.payload;
        },
        clearSocialNetworks: (state) => {
            state.socialNetworks = [];
        },
    },
});

export const { setSocialNetworks, clearSocialNetworks } = socialNetworksSlice.actions;
export default socialNetworksSlice.reducer; 