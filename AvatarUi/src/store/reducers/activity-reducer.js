import {
  INITIALISE,
  ENROLLFACE,
  SEARCHFACE,
  ENROLLUSER,
} from "../actions/activity";

const activityReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case INITIALISE:
      return payload;

    case ENROLLFACE:
      return payload;

    case SEARCHFACE:
      return payload;

    case ENROLLUSER:
      return payload;
    default:
      return state;
  }
};

export default activityReducer;
