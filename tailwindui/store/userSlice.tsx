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

        setEmail: (state, action) => {
            state.email = action.payload.email;
        },

        unsetUser: (state) => {
            state.uid = null;
            state.token = null;
            state.username = null;
            state.email = null;
            state.credits = 0;
            state.tier = 'FREE';
        },
    },
});

export const { setUserToken, setCredits, setTier, setUsername, setEmail, unsetUser} = userSlice.actions;

export default userSlice.reducer;
