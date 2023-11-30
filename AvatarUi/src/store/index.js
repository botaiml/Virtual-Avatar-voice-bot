import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import activityReducer from "./reducers/activity-reducer";

const InitialState = {
  activity: {},
};

const allReducers = combineReducers({
  activity: activityReducer,
});

const store = createStore(allReducers, InitialState);
export default store;
