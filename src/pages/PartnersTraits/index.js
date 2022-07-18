import React from "react";
import styles from "./styles.module.scss";
import Radio from "../../components/Radio";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {PARTNERS_TRAITS} from "../../store/actionTypes";
import TabsProgress from "../../components/TabsProgress";
import Button from "../../components/Button";
import ProgresBar from "../../components/ProgressBar";
import QuestionProgressBar from "../../components/QuestionProgressBar";
import Topbar from "../../components/Topbar";
import {FormattedMessage} from "react-intl";
import {girl, boy} from "../../utils/traits";
import {routes} from "../../router/config";
import initScroll from "../../utils/initScroll";
import post from "../../utils/api";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.Switch = this.Switch.bind(this);
		this.Step = this.Step.bind(this);
		this.Guide = this.Guide.bind(this);
	}

	goTo(direction = true) {
		if (direction) {
			if (this.props.store.current === Object.keys(this.props.store.answers).length - 1) {
				this.finish();
			} else {
				this.props.dispatch({
					type: PARTNERS_TRAITS.INCREMENT_CURRENT
				});
			}
		} else {
			this.props.dispatch({
				type: PARTNERS_TRAITS.DECREMENT_CURRENT
			});
		}
	}
	finish() {
		this.props.dispatch({
			type: PARTNERS_TRAITS.FINISH
		});
		
		this.props.history.push(routes.test);
	}
	start() {
		this.props.dispatch({
			type: PARTNERS_TRAITS.START
		});
	}

	setAnswer(id, field) {
		this.props.dispatch({
			type: PARTNERS_TRAITS.SET_VALUE,
			value: {
				id,
				field
			}
		});
	}

	Guide() {
		return (
			<div>
				<div className={`${styles.questionHeader} ${styles.guide}`}>
					<h1>
						<FormattedMessage id="partnersTraits.guideHeading" />
					</h1>
					<p className={styles.description}>
						<FormattedMessage id="partnersTraits.guideDescription" />
					</p>
					<Button type={"primary"} onClick={() => this.start()}>
						<FormattedMessage id="buttonStart" />
					</Button>
				</div>
			</div>
		);
	}
	Step() {
		let traits = this.props.store.gender === 0 ? girl : boy;

		return (
			<div>
				<div className={styles.questionHeader}>
					<span>
						<FormattedMessage
							id="partnersTraits.questionOther"
							values={{
								number: this.props.store.current + 1,
								max: Object.keys(this.props.store.answers).length
							}}
						/>
					</span>
					<h1>
						<FormattedMessage id="partnersTraits.questionHeader" />
					</h1>
					<QuestionProgressBar
						goNext={() => this.goTo(true)}
						id={this.props.store.current}
					/>
				</div>
				<div className={styles.variants}>
					<Radio
						id={0}
						name={traits[this.props.store.current][0].field}
						label={<FormattedMessage id={traits[this.props.store.current][0].label} />}
						checked={traits[this.props.store.current][0].field === this.props.store.answers[this.props.store.current]}
						onChange={() => this.setAnswer(this.props.store.current, traits[this.props.store.current][0].field)}
					/>
					<Radio
						id={1}
						name={traits[this.props.store.current][1].field}
						label={<FormattedMessage id={traits[this.props.store.current][1].label} />}
						checked={traits[this.props.store.current][1].field === this.props.store.answers[this.props.store.current]}
						onChange={() => this.setAnswer(this.props.store.current, traits[this.props.store.current][1].field)}
					/>
				</div>
				<div className={styles.buttons}>
					{this.props.store.current === this.props.store.answers.length - 1 ? (
						<Button
							type={"primary"}
							onClick={() => this.finish()}>
							<FormattedMessage id={"buttonFinish"} />
						</Button>
					) : ("")}
				</div>
			</div>
		);
	}
	Switch() {
		if (this.props.store.started === false) {
			return (<this.Guide />);
		}

		return (<this.Step />);
	}

	componentDidMount() {
		initScroll();

		if (!this.props.store.globalStarted) {
			this.props.history.push("/");
		}

		if (!this.props.store.partnersAppearanceFinished) {
			this.props.history.push(routes.partnersAppearance);
		}

		if (!this.props.store.aboutPartnerFinished) {
			this.props.history.push(routes.aboutPartner);
		}

		if (this.props.store.finished) {
			this.props.history.push(routes.test);
		}
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.store.current !== this.props.store.current) {
			initScroll();
		}
	}

	render() {
		return (
			<div className={styles.test}>
				<div className={styles.left}>
					<div>
						<div className={styles.container}>
							<Topbar />
							<TabsProgress active={2} />
							<this.Switch />
						</div>
					</div>
					<div className={`${styles.container} ${styles.progressBar}`}>
						<ProgresBar
							current={this.props.store.current}
							total={Object.keys(this.props.store.answers).length}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (store) => ({
	store: {
		...store.partnersTraits,
		gender: store.partnersAppearance.gender,
		partnersAppearanceFinished: store.partnersAppearance.finished,
		aboutPartnerFinished: store.aboutPartner.finished,
		globalStarted: store.global.started
		// partnersTraitsFinished: store.partnersTraits.finished,
		// myAppearanceFinished: store.myAppearance.finished,
	}
});

export default connect(mapStateToProps)(withRouter(App));
