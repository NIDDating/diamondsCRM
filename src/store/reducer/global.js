import {GLOBAL} from "../actionTypes";
import {global} from "../initialState";
import {act} from "@testing-library/react";

function removeA(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax= arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

function reducer(state = global, action) {
  switch(action.type) {
    case GLOBAL.SET_LANGUAGE:
      return {
        ...state,
        language: action.value
      }
    case GLOBAL.START:
      return {
        ...state,
        started: true
      }
    case GLOBAL.ADD_IMAGE:
      return {
        ...state,
        images: [...state.images, action.value]
      }
    case GLOBAL.REMOVE_IMAGE:
      return {
        ...state,
        images: state.images.filter(e => e !== action.value)
      }
    default:
      return state;
  }
}

export default reducer;