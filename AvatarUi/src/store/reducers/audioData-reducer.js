import { INITIALISE } from "../actions/audioData";

const audioDataReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case INITIALISE:
      return payload;

    default:
      return state;
  }
};

export default audioDataReducer;
