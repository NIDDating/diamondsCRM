import {myTraits} from "../initialState";
import {MY_TRAITS} from "../actionTypes";

function reducer(state = myTraits, action) {
  switch(action.type) {
    case MY_TRAITS.SET_VALUE:
      let newState = {...state};

      if (action.value.value) {
        newState.checked = newState.checked + 1;
      } else {
        newState.checked = newState.checked - 1;
      }

      newState[action.value.field] = action.value.value;

      return newState;
    case MY_TRAITS.START:
      return {
        ...state,
        started: true
      }
    case MY_TRAITS.FINISH:
      return {
        ...state,
        finished: true
      }
    default:
      return state;
  }
}

export default reducer;