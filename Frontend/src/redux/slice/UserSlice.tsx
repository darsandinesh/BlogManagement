import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDetails } from '../../interface/IUser';

export interface UserData {
  id: string | null;
  email: string | null;
  name: string | null;
  avatar?: string | null;
  phone?: string | null;
  bio?: string | null;
}

export interface UserState {
  isAuthenticated: boolean;
  userData: UserData | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  userData: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    },
    updateAvatar: (state, action: PayloadAction<string | null>) => {
      if (state.userData) {
        state.userData.avatar = action.payload;
      }
    },
    updateProfile: (state, action: PayloadAction<UserDetails>) => {
      console.log(action.payload, '------payload in the update Profile')
      if (state.userData) {
        state.userData.name = action.payload.name;
        state.userData.bio = action.payload.bio;
        state.userData.phone = action.payload.phone
      }
    }
  }
});

export const { login, logout, updateAvatar, updateProfile } = userSlice.actions;

export default userSlice.reducer;
