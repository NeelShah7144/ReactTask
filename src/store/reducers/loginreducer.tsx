import { DATA } from '../actions/types';

interface LoginState {
  data: {
    data: any;
    email: string;
    password: string;
  };
  loading: boolean;
  error: string | null;
}

interface Action {
  type: string;
  payload?: any;
  error?: string;
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

const loginReducer = (state = initialState, action: Action): LoginState => {
  switch (action.type) {
    case DATA:
      return {
        ...state,
        data: {
          ...state.data,
          data: action.payload,
          
        },
      };
    default:
      return state;
  }
};

export default loginReducer;