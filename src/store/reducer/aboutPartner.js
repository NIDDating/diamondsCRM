import {ABOUT_PARTNER} from "../actionTypes";
import {aboutPartner} from "../initialState";

function reducer(state = aboutPartner, action) {
	switch(action.type) {
		case ABOUT_PARTNER.SET_CURRENT:
			return {
				...state,
				current: action.value
			};
		case ABOUT_PARTNER.SET_VALUE:
			let newState = {...state};
			let {field, value, type} = action.value;

			if (action.value.field === "children" && action.value.value === "children_false" || action.value.value === "children_any") {
				newState["childrenCount"] = null;
			}
			if (action.value.field === "languages" && action.value.value.length === 0) {
				newState["languages"] = [];
			}

			newState[field] = value === "" ? null : value;

			if (type === "number" && value.length !== 0) {
				newState[field] = parseInt(value);
			}

			if (action.value.field === "movingCountry") {
				newState["movingCountry"] = !!(action.value.value.indexOf("true") + 1);
			}

			if (action.value.field === "movingCity") {
				newState["movingCity"] = !!(action.value.value.indexOf("true") + 1);
			}

			if (action.value.field === "height") {
				newState["height"] = action.value.value[2];
				newState["heightFrom"] = action.value.value[0];
				newState["heightTo"] = action.value.value[1];
			}

			if (action.value.field === "religionMatter") {
				newState["religion"] = null;
			}

			return newState;
		case ABOUT_PARTNER.INCREMENT_CURRENT:
			return {
				...state,
				current: state.current + 1
			};
		case ABOUT_PARTNER.DECREMENT_CURRENT:
			return {
				...state,
				current: state.current - 1
			};
		case ABOUT_PARTNER.START:
			return {
				...state,
				started: true
			}
		case ABOUT_PARTNER.FINISH:
			return {
				...state,
				finished: true
			}
		default:
			return state;
	}
}

export default reducer;