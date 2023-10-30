import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uid: null,
    token: null,
    username: null,
    email: null,
    credits: 0,
    tier: 'FREE'
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserToken: (state, action) => {
            state.uid = action.payload.uid;
            state.token = action.payload.token;
        },

        setCredits: (state, action) => {
            state.credits = action.payload.credits;
        },

        setTier: (state, action) => {
            state.tier = action.payload.tier;
        },

        setUsername: (state, action) => {
            state.username = action.payload.username;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
