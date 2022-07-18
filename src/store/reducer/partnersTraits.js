import {partnersTraits} from "../initialState";
import {PARTNERS_TRAITS} from "../actionTypes";

function reducer(state = partnersTraits, action) {
  switch(action.type) {
    case PARTNERS_TRAITS.SET_CURRENT:
      return {
        ...state,
        current: action.value
      };
    case PARTNERS_TRAITS.SET_VALUE:
      let newAnswers = {...state.answers};

      newAnswers[action.value.id] = action.value.field;

      return {
        ...state,
        answers: newAnswers
      };
    case PARTNERS_TRAITS.INCREMENT_CURRENT:
      return {
        ...state,
        current: state.current + 1
      };
    case PARTNERS_TRAITS.DECREMENT_CURRENT:
      return {
        ...state,
        current: state.current - 1
      };
    case PARTNERS_TRAITS.START:
      return {
        ...state,
        started: true
      }
    case PARTNERS_TRAITS.FINISH:
      return {
        ...state,
        finished: true
      }
    default:
      return state;
  }
}

export default reducer;