import { combineReducers } from 'redux';
import updateDateReducer from './updateDateReducer';
import changeMonthReducer from './changeMonthReducer';
import updateWeeksReducer from './updateWeeksReducer';
import cookieReducer from './cookieReducer';
import authReducer from './authReducer';
import addEventBoxReducer from './addEventBoxReducer';
export default combineReducers({
    addEventBoxReducer,
    updateWeeksReducer,
    updateDateReducer,
    changeMonthReducer,
    cookieReducer,
    authReducer
});