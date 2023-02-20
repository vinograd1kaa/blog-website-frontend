import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async id => {
    const { data } = await axios.get(`/comments/${id}`)
    return data
  }
)

export const fetchLastComments = createAsyncThunk(
  'auth/fetchLastComments',
  async () => {
    const { data } = await axios.get('/comments')
    return data
  }
)

export const fetchComment = createAsyncThunk(
  'auth/fetchComment',
  async fields => {
    const { data } = await axios.post(
      `/comments/${fields.postId}`,
      fields.params
    )
    return data
  }
)

export const fetchUpdateComment = createAsyncThunk(
  'auth/fetchUpdateComment',
  async fields => {
    const { data } = await axios.patch(`/comments/${fields.id}`, {
      value: fields.value
    })
    return data
  }
)

export const fetchRemoveComment = createAsyncThunk(
  'auth/fetchDeleteComment',
  async id => {
    await axios.delete(`/comments/${id}`)
  }
)

const initialState = {
  comments: {
    items: [],
    status: 'loading'
  }
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducer: {},
  extraReducers: {
    [fetchComments.pending]: state => {
      state.comments.items = []
      state.comments.status = 'loading'
    },
    [fetchComments.fulfilled]: (state, action) => {
      console.log(action)
      state.comments.items = action.payload
      state.comments.status = 'loaded'
    },
    [fetchComments.rejected]: state => {
      state.comments.items = []
      state.comments.status = 'error'
    },

    [fetchLastComments.pending]: state => {
      state.comments.items = []
      state.comments.status = 'loading'
    },
    [fetchLastComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload
      state.comments.status = 'loaded'
    },
    [fetchLastComments.rejected]: state => {
      state.comments.items = []
      state.comments.status = 'error'
    },
    [fetchLastComments.rejected]: state => {
      state.comments.items = []
      state.comments.status = 'error'
    },

    [fetchUpdateComment.pending]: (state, action) => {
      const payload = action.meta.arg
      state.comments.items.find(item => item._id === payload.id).comment =
        payload.value
    },

    [fetchRemoveComment.pending]: (state, action) => {
      state.comments.items.filter(item => item._id !== action.meta.arg)
    },

    [fetchComment.pending]: (state, action) => {
      console.log(action)
      state.comments.items = [
        ...state.comments.items,
        { ...action.meta.arg.params, postId: action.meta.arg.postId }
      ]
    }
  }
})

export const commentsReducer = commentsSlice.reducer
