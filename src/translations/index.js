import partnersAppearance from "./partnersAppearance";
import aboutMe from "./aboutMe";
import myAppearance from "./myAppearance";
import test from "./test";
import zodiac from "./zodiac";
import traits from "./traits";
import topbar from "./topbar";
import buttons from "./buttons";
import utils from "./utils";
import comp404 from "./404";

import partnerAbout from "./partnerAbout";
import tabsProgress from "./tabsProgress";
import errors from "./errors";
import appearance from "./appearance";
import myTraits from "./myTraits";
import finish from "./finish";
import partnersTraits from "./partnersTraits";
import start from "./start";

export default {
	"ru": {
		...partnersAppearance.ru,
		...tabsProgress.ru,
		...topbar.ru,
		...traits.ru,
		...utils.ru,
		...zodiac.ru,
		...buttons.ru,
		...errors.ru,
		...finish.ru,
		...myTraits.ru,
		...test.ru,
		...aboutMe.ru,
		...appearance.ru,
		...myAppearance.ru,
		...partnerAbout.ru,
		...comp404.ru,
		...partnersTraits.ru,
		...start.ru
	},
	"en": {
		...partnersAppearance.en,
		...tabsProgress.en,
		...topbar.en,
		...traits.en,
		...utils.en,
		...zodiac.en,
		...buttons.en,
		...errors.en,
		...finish.en,
		...myTraits.en,
		...test.en,
		...aboutMe.en,
		...appearance.en,
		...myAppearance.en,
		...partnerAbout.en,
		...comp404.en,
		...partnersTraits.en,
		...start.en
	}
}