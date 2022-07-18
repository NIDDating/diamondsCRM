class Variant {
  constructor(field, label) {
    this.field = field;
    this.label = label;
  }
}

const girl = [
  [new Variant("calm", "traits.calm.female"), new Variant("energetic", "traits.energetic.female")],
  [new Variant("liveInMoment", "traits.liveInMoment.female"), new Variant("pragmatic", "traits.pragmatic.female")],
  [new Variant("ambitious", "traits.ambitious.female"), new Variant("modest", "traits.modest.female")],
  [new Variant("self", "traits.self.female"), new Variant("needSupport", "traits.needSupport.female")],
  [new Variant("housewifely", "traits.housewifely.female"), new Variant("indifferentLife", "traits.indifferentLife.female")],
  [new Variant("aristocratic", "traits.aristocratic.female"), new Variant("simple", "traits.simple.female")],
  [new Variant("sport", "traits.sport.female"), new Variant("indifferentSport", "traits.indifferentSport.female")],
  [new Variant("loverGoingOut", "traits.loverGoingOut.female"), new Variant("home", "traits.home.female")],
  [new Variant("adventuress", "traits.adventuress.female"), new Variant("rational", "traits.rational.female")],
  [new Variant("strongWilled", "traits.strongWilled.female"), new Variant("soft", "traits.soft.female")],
  [new Variant("lark", "traits.lark.female"), new Variant("owl", "traits.owl.female")],
  [new Variant("humanitarian", "traits.humanitarian.female"), new Variant("mathematical", "traits.mathematical.female")],
  [new Variant("open", "traits.open.female"), new Variant("cautious", "traits.cautious.female")],
  [new Variant("extrovert", "traits.extrovert.female"), new Variant("introvert", "traits.introvert.female")],
  [new Variant("infantile", "traits.infantile.female"), new Variant("mature", "traits.mature.female")]
];

const boy = [
  [new Variant("calm", "traits.calm.male"), new Variant("energetic", "traits.energetic.male")],
  [new Variant("liveInMoment", "traits.liveInMoment.male"), new Variant("pragmatic", "traits.pragmatic.male")],
  [new Variant("ambitious", "traits.ambitious.male"), new Variant("modest", "traits.modest.male")],
  [new Variant("self", "traits.self.male"), new Variant("needSupport", "traits.needSupport.male")],
  [new Variant("housewifely", "traits.housewifely.male"), new Variant("indifferentLife", "traits.indifferentLife.male")],
  [new Variant("aristocratic", "traits.aristocratic.male"), new Variant("simple", "traits.simple.male")],
  [new Variant("sport", "traits.sport.male"), new Variant("indifferentSport", "traits.indifferentSport.male")],
  [new Variant("loverGoingOut", "traits.loverGoingOut.male"), new Variant("home", "traits.home.male")],
  [new Variant("adventuress", "traits.adventuress.male"), new Variant("rational", "traits.rational.male")],
  [new Variant("strongWilled", "traits.strongWilled.male"), new Variant("soft", "traits.soft.male")],
  [new Variant("lark", "traits.lark.male"), new Variant("owl", "traits.owl.male")],
  [new Variant("humanitarian", "traits.humanitarian.male"), new Variant("mathematical", "traits.mathematical.male")],
  [new Variant("open", "traits.open.male"), new Variant("cautious", "traits.cautious.male")],
  [new Variant("extrovert", "traits.extrovert.male"), new Variant("introvert", "traits.introvert.male")],
  [new Variant("infantile", "traits.infantile.male"), new Variant("mature", "traits.mature.male")]
];

const boyAll = [];

boy.forEach(item => {
  boyAll.push(item[0]);
  boyAll.push(item[1]);
});

const girlAll = [];

girl.forEach(item => {
  girlAll.push(item[0]);
  girlAll.push(item[1]);
});

export {girl, boy, girlAll, boyAll};