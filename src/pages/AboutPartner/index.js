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
import {ABOUT_PARTNER} from "../../store/actionTypes";
import {routes} from "../../router/config";
import {getZodiac, getZodiacPartner} from "../../utils/zodiac";
import BeatLoader from "react-spinners/BeatLoader";
import DoubleInput from "../../components/DoubleInput";
import Dropdown from "../../components/Dropdown";
import {countriesEn, countriesRu} from "../../utils/countries";
import {languagesEn, languagesRu} from "../../utils/languages";
import RadioGroup from "../../components/RadioGroup";
import {RadioProps} from "../../components/Radio";
import Input from "../../components/Input";
import {religionEn, religionRu} from "../../utils/religion";
import toaster from "react-hot-toast";
import debounce from "debounce";
import AsyncDropdown from "../../components/AsyncDropdown";
import {getCountries} from "../../utils/api";

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
    this.Guide = this.Guide.bind(this);
    this.loadCountries = this.loadCountries.bind(this);

    this.state = {
      loading: false,
      languages: []
    }
  }

  validateField(item) {
    if (item.double) {
      if (this.props.store[item.field1] === null || this.props.store[item.field2] === null) {
        toaster.error(
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
      if (this.props.store[item.field] === null || (typeof this.props.store[item.field] === "object" && this.props.store[item.field].length === 0)) {
        toaster.error(
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
        double: true,
        field1: "ageFrom",
        field2: "ageTo",
        labelIntlId: "aboutPartner.ageLabel"
      }, {
        field: "livePlace",
        labelIntlId: "aboutPartner.livePlace"
      }, {
        field: "zodiacSign",
        labelIntlId: "aboutPartner.zodiacSign"
      }, {
        field: "height",
        labelIntlId: "aboutPartner.height"
      }, {
        double: true,
        field1: "weightFrom",
        field2: "weightTo",
        labelIntlId: "aboutPartner.weight"
      }, {
        field: "languages",
        labelIntlId: "aboutPartner.languages"
      }
    ];
  }
  _step1Rules() {
    return [
      {
        field: "movingCountry",
        labelIntlId: "aboutPartner.movingCountry"
      }, {
        field: "movingCity",
        labelIntlId: "aboutPartner.movingCity"
      }
    ];
  }
  _step2Rules() {
    let rules = [
      {
        field: "children",
        labelIntlId: this.props.store.gender === 0
          ? this.props.intl.formatMessage({id: "aboutPartner.childrenFemale"})
          : this.props.intl.formatMessage({id: "aboutPartner.childrenMale"})
      }, {
        field: "childrenDesire",
        labelIntlId: this.props.store.gender === 0
          ? this.props.intl.formatMessage({id: "aboutPartner.childrenDesireFemale"})
          : this.props.intl.formatMessage({id: "aboutPartner.childrenDesireMale"})
      }
    ];

    if (this.props.store.children === "children_true") {
      rules.push(
        {
          field: "childrenCount",
          labelIntlId: this.props.store.gender === 0
            ? this.props.intl.formatMessage({id: "aboutPartner.childrenCountFemale"})
            : this.props.intl.formatMessage({id: "aboutPartner.childrenCountMale"})
        }
      );
    }

    return rules;
  }
  _step3Rules() {
    return [
      {
        field: "smoking",
        labelIntlId: this.props.store.gender === 0
          ? this.props.intl.formatMessage({id: "aboutPartner.smokingFemale"})
          : this.props.intl.formatMessage({id: "aboutPartner.smokingMale"})
      }, {
        field: "alcohol",
        labelIntlId: this.props.store.gender === 0
          ? this.props.intl.formatMessage({id: "aboutPartner.alcoholFemale"})
          : this.props.intl.formatMessage({id: "aboutPartner.alcoholMale"})
      },  {
        field: "religionMatter",
        labelIntlId: this.props.store.gender === 0
          ? this.props.intl.formatMessage({id: "aboutPartner.religionMatter"})
          : this.props.intl.formatMessage({id: "aboutPartner.religionMatter"})
      }, {
        field: "sport",
        labelIntlId: this.props.store.gender === 0
          ? this.props.intl.formatMessage({id: "aboutPartner.sportFemale"})
          : this.props.intl.formatMessage({id: "aboutPartner.sportMale"})
      }
    ];
  }

  goTo(dir = true) {
    if (dir) {
      if (this.props.store.current === 0) {
        // STEP0
        if (this.props.store.ageFrom > this.props.store.ageTo) {
          toaster.error(
            this.props.intl.formatMessage({
              id: "aboutPartner.ageArray"
            })
          );

          return 0;
        }
        if (this.props.store.weightFrom > this.props.store.weightTo) {
          toaster.error(
            this.props.intl.formatMessage({
              id: "aboutPartner.weightArray"
            })
          );

          return 0;
        }
        if (this.validate(this._step0Rules())) {
          this.props.dispatch({
            type: ABOUT_PARTNER.INCREMENT_CURRENT
          });
        }
      }

      if (this.props.store.current === 1) {
        // STEP0
        if (this.validate(this._step1Rules())) {
          this.props.dispatch({
            type: ABOUT_PARTNER.INCREMENT_CURRENT
          });
        }
      }

      if (this.props.store.current === 2) {
        // STEP0
        if (this.validate(this._step2Rules())) {
          this.props.dispatch({
            type: ABOUT_PARTNER.INCREMENT_CURRENT
          });
        }
      }
    } else {
      this.props.dispatch({
        type: ABOUT_PARTNER.DECREMENT_CURRENT
      });
    }
  }
  start() {
    this.props.dispatch({
      type: ABOUT_PARTNER.START
    });
  }
  finish() {
    if (this.props.store.religionMatter === "religionMatter0" && this.props.store.religion === null) {
      toaster.error(
        this.props.intl.formatMessage({
          id: "error.field"
        }, {
          field: this.props.intl.formatMessage({
            id: this.props.store.gender === 0 ? "aboutPartner.religionFemale" : "aboutPartner.religionMale"
          })
        })
      );

      return 0;
    }
    if (this.validate(this._step3Rules())) {
      this.props.dispatch({
        type: ABOUT_PARTNER.FINISH
      });

      this.props.history.push(routes.partnersTraits);
    }
  }

  setValue(field, value, type) {
    if ((field === "ageFrom" || field === "ageTo") && parseInt(value) > 100) {
      value = 100;
    }
    if ((field === "ageFrom" || field === "ageTo") && parseInt(value) < 0) {
      value = 18;
    }
    if ((field === "weightFrom" || field === "weightTo") && parseInt(value) > 200) {
      value = 200;
    }

    if (field === "height" && value === "height0") {
      if (this.props.store.gender === 0) {
        value = [150, 160];
      } else {
        value = [170, 180];
      }

      value.push("height0");
    }

    if (field === "height" && value === "height1") {
      if (this.props.store.gender === 0) {
        value = [160, 170];
      } else {
        value = [180, 190];
      }

      value.push("height1");
    }

    if (field === "height" && value === "height2") {
      if (this.props.store.gender === 0) {
        value = [170, 185];
      } else {
        value = [190, 200];
      }

      value.push("height2");
    }

    this.props.dispatch({
      type: ABOUT_PARTNER.SET_VALUE,
      value: {
        value,
        field,
        type
      }
    });
  }

  componentDidMount() {
    initScroll();

    if (!this.props.store.globalStarted) {
      this.props.history.push("/");
    }

    if (!this.props.store.partnersAppearanceFinished) {
      this.props.history.push(routes.partnersAppearance);
    }

    if (this.props.store.finished) {
      this.props.history.push(routes.partnersTraits);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.store.current !== this.props.store.current) {
      initScroll();
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

  Guide() {
    return (
      <div>
        <div className={styles.questionHeader}>
          <h1>
            <FormattedMessage id="aboutPartner.guideHeading" />
          </h1>
          <p className={styles.description}>
            <FormattedMessage id="aboutPartner.guideDescription" />
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
              id="aboutPartner.questionOther"
              values={{
                number: this.props.store.current + 1,
                max: 4
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
  Step0() {
    return (
      <this.Step
        headingIntlId={"aboutPartner.heading0"}
        descriptionIntlId={"aboutPartner.description"}
        next={true}>
        <DoubleInput
          labelIntlId={"aboutPartner.ageLabel"}
          onChange={this.setValue}
          id1={"ageFrom"}
          type1={"number"}
          value1={this.props.store.ageFrom}
          placeholderIntlId1={"aboutPartner.agePH1"}
          id2={"ageTo"}
          type2={"number"}
          value2={this.props.store.ageTo}
          placeholderIntlId2={"aboutPartner.agePH2"}
        />
        <Dropdown
          id={"livePlace"}
          label={this.props.intl.formatMessage({ id: "aboutPartner.livePlace"})}
          placeholder={this.props.intl.formatMessage({ id: "aboutPartner.livePlacePH"})}
          options={this.props.store.language === "en" ? countriesEn : countriesRu}
          isMulti={true}
          value={this.props.store.livePlace}
          onChange={(e) => this.setValue("livePlace", e)}
        />
        {/*<AsyncDropdown*/}
        {/*  id={"livePlace"}*/}
        {/*  label={this.props.intl.formatMessage({ id: "aboutPartner.livePlace"})}*/}
        {/*  placeholder={this.props.intl.formatMessage({ id: "aboutPartner.livePlacePH"})}*/}
        {/*  cacheOptions={true}*/}
        {/*  isMulti={true}*/}
        {/*  defaultOptions={[]}*/}
        {/*  loadOptions={debounce(this.loadCountries, 200)}*/}
        {/*  value={this.props.store.livePlace}*/}
        {/*  onChange={(e) => this.setValue("livePlace", e)}*/}
        {/*  onSelectResetsInput={false}*/}
        {/*  onBlurResetsInput={false}*/}
        {/*  NoOptionsMessage = {'Начните ввод...'}*/}
        {/*/>*/}
        {/*<Dropdown*/}
        {/*  id={"birthPlace"}*/}
        {/*  label={this.props.intl.formatMessage({ id: "aboutPartner.birthPlace"})}*/}
        {/*  placeholder={this.props.intl.formatMessage({ id: "aboutPartner.birthPlacePH"})}*/}
        {/*  isMulti={true}*/}
        {/*  options={this.props.intl.locale.indexOf("ru") + 1 ? countriesRu : countriesEn}*/}
        {/*  value={this.props.store.birthPlace}*/}
        {/*  onChange={(e) => this.setValue("birthPlace", e)}*/}
        {/*/>*/}
        {/*<Dropdown*/}
        {/*  id={"livePlace"}*/}
        {/*  label={this.props.intl.formatMessage({ id: "aboutPartner.livePlace"})}*/}
        {/*  placeholder={this.props.intl.formatMessage({ id: "aboutPartner.livePlacePH"})}*/}
        {/*  isMulti={true}*/}
        {/*  options={this.props.intl.locale.indexOf("ru") + 1 ? countriesRu : countriesEn}*/}
        {/*  value={this.props.store.livePlace}*/}
        {/*  onChange={(e) => this.setValue("livePlace", e)}*/}
        {/*/>*/}
        <Dropdown
          id={"zodiacSign"}
          label={this.props.intl.formatMessage({id: "aboutPartner.zodiacSign"})}
          placeholder={this.props.intl.formatMessage({id: "aboutPartner.zodiacSignPH"})}
          value={this.props.store.zodiacSign}
          options={getZodiacPartner(this.props.intl)}
          onChange={(e) => this.setValue("zodiacSign", e ? e.value : null)}
        />
        <RadioGroup
          labelIntlID={"aboutPartner.height"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "height0",
              "height",
              this.props.store.gender === 0 ? "aboutPartner.heightFemale0" : "aboutPartner.heightMale0",
              this.props.store.height === "height0"
            ),
            new RadioProps(
              "height1",
              "height",
              this.props.store.gender === 0 ? "aboutPartner.heightFemale1" : "aboutPartner.heightMale1",
              this.props.store.height === "height1"
            ),
            new RadioProps(
              "height2",
              "height",
              this.props.store.gender === 0 ? "aboutPartner.heightFemale2" : "aboutPartner.heightMale2",
              this.props.store.height === "height2"
            )
          ]}
        />
        <DoubleInput
          labelIntlId={"aboutPartner.weight"}
          onChange={this.setValue}
          id1={"weightFrom"}
          type1={"number"}
          value1={this.props.store.weightFrom}
          placeholderIntlId1={"aboutPartner.weightPH1"}
          id2={"weightTo"}
          type2={"number"}
          value2={this.props.store.weightTo}
          placeholderIntlId2={"aboutPartner.weightPH2"}
        />
        {/*<RadioGroup*/}
        {/*  labelIntlID={"aboutPartner.maritalStatus"}*/}
        {/*  onChange={this.setValue}*/}
        {/*  variants={[*/}
        {/*    new RadioProps(*/}
        {/*      "one",*/}
        {/*      "maritalStatus",*/}
        {/*      this.props.store.gender === 0 ? "aboutPartner.maritalStatus0Female" : "aboutPartner.maritalStatus0Male",*/}
        {/*      this.props.store.maritalStatus === "one"*/}
        {/*    ),*/}
        {/*    new RadioProps(*/}
        {/*      "divorced",*/}
        {/*      "maritalStatus",*/}
        {/*      this.props.store.gender === 0 ? "aboutPartner.maritalStatus1Female" : "aboutPartner.maritalStatus1Male",*/}
        {/*      this.props.store.maritalStatus === "divorced"*/}
        {/*    ),*/}
        {/*    new RadioProps(*/}
        {/*      "widow",*/}
        {/*      "maritalStatus",*/}
        {/*      this.props.store.gender === 0 ? "aboutPartner.maritalStatus2Female" : "aboutPartner.maritalStatus2Male",*/}
        {/*      this.props.store.maritalStatus === "widow"*/}
        {/*    )*/}
        {/*  ]}*/}
        {/*/>*/}
        <Dropdown
          id={"languages"}
          label={this.props.intl.formatMessage({ id: "aboutPartner.languages"})}
          placeholder={this.props.intl.formatMessage({ id: "aboutPartner.languagesPH"})}
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
        headingIntlId={"aboutPartner.heading1"}
        descriptionIntlId={"aboutPartner.description"}
        prev={true}
        next={true}>
        <RadioGroup
          labelIntlID={"aboutPartner.movingCountry"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "movingCountry_true",
              "movingCountry",
              "aboutPartner.movingCountryPH1",
              this.props.store.movingCountry === true
            ),
            new RadioProps(
              "movingCountry_false",
              "movingCountry",
              "aboutPartner.movingCountryPH2",
              this.props.store.movingCountry === false
            )
          ]}
        />
        <RadioGroup
          labelIntlID={"aboutPartner.movingCity"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "movingCity_true",
              "movingCity",
              "aboutPartner.movingCityPH1",
              this.props.store.movingCity === true
            ),
            new RadioProps(
              "movingCity_false",
              "movingCity",
              "aboutPartner.movingCityPH2",
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
        headingIntlId={"aboutPartner.heading2"}
        descriptionIntlId={"aboutPartner.description"}
        prev={true}
        next={true}>
        <RadioGroup
          labelIntlID={this.props.store.gender === 0 ? "aboutPartner.childrenFemale" : "aboutPartner.childrenMale" }
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "children_any",
              "children",
              "answerAny",
              this.props.store.children === "children_any"
            ),
            new RadioProps(
              "children_true",
              "children",
              this.props.store.gender === 0 ? "aboutPartner.childrenFemalePH1" : "aboutPartner.childrenMalePH1",
              this.props.store.children === "children_true"
            ),
            new RadioProps(
              "children_false",
              "children",
              this.props.store.gender === 0 ? "aboutPartner.childrenFemalePH2" : "aboutPartner.childrenMalePH2",
              this.props.store.children === "children_false"
            )
          ]}
        />
        {
          this.props.store.children === "children_true" ? (
            <Input
              id={"childrenCount"}
              value={this.props.store.childrenCount}
              type={"text"}
              onChange={this.setValue}
              labelIntlId={this.props.store.gender === 0 ? "aboutPartner.childrenCountFemale" : "aboutPartner.childrenCountMale"}
              placeholderIntlId={"aboutPartner.childrenCountPH"}
            />
          ) : null
        }
        <RadioGroup
          labelIntlID={this.props.store.gender === 0 ? "aboutPartner.childrenDesireFemale" : "aboutPartner.childrenDesireMale"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "yes",
              "childrenDesire",
              this.props.store.gender === 0 ? "aboutPartner.childrenDesireFemalePH1" : "aboutPartner.childrenDesireMalePH1",
            this.props.store.childrenDesire === "yes"
            ),
            new RadioProps(
              "no",
              "childrenDesire",
              this.props.store.gender === 0 ? "aboutPartner.childrenDesireFemalePH2" : "aboutPartner.childrenDesireMalePH2",
              this.props.store.childrenDesire === "no"
            ),
            new RadioProps(
              "maybe",
              "childrenDesire",
              this.props.store.gender === 0 ? "aboutPartner.childrenDesireFemalePH3" : "aboutPartner.childrenDesireMalePH3",
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
        headingIntlId={"aboutPartner.heading3"}
        descriptionIntlId={"aboutPartner.description"}
        prev={true}
        finish={true}>
        <RadioGroup
          labelIntlID={this.props.store.gender === 0 ? "aboutPartner.smokingFemale" : "aboutPartner.smokingMale"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "smoking0",
              "smoking",
              "aboutPartner.smoking0",
              this.props.store.smoking === "smoking0"
            ),
            new RadioProps(
              "smoking1",
              "smoking",
              "aboutPartner.smoking1",
              this.props.store.smoking === "smoking1"
            ),
            new RadioProps(
              "smoking2",
              "smoking",
              "aboutPartner.smoking2",
              this.props.store.smoking === "smoking2"
            ),
            new RadioProps(
              "smoking3",
              "smoking",
              "aboutPartner.smoking3",
              this.props.store.smoking === "smoking3"
            )
          ]}
        />
        <RadioGroup
          labelIntlID={this.props.store.gender === 0 ? "aboutPartner.alcoholFemale" : "aboutPartner.alcoholMale"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "alcohol0",
              "alcohol",
              "aboutPartner.alcohol0",
              this.props.store.alcohol === "alcohol0"
            ),
            new RadioProps(
              "alcohol1",
              "alcohol",
              "aboutPartner.alcohol1",
              this.props.store.alcohol === "alcohol1"
            ),
            new RadioProps(
              "alcohol2",
              "alcohol",
              "aboutPartner.alcohol2",
              this.props.store.alcohol === "alcohol2"
            ),
            new RadioProps(
              "alcohol3",
              "alcohol",
              "aboutPartner.alcohol3",
              this.props.store.alcohol === "alcohol3"
            ),
            new RadioProps(
              "alcohol4",
              "alcohol",
              "aboutPartner.alcohol4",
              this.props.store.alcohol === "alcohol4"
            )
          ]}
        />
        <RadioGroup
          labelIntlID={"aboutPartner.religionMatter"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "religionMatter0",
              "religionMatter",
              "aboutPartner.religionMatter0",
              this.props.store.religionMatter === "religionMatter0"
            ),
            new RadioProps(
              "religionMatter1",
              "religionMatter",
              "aboutPartner.religionMatter1",
              this.props.store.religionMatter === "religionMatter1"
            )
          ]}
        />
        {this.props.store.religionMatter === "religionMatter0" ? (
          <Dropdown
            id={"religion"}
            label={this.props.store.gender === 0 ? this.props.intl.formatMessage({ id: "aboutPartner.religionFemale"}) : this.props.intl.formatMessage({ id: "aboutPartner.religionMale"})}
            placeholder={this.props.intl.formatMessage({ id: "aboutPartner.religionPH"})}
            options={this.props.intl.locale.indexOf("ru") + 1 ? religionRu : religionEn}
            value={this.props.store.religion}
            onChange={(e) => this.setValue("religion", e.value)}
          />
        ) : null}
        <RadioGroup
          labelIntlID={this.props.store.gender === 0 ? "aboutPartner.sportFemale" : "aboutPartner.sportMale"}
          onChange={this.setValue}
          variants={[
            new RadioProps(
              "sport0",
              "sport",
              "aboutPartner.sport0",
              this.props.store.sport === "sport0"
            ),
            new RadioProps(
              "sport1",
              "sport",
              "aboutPartner.sport1",
              this.props.store.sport === "sport1"
            ),
            new RadioProps(
              "sport2",
              "sport",
              "aboutPartner.sport2",
              this.props.store.sport === "sport2"
            ),
            new RadioProps(
              "sport3",
              "sport",
              "aboutPartner.sport3",
              this.props.store.sport === "sport3"
            )
          ]}
        />
      </this.Step>
    );
  }

  Switch() {
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
    }
  }

  render() {
    return (
      <div className={styles.test}>
        <div className={styles.left}>
          <div>
            <div className={styles.container}>
              <Topbar />
              <TabsProgress active={1} />

              {
                this.props.store.started ? (
                  <>

                    <this.Switch />
                  </>
                ) : (
                  <this.Guide />
                )
              }
            </div>
          </div>
          <div className={`${styles.container} ${styles.progressBar}`}>
            <ProgressBar
              current={this.props.store.current}
              total={3}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  store: {
    ...store.aboutPartner,
    gender: store.partnersAppearance.gender,
    partnersAppearanceFinished: store.partnersAppearance.finished,
    language: store.global.language,
    globalStarted: store.global.started
  }
});

export default injectIntl(withRouter(connect(mapStateToProps)(App)));