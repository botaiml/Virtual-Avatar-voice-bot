import { INITIALISE, ENROLLFACE, SEARCHFACE } from "../actions/activity";

const activityReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case INITIALISE:
      return payload;

    case ENROLLFACE:
      return payload;

    case SEARCHFACE:
      return payload;

    default:
      return state;
  }
};

export default activityReducer;
