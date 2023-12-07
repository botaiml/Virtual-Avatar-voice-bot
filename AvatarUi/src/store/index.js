import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import activityReducer from "./reducers/activity-reducer";
import audioDataReducer from "./reducers/audioData-reducer";
import audioStatusReducer from "./reducers/audioStatus-reducer";
const InitialState = {
  activity: {},
  audioData: {},
  audioStatus: {},
};

const allReducers = combineReducers({
  activity: activityReducer,
  audioData: audioDataReducer,
  audioStatus: audioStatusReducer,
});

const store = createStore(allReducers, InitialState);
export default store;
