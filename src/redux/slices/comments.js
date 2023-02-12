import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchComments = createAsyncThunk('posts/fetchComments', async (id) => {
  const { data } = await axios.get(`/comments/${id}`);
  return data;
});

export const fetchLastComments = createAsyncThunk('auth/fetchLastComments', async () => {
  const { data } = await axios.get('/comments');
  return data;
});

export const fetchComment = createAsyncThunk('auth/fetchComment', async (fields) => {
  const { data } = await axios.post(`/comments/${fields.postId}`, fields.params);
  return data;
});

const initialState = {
  comments: {
    items: [],
    status: 'loading',
  },
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducer: {},
  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    },
    [fetchComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = 'error';
    },

    [fetchLastComments.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = 'loading';
    },
    [fetchLastComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    },
    [fetchLastComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = 'error';
    },
  }
})

export const commentsReducer = commentsSlice.reducer;