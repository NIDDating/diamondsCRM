import fetch from "node-fetch";
import config from "../config";
import {aboutMe} from "../store/initialState";

function getEtn(etn) {
	switch (etn) {
		default:
		case 1000: return "no_matter";
		case 0: return "caucasoid";
		case 1: return "asian";
		case 2: return "dark_skinned";
		case 3: return "hispanic";
		case 4: return "indian";
		case 5: return "native_middle_east";
		case 6: return "mestizo";
		case 7: return "native_american";
		case 8: return "islands";
		case 9: return "other"
	}
}
function getBody(body, gender) {
	switch (body) {
		default:
		case 1000: return "any";
		case 0: return "slim";
		case 1:
			if (gender === 0) {
				return "hourglass";
			} else {
				return "athletic";
			}
		case 2: return "full";
		case 3: return "athletic";
	}
}
function getChest(chest) {
	switch (chest) {
		default:
		case 1000: return "any";
		case 0: return "small";
		case 1: return "middle";
		case 2: return "big";
	}
}
function getBooty(booty) {
	switch (booty) {
		default:
		case 1000: return "any";
		case 0: return "small";
		case 1: return "middle";
		case 2: return "big";
	}
}
function getHair(hair) {
	switch (hair) {
		default:
		case 1000: return "any";
		case 0: return "long";
		case 1: return "short";
	}
}
function getHairColor(hair) {
	switch (hair) {
		default:
		case 1000: return "any";
		case 0: return "brown-haired";
		case 1: return "redhead";
		case 2: return "blonde";
		case 3: return "brunette";
	}
}
function getEyes(eyes) {
	switch (eyes) {
		default:
		case 1000: return "any";
		case 0: return "brown";
		case 1: return "green";
		case 2: return "blue";
		case 3: return "gray";
	}
}
function getBirthday(birthday) {
	let date = new Date(birthday);

	return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
}
function getLivePlace(livePlace) {
	for (let i = 0; i < livePlace.length; i++) {
		if (livePlace[i].value === 1000) {
			return null;
		}
	}

	return livePlace.map((item) => item.label);
}

function getLanguages(languages) {
	for (let i = 0; i < languages.length; i++) {
		if (languages[i].value === "any") {
			return null;
		}
	}

	return languages.map((item) => item.value);
}

