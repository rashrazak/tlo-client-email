import { combineReducers } from 'redux';
import reducer from './reducers';

const rootReducers = combineReducers({  
  main: reducer,
});

export default rootReducers;
