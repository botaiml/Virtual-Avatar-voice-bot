import { INITIALISE } from "../actions/audioStatus";

const audioByteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case INITIALISE:
      return payload;

    default:
      return state;
  }
};

export default audioByteReducer;
