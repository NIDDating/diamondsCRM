import {ABOUT_ME} from "../actionTypes";
import {aboutMe} from "../initialState";

function reducer(state = aboutMe, action) {
	switch(action.type) {
		case ABOUT_ME.SET_CURRENT:
			return {
				...state,
				current: action.value
			};
		case ABOUT_ME.SET_VALUE:
			let newState = {...state};
			let {field, value, type} = action.value;

			if (action.value.field === "children" && action.value.value === "children_false") {
				newState["childrenCount"] = null;
			}
			if (action.value.field === "languages" && action.value.value.length === 0) {
				newState["languages"] = [];
			}

			newState[field] = value === "" ? null : value;

			if (type === "number" && value.length !== 0) {
				newState[field] = parseInt(value);
			}

			if (action.value.field === "children") {
				newState["children"] = !!(action.value.value.indexOf("true") + 1);
				newState["childrenCount"] = null;
			}

			if (action.value.field === "movingCountry") {
				newState["movingCountry"] = !!(action.value.value.indexOf("true") + 1);
			}

			if (action.value.field === "movingCity") {
				newState["movingCity"] = !!(action.value.value.indexOf("true") + 1);
			}

			if (action.value.field === "height") {
				if (action.value.value === "height0") {
					newState["heightFrom"] = 100;
					newState["heightTo"] = 120;
				}
				if (action.value.value === "height1") {
					newState["heightFrom"] = 120;
					newState["heightTo"] = 140;
				}
				if (action.value.value === "height2") {
					newState["heightFrom"] = 140;
					newState["heightTo"] = 160;
				}
			}

			if (action.value.field === "work") {
				newState["workPlace"] = null;
			}

			if (action.value.field === "pets") {
				newState["havePets"] = null;
			}

			return newState;
		case ABOUT_ME.INCREMENT_CURRENT:
			return {
				...state,
				current: state.current + 1
			};
		case ABOUT_ME.DECREMENT_CURRENT:
			return {
				...state,
				current: state.current - 1
			};
		case ABOUT_ME.START:
			console.log(action);
			return {
				...state,
				uid: action.value,
				started: true
			}
		case ABOUT_ME.FINISH:
			return {
				...state,
				finished: true
			}
		default:
			return state;
	}
}

export default reducer;