async function post(store) {
	let sign = localStorage.getItem("sign");

	let partnerAppearance = {
		"sex": store.partnersAppearance.gender === 1 ? "male" : "female",
		"ethnicity": getEtn(store.partnersAppearance.etn),
		"body_type": getBody(store.partnersAppearance.body, store.partnersAppearance.gender),
		"hair_color": getHairColor(store.partnersAppearance.hairColor),
		"eye_color": getEyes(store.partnersAppearance.eyes)
	};
	if (store.partnersAppearance.gender === 0) {
		partnerAppearance["chest"] = getChest(store.partnersAppearance.chest);
		partnerAppearance["booty"] = getBooty(store.partnersAppearance.booty);
		partnerAppearance["hair_length"] = getHair(store.partnersAppearance.hair);
	}

	let partnerQualities = Object.values(store.partnersTraits.answers);

	for (let i = 0; i < partnerQualities.length; i++) {
		if (partnerQualities[i] === "liveInMoment") partnerQualities[i] = "live_in_moment";
		if (partnerQualities[i] === "needSupport") partnerQualities[i] = "need_support";
		if (partnerQualities[i] === "indifferentLife") partnerQualities[i] = "indifferent_life";
		if (partnerQualities[i] === "indifferentSport") partnerQualities[i] = "indifferent_sport";
		if (partnerQualities[i] === "indifferentSport") partnerQualities[i] = "indifferent_sport";
		if (partnerQualities[i] === "strongWilled") partnerQualities[i] = "strong-willed";
		if (partnerQualities[i] === "loverGoingOut") partnerQualities[i] = "lover_going_out";
	}

	let partnerInformation = {
		"age": [parseInt(store.aboutPartner.ageFrom), parseInt(store.aboutPartner.ageTo)],
		// "place_birth": store.aboutPartner.birthPlace.map((item) => item.label),
		"live_place": getLivePlace(store.aboutPartner.livePlace),
		"zodiac_signs": store.aboutPartner.zodiacSign,
		"height": [parseInt(store.aboutPartner.heightFrom), parseInt(store.aboutPartner.heightTo)],
		"weight": [parseInt(store.aboutPartner.weightFrom), parseInt(store.aboutPartner.weightTo)],
		"marital_status": store.aboutPartner.maritalStatus,
		"languages": getLanguages(store.aboutPartner.languages),
		"moving_country": store.aboutPartner.movingCountry,
		"moving_city": store.aboutPartner.movingCity,
		"children": store.aboutPartner.children === "children_any" ? null : store.aboutPartner.children === "children_true",
		"children_count": store.aboutPartner.childrenCount ? parseInt(store.aboutPartner.childrenCount) : null,
		"children_desire": store.aboutPartner.childrenDesire,
		"smoking": getSmoking(store.aboutPartner.smoking),
		"alcohol": getAlcohol(store.aboutPartner.alcohol),
		"religion": getReligion(store.aboutPartner.religion),
		"sport": getSport(store.aboutPartner.sport),
	};

	let test = {
		"lies": parseInt(store.test.lies),
		"intervention": parseInt(store.test.intervention),
		"value": parseInt(store.test.value),
		"life": parseInt(store.test.life),
		"motive_marriage": parseInt(store.test.motive_marriage),
		"family_atmosphere": parseInt(store.test.family_atmosphere),
		"position_sex": parseInt(store.test.position_sex),
		"books": parseInt(store.test.books),
		"friends": parseInt(store.test.friends),
		"leisure": parseInt(store.test.leisure),
		"discussion_feelings": parseInt(store.test.discussion_feelings),
		"work_relationship": parseInt(store.test.work_relationship),
		"family_decisions": parseInt(store.test.family_decisions),
		"consent": parseInt(store.test.consent),
		"interests_partner": parseInt(store.test.interests_partner),
		"first_place_relationship": parseInt(store.test.first_place_relationship),
		"position_society": parseInt(store.test.position_society),
		"conflicts": parseInt(store.test.conflicts),
		"cleanliness": parseInt(store.test.cleanliness),
		"clear_plan": parseInt(store.test.clear_plan),
		"conflict_behavior": parseInt(store.test.conflict_behavior),
	};

	let myAppearance = {
		"sex": store.partnersAppearance.gender === 0 ? "male" : "female",
		"ethnicity": getEtn(store.myAppearance.etn),
		"body_type": getBody(store.myAppearance.body, store.myAppearance.gender),
		"hair_color": getHairColor(store.myAppearance.hairColor),
		"eye_color": getEyes(store.myAppearance.eyes)
	};

	if (store.partnersAppearance.gender === 1) {
		myAppearance["chest"] = getChest(store.myAppearance.chest);
		myAppearance["booty"] = getBooty(store.myAppearance.booty);
		myAppearance["hair_length"] = getHair(store.myAppearance.hair);
	}

	let myQualities = {};

	Object.keys(store.myTraits).forEach((item) => {
		if (item !== "checked" && item !== "finished" && item !== "started") {
			let temp = item;

			if (temp === "liveInMoment") temp = "live_in_moment";
			if (temp === "needSupport") temp = "need_support";
			if (temp === "indifferentLife") temp = "indifferent_life";
			if (temp === "indifferentSport") temp = "indifferent_sport";
			if (temp === "indifferentSport") temp = "indifferent_sport";
			if (temp === "strongWilled") temp = "strong-willed";
			if (temp === "loverGoingOut") temp = "lover_going_out";

			myQualities[temp] = store.myTraits[item];
		}
	});

	function getSmoking(smoking) {
		if (smoking === "smoking0") return "dont_smoking";
		if (smoking === "smoking1") return "rarely";
		if (smoking === "smoking2") return "smoking";
		if (smoking === "smoking3") return "no_matter";

		return null;
	}
	function getAlcohol(alcohol) {
		if (alcohol === "alcohol0") return "no";
		if (alcohol === "alcohol1") return "rarely";
		if (alcohol === "alcohol2") return "often";
		if (alcohol === "alcohol3") return "very_often";
		if (alcohol === "alcohol4") return "no_matter";

		return null;
	}
	function getSport(sport) {
		if (sport === "sport0") return "playing_sports";
		if (sport === "sport1") return "sometimes";
		if (sport === "sport2") return "not_engaged";
		if (sport === "sport3") return "no_matter";

		return null;
	}
	function getEducation(education) {
		if (education === "education0") return "middle";
		if (education === "education1") return "college";
		if (education === "education2") return "unfinished_higher";
		if (education === "education3") return "specialist";
		if (education === "education4") return "bachelor";
		if (education === "education5") return "master";
		if (education === "education6") return "phd";

		return null;
	}
	function getReligion(religion) {
		if (religion === "religion0") return "christianity";
		if (religion === "religion1") return "judaism";
		if (religion === "religion2") return "catholicism";
		if (religion === "religion3") return "hinduism";
		if (religion === "religion4") return "islam";
		if (religion === "religion5") return "buddhism";
		if (religion === "religion6") return "atheism";

		return "no_matter";
	}
	function getWork(work) {
		if (work === "work0") return "work";
		if (work === "work1") return "temp_no_work";
		if (work === "work2") return "no_work";
		if (work === "work3") return "study";
		if (work === "work4") return "pensioner";

		return null;
	}
	function getSalary(salary) {
		if (store.global.language === "en") {
			if (salary === "salary0") return "1000,3000,$";
			if (salary === "salary1") return "3000,5000,$";
			if (salary === "salary2") return "5000,10000,$";
			if (salary === "salary3") return "10000,50000,$";
			if (salary === "salary4") return "50000,100000,$";
			if (salary === "salary5") return "100000,-1,$";
		} else {
			if (salary === "salary0") return "50000,100000,P";
			if (salary === "salary1") return "100000,350000,P";
			if (salary === "salary2") return "350000,500000,P";
			if (salary === "salary3") return "500000,1000000,P";
			if (salary === "salary4") return "1000000,3000000,P";
			if (salary === "salary5") return "3000000,-1,P";
		}
	}

	let myInformation = {
		"name": store.aboutMe.name,
		"birthday": getBirthday(store.aboutMe.birthday),
		"place_birth": store.aboutMe.birthPlace,
		"live_country": store.aboutMe.liveCountry,
		"live_city": store.aboutMe.liveCity.value,
		"age": parseInt(store.aboutMe.age),
		"zodiac_signs": store.aboutMe.zodiacSign,
		"height": parseInt(store.aboutMe.height),
		"weight": parseInt(store.aboutMe.weight),
		"marital_status": store.aboutMe.maritalStatus,
		"languages": store.aboutMe.languages.map(item => item.value),
		"moving_city": store.aboutMe.movingCity,
		"moving_country": store.aboutMe.movingCountry,
		"children": store.aboutMe.children,
		"children_desire": store.aboutMe.childrenDesire,
		"smoking": getSmoking(store.aboutMe.smoking),
		"alcohol": getAlcohol(store.aboutMe.alcohol),
		"religion": store.aboutMe.religionMatter === "religionMatter0" ? getReligion(store.aboutMe.religion) : "no_matter",
		"sport": getSport(store.aboutMe.sport),
		"education": getEducation(store.aboutMe.education),
		"education_name": store.aboutMe.educationPlace,
		"work": getWork(store.aboutMe.work),
		"work_name": store.aboutMe.work === "work0" ? store.aboutMe.workPlace : null,
		"salary": store.aboutMe.salary ? getSalary(store.aboutMe.salary) : 0,
		"health_problems": store.aboutMe.healthProblems,
		"allergies": store.aboutMe.allergies,
		"pets": store.aboutMe.pets,
		"have_pets": store.aboutMe.pets === "have_pets" ? store.aboutMe.havePets : null,
		"films_or_books": store.aboutMe.filmsOrBooks,
		"relax": store.aboutMe.relax,
		"countries_was": store.aboutMe.countriesWas.map(item => item.value),
		"countries_dream": store.aboutMe.countriesDream.map(item => item.value),
		"best_gift": store.aboutMe.bestGift,
		"hobbies": store.aboutMe.hobbies,
		"kredo": store.aboutMe.credo,
		"features_repel": store.aboutMe.featuresRepel,
		"age_difference": store.aboutMe.ageDifference,
		"films": store.aboutMe.films,
		"songs": store.aboutMe.songs,
		"ideal_weekend": store.aboutMe.idealWeekend,
		"sleep": store.aboutMe.sleep,
		"doing_10": store.aboutMe.doing10,
		"signature_dish": store.aboutMe.signatureDish,
		"clubs": store.aboutMe.clubs,
		"best_gift_received": store.aboutMe.bestGiftReceived,
		"talents": store.aboutMe.talents
	}

	let body = {
		"partner_appearance": partnerAppearance,
		"personal_qualities_partner": partnerQualities,
		"partner_information": partnerInformation,
		"test": test,
		"my_appearance": myAppearance,
		"my_personal_qualities": myQualities,
		"my_information": myInformation,
		"temp_photo_id": store.aboutMe.uid,
		"email": store.aboutMe.email,
		"phone": store.aboutMe.phone,
		"lang": store.global.language
	}

	console.log(body);

	// return 0;

	try {
		const response = await fetch(
			sign ? `${config.domain}/questionnaire/questionnaire.create`
				       : `${config.domain}/questionnaire/questionnaire.createFromSite`,
			{
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body),
			}
	);
		let data = await response.json();

		if (data.success) {
			localStorage.removeItem("sign");
			return data;
		} else {
			return data;
		}
	} catch (e) {
		console.log('error');
		console.log('Error', e.response.data);
	}
}
async function getCities(filter, country, english) {
	try {
		const response = await fetch(
			`${config.domain}/utils/utils.cities?title=${filter}&country_id=${country.value}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		);
		let data = await response.json();

		if (data.success) {
			return data.data.map((item) => {
				return {
					value: item.value_en,
					label: english ? item.value_en : item.value_ru
				}
			});
		} else {
			return [];
		}
	} catch (e) {
		console.log(e);
		return [];
	}
}
async function getCountries(filter, english) {
	try {
		const response = await fetch(
			`${config.domain}/utils/utils.countries?title=${filter}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		);
		let data = await response.json();

		if (data.success) {
			return data.data.map((item) => {
				return {
					value: item.country_id,
					label: english ? item.value_en : item.value_ru
				}
			});
		} else {
			return [];
		}
	} catch (e) {
		return [];
	}
}
async function getSign(sign) {
	const response = await fetch(
		`${config.domain}/questionnaire/questionnaire.sign?sign=${sign}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}
	);
	let data = await response.json();

	if (data.success) {
		localStorage.removeItem("sign");
		return data.data.exist;
	} else {
		throw new Error(data.message);
	}
}
async function uploadPhoto(temp_id, photo) {
	let sendedFile = new FormData();

	sendedFile.append("photo", photo);
	sendedFile.append("temp_id", temp_id);

	const response = await fetch(
		`${config.domain}/questionnaire/questionnaire.uploadClientPhoto`,
		{
			method: 'POST',
			headers: {
			},
			body: sendedFile
		}
	);
	let data = await response.json();
	if (data.success) {
		return data;
	} else {
		throw new Error(data.message);
	}
}
async function deletePhoto(path) {
	const response = await fetch(
		`${config.domain}/questionnaire/questionnaire.removeClientPhoto`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({path})
		}
	);
	let data = await response.json();
	if (data.success) {
		return data;
	} else {
		throw new Error(data.message);
	}
}

export default post;
export {getCities, getCountries, getSign, uploadPhoto, deletePhoto};