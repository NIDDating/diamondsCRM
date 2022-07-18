import React from "react";
import initScroll from "../../utils/initScroll";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import styles from "./styles.module.scss";
import Topbar from "../../components/Topbar";
import TabsProgress from "../../components/TabsProgress";
import ProgressBar from "../../components/ProgressBar";
import {FormattedMessage, injectIntl} from "react-intl";
import Button from "../../components/Button";
import {ABOUT_ME} from "../../store/actionTypes";
import {routes} from "../../router/config";
import {getZodiac} from "../../utils/zodiac";
import BeatLoader from "react-spinners/BeatLoader";
import DoubleInput from "../../components/DoubleInput";
import Dropdown from "../../components/Dropdown";
import {myCountriesEn, myCountriesRu} from "../../utils/countries";
import {languagesEn, languagesRu} from "../../utils/languages";
import RadioGroup from "../../components/RadioGroup";
import {RadioProps} from "../../components/Radio";
import Input from "../../components/Input";
import debounce from "debounce";
import {deletePhoto, getCities, getCountries} from "../../utils/api";
import AsyncDropdown from "../../components/AsyncDropdown";
import Label from "../../components/Label";
import DatePicker from "react-date-picker";
import {educationEn, educationRu} from "../../utils/education";
import {religionEn, religionRu} from "../../utils/religion";
import {workEn, workRu} from "../../utils/work";
import {salaryEn, salaryRu} from "../../utils/salary";
import {petsEn, petsRu} from "../../utils/pets";
import toast from "react-hot-toast";
import removeIcon from "../../assets/imgs/removePhoto.png";
import FileUpload from "../../components/FileUpload";
import {GLOBAL} from "../../store/actionTypes";
import {uid} from "uid";
import FileImage from "../../components/FileImage";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.setValue = this.setValue.bind(this);
    this.Switch = this.Switch.bind(this);
    this.Step = this.Step.bind(this);
    this.Step0 = this.Step0.bind(this);
    this.Step1 = this.Step1.bind(this);
    this.Step2 = this.Step2.bind(this);
    this.Step3 = this.Step3.bind(this);
    this.Step4 = this.Step4.bind(this);
    this.Step5 = this.Step5.bind(this);
    this.Step6 = this.Step6.bind(this);
    this.Step7 = this.Step7.bind(this);
    this.Guide = this.Guide.bind(this);
    this.loadCities = this.loadCities.bind(this);
    this.loadCountries = this.loadCountries.bind(this);
    this.Images = this.Images.bind(this);

    this.state = {
      loading: false,
      languages: [],
      cities: []
    }
  }

  validateField(item) {
    if (item.double) {
      if (this.props.store[item.field1] === null || this.props.store[item.field2] === null) {
        toast.error(
          this.props.intl.formatMessage({
            id: "error.field"
          }, {
            field: this.props.intl.formatMessage({
              id: item.labelIntlId
            })
          })
        );

        return false;
      } else {
        return true;
      }
    } else {
      if (this.props.store[item.field] === null) {
        toast.error(
          this.props.intl.formatMessage({
            id: "error.field"
          }, {
            field: this.props.intl.formatMessage({
              id: item.labelIntlId
            })
          })
        );

        return false;
      } else {
        return true;
      }
    }
  }
  validate(rules) {
    for (let i = 0; i < rules.length; i++) {
      if (this.validateField(rules[i]) === false) {
        return false;
      }
    }

    return true;
  }

  _step0Rules() {
    return [
      {
        field: "name",
        labelIntlId: "aboutMe.name"
      }, {
        field: "email",
        labelIntlId: "aboutMe.email"
      }, {
        field: "phone",
        labelIntlId: "aboutMe.phone"
      }, {
        field: "birthday",
        labelIntlId: "aboutMe.birthday"
      }, {
        field: "birthPlace",
        labelIntlId: "aboutMe.birthPlace"
      }, {
        field: "liveCountry",
        labelIntlId: "aboutMe.livePlace"
      }, {
        field: "liveCity",
        labelIntlId: "aboutMe.livePlace"
      }, {
        field: "zodiacSign",
        labelIntlId: "aboutMe.zodiacSign"
      }, {
        field: "height",
        labelIntlId: "aboutMe.heightPH"
      }, {
        field: "weight",
        labelIntlId: "aboutMe.weightPH"
      }, {
        field: "maritalStatus",
        labelIntlId: "aboutMe.maritalStatus"
      }, {
        field: "languages",
        labelIntlId: "aboutMe.languages"
      }
    ];
  }
  _step1Rules() {
    return [
      {
        field: "movingCountry",
        labelIntlId: "aboutMe.movingCountry"
      }, {
        field: "movingCity",
        labelIntlId: "aboutMe.movingCity"
      }
    ];
  }
  _step2Rules() {
    let rules = [
      {
        field: "children",
        labelIntlId: "aboutMe.children"
      }, {
        field: "childrenDesire",
        labelIntlId:  "aboutMe.childrenDesire"
      }
    ];

    if (this.props.store.children) {
      rules.push(
        {
          field: "childrenCount",
          labelIntlId: "aboutMe.childrenCount"
        }
      );
    }

    return rules;
  }
  _step3Rules() {
    return [
      {
        field: "smoking",
        labelIntlId: "aboutMe.smoking"
      }, {
        field: "alcohol",
        labelIntlId: "aboutMe.alcohol"
      },  {
        field: "religion",
        labelIntlId: "aboutMe.religion"
      }, {
        field: "sport",
        labelIntlId: "aboutMe.sport"
      }
    ];
  }
  _step4Rules() {
    return [
      {
        field: "education",
        labelIntlId: "aboutMe.education"
      }, {
        field: "educationPlace",
        labelIntlId: "aboutMe.educationPlace"
      }, {
        field: "work",
        labelIntlId: "aboutMe.work"
      }
    ];
  }
  _step5Rules() {
    return [
      {
        field: "healthProblems",
        labelIntlId: "aboutMe.healthProblems"
      }, {
        field: "allergies",
        labelIntlId: "aboutMe.allergies"
      }
    ];
  }
  _step6Rules() {
    return [
      {
        field: "pets",
        labelIntlId: "aboutMe.pets"
      }, {
        field: "filmsOrBooks",
        labelIntlId: "aboutMe.filmsOrBooks"
      }, {
        field: "relax",
        labelIntlId: "aboutMe.relax"
      }, {
        field: "countriesWas",
        labelIntlId: "aboutMe.countriesWas"
      }, {
        field: "countriesDream",
        labelIntlId: "aboutMe.countriesDream"
      }, {
        field: "bestGift",
        labelIntlId: "aboutMe.bestGift"
      }, {
        field: "hobbies",
        labelIntlId: "aboutMe.hobbies"
      }, {
        field: "credo",
        labelIntlId: "aboutMe.credo"
      }
    ];
  }
  _step7Rules() {
    return [
      {
        field: "featuresRepel",
        labelIntlId: "aboutMe.featuresRepel"
      }, {
        field: "ageDifference",
        labelIntlId: "aboutMe.ageDifference"
      }, {
        field: "films",
        labelIntlId: "aboutMe.films"
      }, {
        field: "songs",
        labelIntlId: "aboutMe.songs"
      }, {
        field: "idealWeekend",
        labelIntlId: "aboutMe.idealWeekend"
      }, {
        field: "sleep",
        labelIntlId: "aboutMe.sleep"
      }, {
        field: "doing10",
        labelIntlId: "aboutMe.doing10"
      }, {
        field: "signatureDish",
        labelIntlId: "aboutMe.signatureDish"
      }, {
        field: "clubs",
        labelIntlId: "aboutMe.clubs"
      }, {
        field: "bestGiftReceived",
        labelIntlId: "aboutMe.bestGiftReceived"
      }, {
        field: "talents",
        labelIntlId: "aboutMe.talents"
      }
    ];
  }

  goTo(dir = true) {
    if (dir) {
      if (this.props.store.current === 0) {
        if (this.props.store.languages !== null && this.props.store.languages.length === 0) {
          toast.error(
            this.props.intl.formatMessage({
              id: "error.field"
            }, {
              field: this.props.intl.formatMessage({
                id: "aboutMe.languages"
              })
            })
          );

          return 0;
        }

        const images = this.props.store.images;
        if (images.length < 4 || images.length > 10) {
          toast.error(
            this.props.intl.formatMessage({
              id: "aboutMe.photos"
            }) 
          );
            return 0;
        }

        if (!this.props.store.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
          toast.error(
            this.props.intl.formatMessage({
              id: "aboutMe.invalidEmail"
            })
          )
          return 0;
        }

        if (this.props.store.birthday && parseInt((new Date(this.props.store.birthday)).getFullYear()) < 1900) {
          toast.error(
            this.props.intl.formatMessage({
              id: "error.field"
            }, {
              field: this.props.intl.formatMessage({
                id: "aboutMe.birthday"
              })
            })
          );

          return 0;
        }
        
        if (this.props.store.birthday && (new Date()).setFullYear((new Date()).getFullYear() - 18) < this.props.store.birthday) {
          toast.error(
            this.props.intl.formatMessage({
              id: "error.field"
            }, {
              field: this.props.intl.formatMessage({
                id: "aboutMe.birthday"
              })
            })
          );

          return 0;
        }

        // STEP0
        if (this.validate(this._step0Rules())) {
          this.props.dispatch({
            type: ABOUT_ME.INCREMENT_CURRENT
          });
        }
      }

      if (this.props.store.current === 1) {
        // STEP0
        if (this.validate(this._step1Rules())) {
          this.props.dispatch({
            type: ABOUT_ME.INCREMENT_CURRENT
          });
        }
      }

      if (this.props.store.current === 2) {
        // STEP0
        if (this.validate(this._step2Rules())) {
          this.props.dispatch({
            type: ABOUT_ME.INCREMENT_CURRENT
          });
        }
      }

      if (this.props.store.current === 3) {
        // STEP0
        if (this.validate(this._step3Rules())) {
          this.props.dispatch({
            type: ABOUT_ME.INCREMENT_CURRENT
          });
        }
      }

      if (this.props.store.current === 4) {
        // STEP0
        if ((this.props.store.work === "work0" || this.props.store.work === "work3" || this.props.store.work === "work4") && this.props.store.salary === null) {
          toast.error(
            this.props.intl.formatMessage({
              id: "error.field"
            }, {
              field: this.props.intl.formatMessage({
                id: "aboutMe.salary"
              })
            })
          );

          return 0;
        }
        if ((this.props.store.work === "work0" || this.props.store.work === "work3" || this.props.store.work === "work4") && this.props.store.workPlace === null) {
          toast.error(
            this.props.intl.formatMessage({
              id: "error.field"
            }, {
              field: this.props.intl.formatMessage({
                id: "aboutMe.workPlace"
              })
            })
          );

          return 0;
        }
        if (this.validate(this._step4Rules())) {
          this.props.dispatch({
            type: ABOUT_ME.INCREMENT_CURRENT
          });
        }
      }

      if (this.props.store.current === 5) {
        // STEP0
        if (this.validate(this._step5Rules())) {
          this.props.dispatch({
            type: ABOUT_ME.INCREMENT_CURRENT
          });
        }
      }

      if (this.props.store.current === 6) {
        if (this.props.store.pets === "have_pets" && this.props.store.havePets === null) {
          toast.error(
            this.props.intl.formatMessage({
              id: "error.field"
            }, {
              field: this.props.intl.formatMessage({
                id: "aboutMe.havePets"
              })
            })
          );

          return 0;

        }
        // STEP0
        if (this.validate(this._step6Rules())) {
          this.props.dispatch({
            type: ABOUT_ME.INCREMENT_CURRENT
          });
        }
      }
    } else {
      this.props.dispatch({
        type: ABOUT_ME.DECREMENT_CURRENT
      });
    }
  }
  start() {
    this.props.dispatch({
      type: ABOUT_ME.START,
      value: uid(32)
    });
  }
  finish() {
    if (this.validate(this._step7Rules())) {
      this.props.dispatch({
        type: ABOUT_ME.FINISH
      });

      this.props.history.push(routes.myTraits);
    }
  }

  setValue(field, value, type) {
    if (field === "age" && parseInt(value) > 100) {
      value = 100;
    }
    if (field === "age" && parseInt(value) < 0) {
      value = 18;
    }
    if (field === "weight" && parseInt(value) > 200) {
      value = 200;
    }
    if (field === "weight" && parseInt(value) < 0) {
      value = 0;
    }
    if (field === "height" && parseInt(value) > 250) {
      value = 250;
    }
    if (field === "height" && parseInt(value) < 0) {
      value = 0;
    }

    this.props.dispatch({
      type: ABOUT_ME.SET_VALUE,
      value: {
        value,
        field,
        type
      }
    });
  }
  loadCities(inputValue, callback) {
    if (inputValue.length > 1) {
      (async () => {
        let cities = await getCities(inputValue, this.props.store.liveCountry, this.props.store.language === "en");

        callback(cities);
      })();
    }
  }
  loadCountries(inputValue, callback) {
    if (inputValue.length > 1) {
      (async () => {
        let countries = await getCountries(inputValue, this.props.store.language === "en");

        callback(countries);
      })();
    }
  }

  componentDidMount() {
    initScroll();

    // if (!this.props.store.globalStarted) {
    //   this.props.history.push("/");
    // }

    // if (!this.props.store.partnersAppearanceFinished) {
    //   this.props.history.push(routes.partnersAppearance);
    // }

    // if (!this.props.store.aboutPartnerFinished) {
    //   this.props.history.push(routes.aboutPartner);
    // }

    // if (!this.props.store.partnersTraitsFinished) {
    //   this.props.history.push(routes.partnersTraits);
    // }

    // if (!this.props.store.testFinished) {
    //   this.props.history.push(routes.test);
    // }

    // if (!this.props.store.myAppearanceFinished) {
    //   this.props.history.push(routes.myAppearance);
    // }

    // if (this.props.store.finished) {
    //   this.props.history.push(routes.myTraits);
    // }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.store.current !== this.props.store.current) {
      initScroll();
    }
  }

  Guide() {
    return (
      <div>
        <div className={styles.questionHeader}>
          <h1>
            <FormattedMessage id="aboutMe.guideHeading" />
          </h1>
          <p className={styles.description}>
            <FormattedMessage id="aboutMe.guideDescription" />
          </p>
          <Button
            type={"primary"}
            onClick={() => this.start()}>
            <FormattedMessage id="buttonStart" />
          </Button>
        </div>
      </div>
    );
  }
  Step({headingIntlId, descriptionIntlId, children, prev, next, finish}) {
    return (
      <div>
        <div className={styles.questionHeader}>
          <span>
            <FormattedMessage
              id="aboutMe.questionOther"
              values={{
                number: this.props.store.current + 1,
                max: 8
              }}
            />
          </span>
          <h1>
            <FormattedMessage id={headingIntlId} />
          </h1>
          <p>
            <FormattedMessage id={descriptionIntlId} />
          </p>
        </div>
        <div className={styles.variants}>
          {children}
        </div>
        <div className={styles.buttons}>
          {prev ? (
            <Button
              type={"secondary"}
              onClick={() => this.goTo(false)}>
              <FormattedMessage id="buttonPrev" />
            </Button>
          ) : null}
          {next ? (
            <Button
              type={"primary"}
              onClick={() => this.goTo(true)}>
              <FormattedMessage id="buttonNext" />
            </Button>
          ) : null}
          {finish ? (
            <Button
              type={"primary"}
              onClick={() => this.finish()}>
              <FormattedMessage id="buttonFinish" />
            </Button>
          ) : null}
        </div>
      </div>
    );
  }

  Images() {
    return (
      <div>
        <Label>
          <FormattedMessage id={"aboutMe.photos"} />
        </Label>
        <div className={styles.images}>
          {
            this.props.store.images.map((item, i) => (
              <div key={i}>
                <FileImage item={item} />
              </div>
            ))
          }
          {this.props.store.images.length === 10 ? null : (<div>
            <FileUpload />
          </div>
          )}
        </div>
      </div>
    );
  }

  Step0() {
    return (
      <this.Step
        headingIntlId={"aboutMe.heading0"}
        descriptionIntlId={"aboutMe.description"}
        next={true}>
        <this.Images />
        <Input
          id={"name"}
          value={this.props.store.name}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.name"}
          placeholderIntlId={"aboutMe.namePH"}
        />
        <Input
          id={"email"}
          value={this.props.store.email}
          type={"email"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.email"}
          placeholderIntlId={"aboutMe.emailPH"}
        />
        <Input
          id={"phone"}
          value={this.props.store.phone}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.phone"}
          placeholderIntlId={"aboutMe.phonePH"}
        />
        <div>
          <Label>
            <FormattedMessage id={"aboutMe.birthday"} />
          </Label>
          <DatePicker
            locale={this.props.store.language === "ru" ? "ru-RU" : "en-GB"}
            showLeadingZeros={true}
            onChange={(e) => this.setValue("birthday", e)}
            value={this.props.store.birthday ? new Date(Date.parse(this.props.store.birthday)) : ""}
          />
        </div>
        {/*<Dropdown*/}
        {/*  id={"birthPlace"}*/}
        {/*  label={this.props.intl.formatMessage({ id: "aboutMe.birthPlace"})}*/}
        {/*  placeholder={this.props.intl.formatMessage({ id: "aboutMe.birthPlacePH"})}*/}
        {/*  isMulti={false}*/}
        {/*  options={this.props.intl.locale.indexOf("ru") + 1 ? myCountriesRu : myCountriesEn}*/}
        {/*  value={this.props.store.birthPlace}*/}
        {/*  onChange={(e) => this.setValue("birthPlace", e.value)}*/}
        {/*/>*/}
        <AsyncDropdown
          id={"birthPlace"}
          label={this.props.intl.formatMessage({ id: "aboutMe.birthPlace"})}
          placeholder={this.props.intl.formatMessage({ id: "aboutMe.birthPlacePH"})}
          cacheOptions={true}
          isMulti={false}
          defaultOptions={this.props.store.birthPlace ? [this.props.store.birthPlace] : []}
          loadOptions={debounce(this.loadCountries, 250)}
          value={this.props.store.birthPlace}
          onChange={(e) => this.setValue("birthPlace", e)}
          onSelectResetsInput={false}
          onBlurResetsInput={false}
          NoOptionsMessage = {'Начните ввод...'}
        />
        <div className="doubleGroup">
          <Label>
            <FormattedMessage id={"aboutMe.livePlace"} />
          </Label>
          <div className="double">
            <AsyncDropdown
              id={"liveCountry"}
              placeholder={this.props.intl.formatMessage({ id: "aboutMe.liveCountryPH"})}
              cacheOptions={true}
              defaultOptions={this.props.store.liveCountry ? [this.props.store.liveCountry] : []}
              loadOptions={debounce(this.loadCountries, 250)}
              value={this.props.store.liveCountry}
              onChange={(e) => this.setValue("liveCountry", e)}
              onSelectResetsInput={false}
              onBlurResetsInput={false}
              NoOptionsMessage = {'Начните ввод...'}
            />
            <AsyncDropdown
              id={"liveCity"}
              placeholder={this.props.intl.formatMessage({ id: "aboutMe.liveCityPH"})}
              cacheOptions={true}
              defaultOptions={this.props.store.liveCity ? [this.props.store.liveCity] : []}
              loadOptions={debounce(this.loadCities, 200)}
              value={this.props.store.liveCity}
              onChange={(e) => this.setValue("liveCity", e)}
              onSelectResetsInput={false}
              onBlurResetsInput={false}
              disabled={this.props.store.liveCountry === null}
              NoOptionsMessage = {'Начните ввод...'}
            />
          </div>
        </div>
        <DoubleInput
          labelIntlId={"aboutMe.weightAndHeight"}
          onChange={this.setValue}
          id1={"weight"}
          type1={"number"}
          value1={this.props.store.weight}
          placeholderIntlId1={"aboutMe.weightPH"}
          id2={"height"}
          type2={"number"}
          value2={this.props.store.height}
          placeholderIntlId2={"aboutMe.heightPH"}
        />
        <Dropdown
          id={"zodiacSign"}
          label={this.props.intl.formatMessage({id: "aboutMe.zodiacSign"})}
          placeholder={this.props.intl.formatMessage({id: "aboutMe.zodiacSignPH"})}
          value={this.props.store.zodiacSign}
          options={getZodiac(this.props.intl)}
          onChange={(e) => this.setValue("zodiacSign", e ? e.value : null)}
        />
        <RadioGroup
          labelIntlID={"aboutMe.maritalStatus"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "one",
              "maritalStatus",
              this.props.store.gender === 0 ? "aboutMe.maritalStatus0Female" : "aboutMe.maritalStatus0Male",
              this.props.store.maritalStatus === "one"
            ),
            new RadioProps(
              "divorced",
              "maritalStatus",
              this.props.store.gender === 0 ? "aboutMe.maritalStatus1Female" : "aboutMe.maritalStatus1Male",
              this.props.store.maritalStatus === "divorced"
            ),
            new RadioProps(
              "widow",
              "maritalStatus",
              this.props.store.gender === 0 ? "aboutMe.maritalStatus2Female" : "aboutMe.maritalStatus2Male",
              this.props.store.maritalStatus === "widow"
            )
          ]}
        />
        <Dropdown
          id={"languages"}
          label={this.props.intl.formatMessage({ id: "aboutMe.languages"})}
          placeholder={this.props.intl.formatMessage({ id: "aboutMe.languagesPH"})}
          isMulti={true}
          options={this.props.intl.locale.indexOf("ru") + 1 ? languagesRu : languagesEn}
          value={this.props.store.languages}
          onChange={(e) => this.setValue("languages", e)}
        />
      </this.Step>
    );
  }
  Step1() {
    return (
      <this.Step
        headingIntlId={"aboutMe.heading1"}
        descriptionIntlId={"aboutMe.description"}
        prev={true}
        next={true}>
        <RadioGroup
          labelIntlID={"aboutMe.movingCountry"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "movingCountry_true",
              "movingCountry",
              "aboutMe.movingCountryPH1",
              this.props.store.movingCountry === true
            ),
            new RadioProps(
              "movingCountry_false",
              "movingCountry",
              "aboutMe.movingCountryPH2",
              this.props.store.movingCountry === false
            )
          ]}
        />
        <RadioGroup
          labelIntlID={"aboutMe.movingCity"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "movingCity_true",
              "movingCity",
              "aboutMe.movingCityPH1",
              this.props.store.movingCity === true
            ),
            new RadioProps(
              "movingCity_false",
              "movingCity",
              "aboutMe.movingCityPH2",
              this.props.store.movingCity === false
            )
          ]}
        />
      </this.Step>
    );
  }
  Step2() {
    return (
      <this.Step
        headingIntlId={"aboutMe.heading2"}
        descriptionIntlId={"aboutMe.description"}
        prev={true}
        next={true}>
        <RadioGroup
          labelIntlID={"aboutMe.children"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "children_true",
              "children",
              "aboutMe.childrenPH1",
              this.props.store.children === true
            ),
            new RadioProps(
              "children_false",
              "children",
              "aboutMe.childrenPH2",
              this.props.store.children === false
            )
          ]}
        />
        {
          this.props.store.children ? (
            <Input
              id={"childrenCount"}
              value={this.props.store.childrenCount}
              type={"text"}
              onChange={this.setValue}
              labelIntlId={"aboutMe.childrenCount"}
              placeholderIntlId={"aboutMe.childrenCountPH"}
            />
          ) : null
        }
        <RadioGroup
          labelIntlID={"aboutMe.childrenDesire"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "yes",
              "childrenDesire",
              "aboutMe.childrenDesirePH1",
            this.props.store.childrenDesire === "yes"
            ),
            new RadioProps(
              "no",
              "childrenDesire",
              "aboutMe.childrenDesirePH2",
              this.props.store.childrenDesire === "no"
            ),
            new RadioProps(
              "maybe",
              "childrenDesire",
              "aboutMe.childrenDesirePH3",
              this.props.store.childrenDesire === "maybe"
            )
          ]}
        />
      </this.Step>
    );
  }
  Step3() {
    return (
      <this.Step
        headingIntlId={"aboutMe.heading3"}
        descriptionIntlId={"aboutMe.description"}
        prev={true}
        next={true}>
        <RadioGroup
          labelIntlID={"aboutMe.smoking"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "smoking0",
              "smoking",
              "aboutMe.smoking0",
              this.props.store.smoking === "smoking0"
            ),
            new RadioProps(
              "smoking1",
              "smoking",
              "aboutMe.smoking1",
              this.props.store.smoking === "smoking1"
            ),
            new RadioProps(
              "smoking2",
              "smoking",
              "aboutMe.smoking2",
              this.props.store.smoking === "smoking2"
            )
          ]}
        />
        <RadioGroup
          labelIntlID={"aboutMe.alcohol"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "alcohol0",
              "alcohol",
              "aboutMe.alcohol0",
              this.props.store.alcohol === "alcohol0"
            ),
            new RadioProps(
              "alcohol1",
              "alcohol",
              "aboutMe.alcohol1",
              this.props.store.alcohol === "alcohol1"
            ),
            new RadioProps(
              "alcohol2",
              "alcohol",
              "aboutMe.alcohol2",
              this.props.store.alcohol === "alcohol2"
            ),
            new RadioProps(
              "alcohol3",
              "alcohol",
              "aboutMe.alcohol3",
              this.props.store.alcohol === "alcohol3"
            )
          ]}
        />
        <Dropdown
          id={"religion"}
          label={this.props.intl.formatMessage({ id: "aboutMe.religion"})}
          placeholder={this.props.intl.formatMessage({ id: "aboutMe.religionPH"})}
          options={this.props.intl.locale.indexOf("ru") + 1 ? religionRu : religionEn}
          value={this.props.store.religion}
          onChange={(e) => this.setValue("religion", e.value)}
        />
        <RadioGroup
          labelIntlID={"aboutMe.sport"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "sport0",
              "sport",
              "aboutMe.sport0",
              this.props.store.sport === "sport0"
            ),
            new RadioProps(
              "sport1",
              "sport",
              "aboutMe.sport1",
              this.props.store.sport === "sport1"
            ),
            new RadioProps(
              "sport2",
              "sport",
              "aboutMe.sport2",
              this.props.store.sport === "sport2"
            )
          ]}
        />
      </this.Step>
    );
  }
  Step4() {
    return (
      <this.Step
        headingIntlId={"aboutMe.heading4"}
        descriptionIntlId={"aboutMe.description"}
        prev={true}
        next={true}>
        <Dropdown
          id={"education"}
          label={this.props.intl.formatMessage({ id: "aboutMe.education"})}
          placeholder={this.props.intl.formatMessage({ id: "aboutMe.educationPH"})}
          options={this.props.intl.locale.indexOf("ru") + 1 ? educationRu : educationEn}
          value={this.props.store.education}
          onChange={(e) => this.setValue("education", e.value)}
        />
        <Input
          id={"educationPlace"}
          value={this.props.store.educationPlace}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.educationPlace"}
          placeholderIntlId={"aboutMe.educationPlacePH"}
        />
        <Dropdown
          id={"work"}
          label={this.props.intl.formatMessage({ id: "aboutMe.work"})}
          placeholder={this.props.intl.formatMessage({ id: "aboutMe.workPH"})}
          options={this.props.intl.locale.indexOf("ru") + 1 ? workRu : workEn}
          value={this.props.store.work}
          onChange={(e) => this.setValue("work", e.value)}
        />
        {
          this.props.store.work === "work0" ? (
            <Input
              id={"workPlace"}
              value={this.props.store.workPlace}
              as={"textarea"}
              type={"text"}
              onChange={this.setValue}
              labelIntlId={"aboutMe.workPlace"}
              placeholderIntlId={"aboutMe.workPlacePH"}
            />
          ) : null
        }
        {
          this.props.store.work === "work0" || this.props.store.work === "work3" || this.props.store.work === "work4" ? (
            <Dropdown
              id={"salary"}
              label={this.props.intl.formatMessage({ id: "aboutMe.salary"})}
              placeholder={this.props.intl.formatMessage({ id: "aboutMe.salaryPH"})}
              options={this.props.intl.locale.indexOf("ru") + 1 ? salaryRu : salaryEn}
              value={this.props.store.salary}
              onChange={(e) => this.setValue("salary", e.value)}
            />
          ) : null
        }
      </this.Step>
    );
  }
  Step5() {
    return (
      <this.Step
        headingIntlId={"aboutMe.heading5"}
        descriptionIntlId={"aboutMe.description"}
        prev={true}
        next={true}>
        <Input
          id={"healthProblems"}
          value={this.props.store.healthProblems}
          as={"textarea"}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.healthProblems"}
          placeholderIntlId={"aboutMe.healthProblemsPH"}
        />
        <Input
          id={"allergies"}
          value={this.props.store.allergies}
          as={"textarea"}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.allergies"}
          placeholderIntlId={"aboutMe.allergiesPH"}
        />
      </this.Step>
    );
  }
  Step6() {
    return (
      <this.Step
        headingIntlId={"aboutMe.heading6"}
        descriptionIntlId={"aboutMe.description"}
        prev={true}
        next={true}>
        <Dropdown
          id={"pets"}
          label={this.props.intl.formatMessage({ id: "aboutMe.pets"})}
          placeholder={this.props.intl.formatMessage({ id: "aboutMe.petsPH"})}
          options={this.props.intl.locale.indexOf("ru") + 1 ? petsRu : petsEn}
          value={this.props.store.pets}
          onChange={(e) => this.setValue("pets", e.value)}
        />
        {
          this.props.store.pets === "have_pets" ? (
            <Input
              id={"havePets"}
              value={this.props.store.havePets}
              as={"textarea"}
              type={"text"}
              onChange={this.setValue}
              labelIntlId={"aboutMe.havePets"}
              placeholderIntlId={"aboutMe.havePetsPH"}
            />
          ) : null
        }
        <RadioGroup
          labelIntlID={"aboutMe.filmsOrBooks"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "film",
              "filmsOrBooks",
              "aboutMe.filmsOrBooksFilmsPH",
              this.props.store.filmsOrBooks === "film"
            ),
            new RadioProps(
              "book",
              "filmsOrBooks",
              "aboutMe.filmsOrBooksBooksPH",
              this.props.store.filmsOrBooks === "book"
            )
          ]}
        />
        <RadioGroup
          labelIntlID={"aboutMe.relax"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "beach",
              "relax",
              "aboutMe.relaxPH0",
              this.props.store.relax === "beach"
            ),
            new RadioProps(
              "extreme",
              "relax",
              "aboutMe.relaxPH1",
              this.props.store.relax === "extreme"
            ),
            new RadioProps(
              "calm",
              "relax",
              "aboutMe.relaxPH2",
              this.props.store.relax === "calm"
            )
          ]}
        />
        <Dropdown
          id={"countriesWas"}
          label={this.props.intl.formatMessage({ id: "aboutMe.countriesWas"})}
          placeholder={this.props.intl.formatMessage({ id: "aboutMe.countriesWasPH"})}
          isMulti={true}
          options={this.props.intl.locale.indexOf("ru") + 1 ? myCountriesRu : myCountriesEn}
          value={this.props.store.countriesWas}
          onChange={(e) => this.setValue("countriesWas", e)}
        />
        {/*<AsyncDropdown*/}
        {/*  id={"countriesWas"}*/}
        {/*  label={this.props.intl.formatMessage({ id: "aboutMe.countriesWas"})}*/}
        {/*  placeholder={this.props.intl.formatMessage({ id: "aboutMe.countriesWasPH"})}*/}
        {/*  cacheOptions={true}*/}
        {/*  isMulti={true}*/}
        {/*  defaultOptions={this.props.store.countriesWas ? [this.props.store.countriesWas] : []}*/}
        {/*  loadOptions={debounce(this.loadCountries, 250)}*/}
        {/*  value={this.props.store.countriesWas}*/}
        {/*  onChange={(e) => this.setValue("countriesWas", e)}*/}
        {/*  onSelectResetsInput={false}*/}
        {/*  onBlurResetsInput={false}*/}
        {/*  NoOptionsMessage = {'Начните ввод...'}*/}
        {/*/>*/}
        <Dropdown
          id={"countriesDream"}
          label={this.props.intl.formatMessage({ id: "aboutMe.countriesDream"})}
          placeholder={this.props.intl.formatMessage({ id: "aboutMe.countriesDreamPH"})}
          isMulti={true}
          options={this.props.intl.locale.indexOf("ru") + 1 ? myCountriesRu : myCountriesEn}
          value={this.props.store.countriesDream}
          onChange={(e) => this.setValue("countriesDream", e)}
        />
        {/*<AsyncDropdown*/}
        {/*  id={"countriesDream"}*/}
        {/*  label={this.props.intl.formatMessage({ id: "aboutMe.countriesDream"})}*/}
        {/*  placeholder={this.props.intl.formatMessage({ id: "aboutMe.countriesDreamPH"})}*/}
        {/*  cacheOptions={true}*/}
        {/*  isMulti={true}*/}
        {/*  defaultOptions={this.props.store.countriesDream ? [this.props.store.countriesDream] : []}*/}
        {/*  loadOptions={debounce(this.loadCountries, 250)}*/}
        {/*  value={this.props.store.countriesDream}*/}
        {/*  onChange={(e) => this.setValue("countriesDream", e)}*/}
        {/*  onSelectResetsInput={false}*/}
        {/*  onBlurResetsInput={false}*/}
        {/*  NoOptionsMessage = {'Начните ввод...'}*/}
        {/*/>*/}
        <Input
          id={"bestGift"}
          value={this.props.store.bestGift}
          as={"textarea"}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.bestGift"}
          placeholderIntlId={"aboutMe.bestGiftPH"}
        />
        <Input
          id={"hobbies"}
          value={this.props.store.hobbies}
          as={"textarea"}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.hobbies"}
          placeholderIntlId={"aboutMe.hobbiesPH"}
        />
        <Input
          id={"credo"}
          value={this.props.store.credo}
          as={"textarea"}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.credo"}
          placeholderIntlId={"aboutMe.credoPH"}
        />
      </this.Step>
    );
  }
  Step7() {
    return (
      <this.Step
        headingIntlId={"aboutMe.heading7"}
        descriptionIntlId={"aboutMe.description"}
        prev={true}
        finish={true}>
        <Input
          id={"featuresRepel"}
          value={this.props.store.featuresRepel}
          as={"textarea"}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.featuresRepel"}
          placeholderIntlId={"aboutMe.featuresRepelPH"}
        />
        <Input
          id={"ageDifference"}
          value={this.props.store.ageDifference}
          as={"textarea"}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.ageDifference"}
          placeholderIntlId={"aboutMe.ageDifferencePH"}
        />
        <Input
          id={"films"}
          value={this.props.store.films}
          as={"textarea"}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.films"}
          placeholderIntlId={"aboutMe.filmsPH"}
        />
        <Input
          id={"songs"}
          value={this.props.store.songs}
          as={"textarea"}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.songs"}
          placeholderIntlId={"aboutMe.songsPH"}
        />
        <Input
          id={"idealWeekend"}
          value={this.props.store.idealWeekend}
          as={"textarea"}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.idealWeekend"}
          placeholderIntlId={"aboutMe.idealWeekendPH"}
        />
        <RadioGroup
          labelIntlID={"aboutMe.sleep"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "owl",
              "sleep",
              "aboutMe.sleepPH0",
              this.props.store.sleep === "owl"
            ),
            new RadioProps(
              "lark",
              "sleep",
              "aboutMe.sleepPH1",
              this.props.store.sleep === "lark"
            ),
            new RadioProps(
              "differently",
              "sleep",
              "aboutMe.sleepPH2",
              this.props.store.sleep === "differently"
            )
          ]}
        />
        <Input
          id={"doing10"}
          value={this.props.store.doing10}
          as={"textarea"}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.doing10"}
          placeholderIntlId={"aboutMe.doing10PH"}
        />
        <Input
          id={"signatureDish"}
          value={this.props.store.signatureDish}
          as={"textarea"}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.signatureDish"}
          placeholderIntlId={"aboutMe.signatureDishPH"}
        />
        <RadioGroup
          labelIntlID={"aboutMe.clubs"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "yes",
              "clubs",
              "aboutMe.clubsPH0",
              this.props.store.clubs === "yes"
            ),
            new RadioProps(
              "no",
              "clubs",
              "aboutMe.clubsPH1",
              this.props.store.clubs === "no"
            ),
            new RadioProps(
              "sometimes",
              "clubs",
              "aboutMe.clubsPH2",
              this.props.store.clubs === "sometimes"
            )
          ]}
        />
        <Input
          id={"bestGiftReceived"}
          value={this.props.store.bestGiftReceived}
          as={"textarea"}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.bestGiftReceived"}
          placeholderIntlId={"aboutMe.bestGiftReceivedPH"}
        />
        <Input
          id={"talents"}
          value={this.props.store.talents}
          as={"textarea"}
          type={"text"}
          onChange={this.setValue}
          labelIntlId={"aboutMe.talents"}
          placeholderIntlId={"aboutMe.talentsPH"}
        />
      </this.Step>
    );
  }

  Switch() {
    if (!this.props.store.started) {
      return (
        <this.Guide />
      );
    }

    if (this.state.loading) {
      return (
        <div className={"loader"}>
          <BeatLoader color={"#E6B43F"} loading={true}  size={15} />
        </div>
      );
    }

    switch (this.props.store.current) {
      default:
      case 0:
        return (<this.Step0 />);
      case 1:
        return (<this.Step1 />);
      case 2:
        return (<this.Step2 />);
      case 3:
        return (<this.Step3 />);
      case 4:
        return (<this.Step4 />);
      case 5:
        return (<this.Step5 />);
      case 6:
        return (<this.Step6 />);
      case 7:
        return (<this.Step7 />);
    }
  }

  render() {
    return (
      <div className={styles.test}>
        <div className={styles.left}>
          <div>
            <div className={styles.container}>
              <Topbar />
              <TabsProgress active={5} />
              <this.Switch />
            </div>
          </div>
          <div className={`${styles.container} ${styles.progressBar}`}>
            <ProgressBar
              current={this.props.store.current}
              total={7}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  store: {
    ...store.aboutMe,
    language: store.global.language,
    gender: store.partnersAppearance.gender === 0 ? 1 : 0,
    partnersAppearanceFinished: store.partnersAppearance.finished,
    aboutPartnerFinished: store.aboutPartner.finished,
    testFinished: store.test.finished,
    partnersTraitsFinished: store.partnersTraits.finished,
    myAppearanceFinished: store.myAppearance.finished,
    globalStarted: store.global.started,
    images: store.global.images
  }
});

export default injectIntl(withRouter(connect(mapStateToProps)(App)));