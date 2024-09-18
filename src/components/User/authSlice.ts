import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  readername: string | null;
  avatar: string | null;
}

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  token: localStorage.getItem('token'),
  readername: localStorage.getItem('readername'),
  avatar: localStorage.getItem('avatar'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{
      token: string;
      readername: string | null;
      avatar: string | null;
    }>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.readername = action.payload.readername;
      state.avatar = action.payload.avatar;

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('readername', action.payload.readername || '');
      localStorage.setItem('avatar', action.payload.avatar || '');
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.readername = null;
      state.avatar = null;

      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
      localStorage.removeItem('readername');
      localStorage.removeItem('avatar');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
