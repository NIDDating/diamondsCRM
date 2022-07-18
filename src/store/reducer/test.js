import {test} from "../initialState";
import {TEST} from "../actionTypes";

function reducer(state = test, action) {
  switch(action.type) {
    case TEST.SET_CURRENT:
      return {
        ...state,
        current: action.value
      };
    case TEST.SET_VALUE:
      let newState = {...state};

      newState[action.value.field] = parseInt(action.value.value);

      return newState;
    case TEST.INCREMENT_CURRENT:
      return {
        ...state,
        current: state.current + 1
      };
    case TEST.DECREMENT_CURRENT:
      return {
        ...state,
        current: state.current - 1
      };
    case TEST.START:
      return {
        ...state,
        started: true
      }
    case TEST.FINISH:
      return {
        ...state,
        finished: true
      }
    default:
      return state;
  }
}

export default reducer;