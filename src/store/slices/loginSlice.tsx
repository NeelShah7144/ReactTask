// slices/loginSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  data: {
    data: any;
    email: string;
    password: string;
  };
  loading: boolean;
  error: string | null;
}
    
const initialState: LoginState = {
  data: {
    data: null,
    email: '',
    password: '',
  },
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<any>) {
      state.data.data = action.payload;
    },
  },
});

export const { setData } = loginSlice.actions;
export default loginSlice.reducer;