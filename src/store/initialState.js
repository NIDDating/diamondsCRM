const partnersAppearance = {
	current: 0,
	stepsGirl: ["gender", "etn", "body", "chest", "booty", "hair", "hairColor", "eyes"],
	stepsBoy: ["gender", "etn", "body", "hairColor", "eyes"],
	gender: null,
	body: null,
	etn: null,
	chest: null,
	booty: null,
	hair: null,
	hairColor: null,
	eyes: null,
	started: false,
	finished: false
}

const myAppearance = {
	current: 0,
	stepsGirl: ["etn", "body", "chest", "booty", "hair", "hairColor", "eyes"],
	stepsBoy: ["etn", "body", "hairColor", "eyes"],
	body: null,
	etn: null,
	chest: null,
	booty: null,
	hair: null,
	hairColor: null,
	eyes: null,
	started: false,
	finished: false
}
const aboutPartner = {
	started: false,
	finished: false,
	current: 0,
	ageFrom: null,
	ageTo: null,
	birthPlace: null,
	livePlace: null,
	zodiacSign: null,
	height: null,
	heightFrom: null,
	heightTo: null,
	weightFrom: null,
	weightTo: null,
	maritalStatus: null,
	languages: null,
	movingCountry: null,
	movingCity: null,
	children: null,
	childrenCount: null,
	childrenDesire: null,
	smoking: null,
	alcohol: null,
	religion: null,
	sport: null,
	openedFirst: true
}
const aboutMe = {
	current: 0,
	name: null,
	birthday: new Date(),
	email: null,
	phone: null,
	age: null,
	birthPlace: null,
	liveCountry: null,
	liveCity: null,
	zodiacSign: null,
	height: null,
	weight: null,
	maritalStatus: null,
	languages: null,
	movingCountry: null,
	movingCity: null,
	children: null,
	childrenCount: null,
	childrenDesire: null,
	smoking: null,
	alcohol: null,
	religion: null,
	sport: null,
	education: null,
	work: null,
	salary: null,
	healthProblems: null,
	allergies: null,
	pets: null,
	havePets: null,
	filmsOrBooks: null,
	relax: null,
	countriesWas: null,
	countriesDream: null,
	bestGift: null,
	hobbies: null,
	credo: null,
	featuresRepel: null,
	ageDifference: null,
	films: null,
	songs: null,
	idealWeekend: null,
	sleep: null,
	doing10: null,
	signatureDish: null,
	clubs: null,
	bestGiftReceived: null,
	talents: null,
	openedFirst: true
}
const partnersTraits = {
	current: 0,
	answers: [
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
	],
	started: false,
	finished: false,
}
const myTraits = {
	checked: 0,
	started: false,
	finished: false,
	calm: false,
	energetic: false,
	liveInMoment: false,
	pragmatic: false,
	ambitious: false,
	modest: false,
	self: false,
	needSupport: false,
	housewifely: false,
	indifferentLife: false,
	aristocratic: false,
	simple: false,
	sport: false,
	indifferentSport: false,
	loverGoingOut: false,
	home: false,
	adventuress: false,
	rational: false,
	strongWilled: false,
	soft: false,
	lark: false,
	owl: false,
	humanitarian: false,
	mathematical: false,
	open: false,
	cautious: false,
	extrovert: false,
	introvert: false,
	infantile: false,
	mature: false
}
const test = {
	started: false,
	finished: false,
	current: 0,
	answers: [],
	lies: null,
	intervention: null,
	value: null,
	life: null,
	motive_marriage: null,
	family_atmosphere: null,
	position_sex: null,
	books: null,
	friends: null,
	leisure: null,
	discussion_feelings: null,
	work_relationship: null,
	family_decisions: null,
	consent: null,
	interests_partner: null,
	first_place_relationship: null,
	position_society: null,
	conflicts: null,
	cleanliness: null,
	clear_plan: null,
	conflict_behavior: null,
	openedFirst: true
}
const global = {
	language: null,
	started: false,
	images: []
}

const exp = {
	partnersAppearance,
	myAppearance,
	aboutPartner,
	aboutMe,
	partnersTraits,
	myTraits,
	test,
	global
}

export default exp;

export {
	partnersAppearance,
	myAppearance,
	aboutPartner,
	aboutMe,
	partnersTraits,
	myTraits,
	test,
	global
}