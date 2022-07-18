import React from "react";
import initScroll from "../../utils/initScroll";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Constructor from "../../components/Constructor";
import styles from "./styles.module.scss";
import Topbar from "../../components/Topbar";
import TabsProgress from "../../components/TabsProgress";
import ProgressBar from "../../components/ProgressBar";
import Radio, {RadioProps} from "../../components/Radio";
import {FormattedMessage, injectIntl} from "react-intl";
import Button from "../../components/Button";
import {PARTNERS_APPEARANCE} from "../../store/actionTypes";
import {routes} from "../../router/config";
import toaster from "react-hot-toast";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.Question = this.Question.bind(this);
    this.Switch = this.Switch.bind(this);
  }

  goTo(dir = true) {
    if (dir) {
      let key = this.props.store.gender === 0
        ? this.props.store.stepsGirl[this.props.store.current]
        : this.props.store.stepsBoy[this.props.store.current];

      if (this.props.store[key] !== null) {
        this.props.dispatch({
          type: PARTNERS_APPEARANCE.INCREMENT_CURRENT
        });
      } else {
        toaster.error(this.props.intl.formatMessage({id: "error.answer"}));
      }
    } else {
      this.props.dispatch({
        type: PARTNERS_APPEARANCE.DECREMENT_CURRENT
      });
    }
  }
  start() {
    this.props.dispatch({
      type: PARTNERS_APPEARANCE.START
    });
  }
  finish() {
    let key = this.props.store.gender === 0
      ? this.props.store.stepsGirl[this.props.store.current]
      : this.props.store.stepsBoy[this.props.store.current];

    if (this.props.store[key] !== null) {
      this.props.dispatch({
        type: PARTNERS_APPEARANCE.FINISH
      });

      this.props.history.push(routes.aboutPartner);
    } else {
      toaster.error(this.props.intl.formatMessage({id: "error.answer"}));
    }
  }

  setValue(field, value) {
    this.props.dispatch({
      type: PARTNERS_APPEARANCE.SET_VALUE,
      value: {
        value,
        field
      }
    });
  }
  getMaxStep() {
    return this.props.store.gender === 0
      ? this.props.store.stepsGirl.length
      : this.props.store.stepsBoy.length;
  }

  componentDidMount() {
    initScroll()

    if (this.props.store.finished) {
      this.props.history.push(routes.aboutPartner);
    }
    if (!this.props.store.globalStarted) {
      this.props.history.push("/");
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.store.current !== this.props.store.current) {
      initScroll()
    }
  }

  Question({id, spanIntlId, h1IntlId, variants, next, prev, finish}) {
    return (
      <div>
        <div className={styles.questionHeader}>
					<span>
						<FormattedMessage id={spanIntlId} values={{number: id, max: this.getMaxStep()}}/>
					</span>
          <h1>
            <FormattedMessage id={h1IntlId} />
          </h1>
        </div>
        <div className={styles.variants}>
          {
            variants.map((item, i) => (
              <Radio
                key={i}
                id={item.id}
                name={item.name}
                label={item.label}
                checked={item.checked}
                onChange={(e) => this.setValue(e.target.name, e.target.id)}
              />
            ))
          }
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

  Guide() {
    return (
      <div>
        <div className={styles.questionHeader}>
          <h1>
            <FormattedMessage id="partnersAppearance.guideHeading" />
          </h1>
          <p className={styles.description}>
            <FormattedMessage id="partnersAppearance.guideDescription" />
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
  Gender() {
    return (
      <this.Question
        id={this.props.store.current + 1}
        spanIntlId={"partnersAppearance.question"}
        h1IntlId={"partnersAppearance.genderQuestion"}
        variants={[
          new RadioProps(
            0,
            "gender",
            "appearance.genderAnswer0",
            this.props.store.gender === 0
          ),
          new RadioProps(
            1,
            "gender",
            "appearance.genderAnswer1",
            this.props.store.gender === 1
          ),
        ]}
        next={true}
      />
    );
  }
  Etn() {
    return (
      <this.Question
        id={this.props.store.current + 1}
        spanIntlId={"partnersAppearance.questionOther"}
        h1IntlId={"partnersAppearance.etnQuestion"}
        variants={[
          new RadioProps(
            0,
            "etn",
            this.props.store.gender === 0
              ? "appearance.etnFemaleAnswer0"
              : "appearance.etnMaleAnswer0",
            this.props.store.etn === 0
          ),
          new RadioProps(
            1,
            "etn",
            this.props.store.gender === 0
              ? "appearance.etnFemaleAnswer1"
              : "appearance.etnMaleAnswer1",
            this.props.store.etn === 1
          ),
          new RadioProps(
            2,
            "etn",
            this.props.store.gender === 0
              ? "appearance.etnFemaleAnswer2"
              : "appearance.etnMaleAnswer2",
            this.props.store.etn === 2
          ),
          new RadioProps(
            3,
            "etn",
            this.props.store.gender === 0
              ? "appearance.etnFemaleAnswer3"
              : "appearance.etnMaleAnswer3",
            this.props.store.etn === 3
          ),
          new RadioProps(
            4,
            "etn",
            this.props.store.gender === 0
              ? "appearance.etnFemaleAnswer4"
              : "appearance.etnMaleAnswer4",
            this.props.store.etn === 4
          ),
          new RadioProps(
            5,
            "etn",
            this.props.store.gender === 0
              ? "appearance.etnFemaleAnswer5"
              : "appearance.etnMaleAnswer5",
            this.props.store.etn === 5
          ),
          new RadioProps(
            9,
            "etn",
            this.props.store.gender === 0
              ? "appearance.etnFemaleAnswer9"
              : "appearance.etnMaleAnswer9",
            this.props.store.etn === 9
          ),
          new RadioProps(
            1000,
            "etn",
            "answerAny",
            this.props.store.etn === 1000
          ),
        ]}
        next={true}
        prev={true}
      />
    );
  }
  Body() {
    let girlVariants = [
      new RadioProps(
        0,
        "body",
        "appearance.bodyAnswer0",
        this.props.store.body === 0
      ),
      new RadioProps(
        3,
        "body",
        "appearance.bodyAnswer3",
        this.props.store.body === 3
      ),
      new RadioProps(
        2,
        "body",
        "appearance.bodyAnswer2",
        this.props.store.body === 2
      ),
      new RadioProps(
        1000,
        "body",
        "answerAny",
        this.props.store.body === 1000
      ),
    ];
    let boyVariants = [
      new RadioProps(
        0,
        "body",
        "appearance.bodyAnswer0",
        this.props.store.body === 0
      ),
      new RadioProps(
        1,
        "body",
        "appearance.bodyAnswer3",
        this.props.store.body === 1
      ),
      new RadioProps(
        2,
        "body",
        "appearance.bodyAnswer2",
        this.props.store.body === 2
      ),
      new RadioProps(
        1000,
        "body",
        "answerAny",
        this.props.store.body === 1000
      ),
    ];

    return (
      <this.Question
        id={this.props.store.current + 1}
        spanIntlId={"partnersAppearance.questionOther"}
        h1IntlId={"partnersAppearance.bodyQuestion"}
        variants={this.props.store.gender === 0 ? girlVariants : boyVariants}
        next={true}
        prev={true}
      />
    );
  }
  Chest() {
    return (
      <this.Question
        id={this.props.store.current + 1}
        spanIntlId={"partnersAppearance.questionOther"}
        h1IntlId={"partnersAppearance.chestQuestion"}
        variants={[
          new RadioProps(
            0,
            "chest",
            "appearance.chestAnswer0",
            this.props.store.chest === 0
          ),
          new RadioProps(
            1,
            "chest",
            "appearance.chestAnswer1",
            this.props.store.chest === 1
          ),
          new RadioProps(
            2,
            "chest",
            "appearance.chestAnswer2",
            this.props.store.chest === 2
          ),
          new RadioProps(
            1000,
            "chest",
            "answerAny",
            this.props.store.chest === 1000
          ),
        ]}
        next={true}
        prev={true}
      />
    );
  }
  Booty() {
    return (
      <this.Question
        id={this.props.store.current + 1}
        spanIntlId={"partnersAppearance.questionOther"}
        h1IntlId={"partnersAppearance.bootyQuestion"}
        variants={[
          new RadioProps(
            0,
            "booty",
            "appearance.bootyAnswer0",
            this.props.store.booty === 0
          ),
          new RadioProps(
            1,
            "booty",
            "appearance.bootyAnswer1",
            this.props.store.booty === 1
          ),
          new RadioProps(
            2,
            "booty",
            "appearance.bootyAnswer2",
            this.props.store.booty === 2
          ),
          new RadioProps(
            1000,
            "booty",
            "answerAny",
            this.props.store.booty === 1000
          ),
        ]}
        next={true}
        prev={true}
      />
    );
  }
  Hair() {
    return (
      <this.Question
        id={this.props.store.current + 1}
        spanIntlId={"partnersAppearance.questionOther"}
        h1IntlId={"partnersAppearance.hairQuestion"}
        variants={[
          new RadioProps(
            0,
            "hair",
            "appearance.hairAnswer0",
            this.props.store.hair === 0
          ),
          new RadioProps(
            1,
            "hair",
            "appearance.hairAnswer1",
            this.props.store.hair === 1
          ),
          new RadioProps(
            1000,
            "hair",
            "answerAny",
            this.props.store.hair === 1000
          ),
        ]}
        next={true}
        prev={true}
      />
    );
  }
  HairColor() {
    return (
      <this.Question
        id={this.props.store.current + 1}
        spanIntlId={"partnersAppearance.questionOther"}
        h1IntlId={"partnersAppearance.hairColorQuestion"}
        variants={[
          new RadioProps(
            0,
            "hairColor",
            this.props.store.gender === 0
              ? "appearance.hairColorFemaleAnswer0"
              : "appearance.hairColorMaleAnswer0",
            this.props.store.hairColor === 0
          ),
          new RadioProps(
            1,
            "hairColor",
            this.props.store.gender === 0
              ? "appearance.hairColorFemaleAnswer1"
              : "appearance.hairColorMaleAnswer1",
            this.props.store.hairColor === 1
          ),
          new RadioProps(
            2,
            "hairColor",
            this.props.store.gender === 0
              ? "appearance.hairColorFemaleAnswer2"
              : "appearance.hairColorMaleAnswer2",
            this.props.store.hairColor === 2
          ),
          new RadioProps(
            3,
            "hairColor",
            this.props.store.gender === 0
              ? "appearance.hairColorFemaleAnswer3"
              : "appearance.hairColorMaleAnswer3",
            this.props.store.hairColor === 3
          ),
          new RadioProps(
            1000,
            "hairColor",
            "answerAny",
            this.props.store.hairColor === 1000
          ),
        ]}
        next={true}
        prev={true}
      />
    );
  }
  Eyes() {
    return (
      <this.Question
        id={this.props.store.current + 1}
        spanIntlId={"partnersAppearance.questionOther"}
        h1IntlId={"partnersAppearance.eyesQuestion"}
        variants={[
          new RadioProps(
            0,
            "eyes",
            "appearance.eyesAnswer0",
            this.props.store.eyes === 0
          ),
          new RadioProps(
            1,
            "eyes",
            "appearance.eyesAnswer1",
            this.props.store.eyes === 1
          ),
          new RadioProps(
            2,
            "eyes",
            "appearance.eyesAnswer2",
            this.props.store.eyes === 2
          ),
          new RadioProps(
            3,
            "eyes",
            "appearance.eyesAnswer3",
            this.props.store.eyes === 3
          ),
          new RadioProps(
            1000,
            "eyes",
            "answerAny",
            this.props.store.eyes === 1000
          ),
        ]}
        finish={true}
        prev={true}
      />
    );
  }

  Switch() {
    if (!this.props.store.started) {
      return this.Guide();
    }

    if (this.props.store.gender === 0) {
      switch (this.props.store.current) {
        default:
        case 0:
          return this.Gender();
        case 1:
          return this.Etn();
        case 2:
          return this.Body();
        case 3:
          return this.Chest();
        case 4:
          return this.Booty();
        case 5:
          return this.Hair();
        case 6:
          return this.HairColor();
        case 7:
          return this.Eyes();
      }
    } else {
      switch (this.props.store.current) {
        default:
        case 0:
          return this.Gender();
        case 1:
          return this.Etn();
        case 2:
          return this.Body();
        case 3:
          return this.HairColor();
        case 4:
          return this.Eyes();
      }
    }
  }

  render() {
    return (
      <div className={styles.appearance}>
        <div className={styles.left}>
          <div>
            <div className={styles.container}>
              <div className={styles.desktopOnly}>
                <Topbar />
                <TabsProgress active={0} />
              </div>
              <this.Switch />
            </div>
          </div>
          <div className={`${styles.container} ${styles.progressBar}`}>
            <ProgressBar
              current={this.props.store.current}
              total={this.props.store.gender === 0 ? this.props.store.stepsGirl.length : this.props.store.stepsBoy.length}
            />
          </div>
        </div>
        <div className={styles.right}>
          <Constructor
            gender={this.props.store.gender}
            etn={this.props.store.etn}
            body={this.props.store.body}
            hair={this.props.store.hair}
            eyes={this.props.store.eyes}
            booty={this.props.store.booty}
            chest={this.props.store.chest}
            hairColor={this.props.store.hairColor}
          />
        </div>
        <div className={`${styles.left} ${styles.mobileOnly}`}>
          <div>
            <div className={styles.container}>
              <Topbar />
              <TabsProgress active={0} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  store: {
    ...store.partnersAppearance,
    globalStarted: store.global.started
  }
});

export default injectIntl(withRouter(connect(mapStateToProps)(App)));