import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  id: string;
  caption: string;
  image: string;
  likes: number;
  timestamp: string;
  isLiked: boolean;
}

interface PostsState {
  items: Post[];
  isSubmitting: boolean;
  imagePreview: string | null;
  caption: string;
}

const initialState: PostsState = {
  items: JSON.parse(localStorage.getItem('posts') || '[]'),
  isSubmitting: false,
  imagePreview: null,
  caption: ''
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setImagePreview: (state, action: PayloadAction<string | null>) => {
      state.imagePreview = action.payload;
    },
    setCaption: (state, action: PayloadAction<string>) => {
      state.caption = action.payload;
    },
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.items = [action.payload, ...state.items];
      localStorage.setItem('posts', JSON.stringify(state.items));
    },
    resetForm: (state) => {
      state.imagePreview = null;
      state.caption = '';
      state.isSubmitting = false;
    }
  }
});

export const { setImagePreview, setCaption, setIsSubmitting, addPost, resetForm } = postsSlice.actions;
export default postsSlice.reducer;