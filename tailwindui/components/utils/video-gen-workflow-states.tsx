import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoGenWorkflowState {
  topic: string;
  requirements: string;
  audience: string;
  outlines: string;
}

const initialState: VideoGenWorkflowState = {
  topic: '',
  requirements: '',
  audience: '',
  outlines: '',
};

const videoGenWorkflowStateSlice = createSlice({
  name: 'videoGenWorkflowState',
  initialState,
  reducers: {
    setTopic: (state, action: PayloadAction<string>) => {
      state.topic = action.payload;
    },
    setRequirements: (state, action: PayloadAction<string>) => {
      state.requirements = action.payload;
    },
    setAudience: (state, action: PayloadAction<string>) => {
      state.audience = action.payload;
    },
    setOutlines: (state, action: PayloadAction<string>) => {
      state.outlines = action.payload;
    },
  },
});

export const { setTopic, setRequirements, setAudience, setOutlines } = videoGenWorkflowStateSlice.actions;
export default videoGenWorkflowStateSlice.reducer;
