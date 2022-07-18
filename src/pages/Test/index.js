import React from "react";
import styles from "./styles.module.scss";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {TEST} from "../../store/actionTypes";
import TabsProgress from "../../components/TabsProgress";
import Button from "../../components/Button";
import ProgresBar from "../../components/ProgressBar";
import Topbar from "../../components/Topbar";
import {FormattedMessage, injectIntl} from "react-intl";
import {routes} from "../../router/config";
import initScroll from "../../utils/initScroll";
import Radio from "../../components/Radio";
import test from "../../utils/test";
import toast from "react-hot-toast";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.Switch = this.Switch.bind(this);
		this.Step = this.Step.bind(this);
		this.Guide = this.Guide.bind(this);
	}

	goTo(direction = true) {
		if (direction) {
			if (this.props.store[test[this.props.store.current].field] != null) {
				this.props.dispatch({
					type: TEST.INCREMENT_CURRENT
				});
			} else {
				toast.error(this.props.intl.formatMessage({id: "error.answer"}));
			}
		} else {
			this.props.dispatch({
				type: TEST.DECREMENT_CURRENT
			});
		}
	}
	finish() {
		if (this.props.store[test[this.props.store.current].field] != null) {
			this.props.dispatch({
				type: TEST.FINISH
			});

			this.props.history.push(routes.myAppearance);
		} else {
			alert(this.props.intl.formatMessage({id: "error.answer"}));
		}
	}
	start() {
		this.props.dispatch({
			type: TEST.START
		});
	}

	setAnswer(field, value) {
		this.props.dispatch({
			type: TEST.SET_VALUE,
			value: {
				value,
				field
			}
		});
	}

	Guide() {
		return (
			<div>
				<div className={`${styles.questionHeader} ${styles.guide}`}>
					<h1>
						<FormattedMessage id="test.guideHeading" />
					</h1>
					<p className={styles.description}>
						<FormattedMessage id="test.guideDescription" />
					</p>
					<Button type={"primary"} onClick={() => this.start()}>
						<FormattedMessage id="buttonStart" />
					</Button>
				</div>
			</div>
		);
	}
	Step() {
		return (
			<div>
				<div className={styles.questionHeader}>
					<span>
						<FormattedMessage
							id="test.questionOther"
							values={{
								number: this.props.store.current + 1,
								max: test.length
							}}
						/>
					</span>
					<h1>
						<FormattedMessage id={test[this.props.store.current].question}/>
					</h1>
				</div>
				<div className={styles.variants}>
					{
						test[this.props.store.current].answers.map((item, i) => {
							return (
								<Radio
									id={i}
									key={i}
									name={test[this.props.store.current].field}
									label={this.props.intl.formatMessage({id: item})}
									checked={this.props.store[test[this.props.store.current].field] === i}
									onChange={(e) => this.setAnswer(test[this.props.store.current].field, e.target.id)}
								/>
							);
						})
					}
				</div>
				<div className={styles.buttons}>
					{this.props.store.current === 0 ? ("") : (
						<Button type={"secondary"} onClick={() => this.goTo(false)}>
							<FormattedMessage id="buttonPrev" />
						</Button>
					)}
					{this.props.store.current === test.length - 1 ? (
						<Button type={"primary"} onClick={() => this.finish()}>
							<FormattedMessage id="buttonFinish" />
						</Button>
					) : (
						<Button type={"primary"} onClick={() => this.goTo(true)}>
							<FormattedMessage id="buttonNext" />
						</Button>
					)}
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

		if (!this.props.store.partnersTraitsFinished) {
			this.props.history.push(routes.partnersTraits);
		}

		if (this.props.store.finished) {
			this.props.history.push(routes.myAppearance);
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
							<TabsProgress active={3} />
							<this.Switch />
						</div>
					</div>
					<div className={`${styles.container} ${styles.progressBar}`}>
						<ProgresBar
							current={this.props.store.current}
							total={test.length}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (store) => ({
	store: {
		...store.test,
		gender: store.partnersAppearance.gender,
		partnersAppearanceFinished: store.partnersAppearance.finished,
		aboutPartnerFinished: store.aboutPartner.finished,
		partnersTraitsFinished: store.partnersTraits.finished,
		globalStarted: store.global.started
		// myTraitsFinished: store.myTraits.finished,
		// myAppearanceFinished: store.myAppearance.finished,
	}
});

export default injectIntl(connect(mapStateToProps)(withRouter(App)));
