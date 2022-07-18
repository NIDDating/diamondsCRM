const data = [
  { value: "aries", label: "zodiac.aries" },
  { value: "calf", label: "zodiac.calf" },
  { value: "twins", label: "zodiac.twins" },
  { value: "cancer", label: "zodiac.cancer" },
  { value: "lion", label: "zodiac.lion" },
  { value: "virgo", label: "zodiac.virgo" },
  { value: "libra", label: "zodiac.libra" },
  { value: "scorpio", label: "zodiac.scorpio" },
  { value: "sagittarius", label: "zodiac.sagittarius" },
  { value: "capricorn", label: "zodiac.capricorn" },
  { value: "aquarius", label: "zodiac.aquarius" },
  { value: "fish", label: "zodiac.fish" },
];


const getZodiac = (intl) => {
  return data.map((item) => {
    return {
      value: item.value,
      label: intl.formatMessage({id: item.label})
    }
  });
}

const getZodiacPartner = (intl) => {
  let arr1 = [{
    value: "no_matter",
    label: intl.formatMessage({id: "answerAny"})
  }];

  let arr2 = data.map((item) => {
    return {
      value: item.value,
      label: intl.formatMessage({id: item.label})
    }
  });

  return [...arr1, ...arr2];
}

export default data;
export {getZodiac, getZodiacPartner}