import { combineReducers } from 'redux';
import loginReducer from './loginreducer';

const rootReducer = combineReducers({
  login: loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
