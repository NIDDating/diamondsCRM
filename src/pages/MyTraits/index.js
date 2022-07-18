import React from "react";
import styles from "./styles.module.scss";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {GLOBAL, MY_TRAITS} from "../../store/actionTypes";
import TabsProgress from "../../components/TabsProgress";
import Button from "../../components/Button";
import ProgresBar from "../../components/ProgressBar";
import Topbar from "../../components/Topbar";
import {FormattedMessage, injectIntl} from "react-intl";
import {boyAll, girlAll} from "../../utils/traits";
import {routes} from "../../router/config";
import initScroll from "../../utils/initScroll";
import Checkbox from "../../components/Checkbox";
import post from "../../utils/api";
import BounceLoader from "react-spinners/BounceLoader";
import toast from "react-hot-toast";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.Switch = this.Switch.bind(this);
		this.Step = this.Step.bind(this);
		this.Guide = this.Guide.bind(this);

		this.state = {
			loading: false
		}
	}

	finish() {
		if (this.props.store.checked === 7) {
			(async () => {
				this.setState({
					loading: true
				});
				let data = await post(this.props.store.store);

				if (data.success === true) {
					this.props.dispatch({
						type: MY_TRAITS.FINISH
					});

					this.props.dispatch({
						type: GLOBAL.CLEAR
					});

					this.props.history.push(routes.finish);
				} else {
					toast.error(data.message);

					this.setState({
						loading: false
					});
				}
			})();

		} else {
			toast.error(this.props.intl.formatMessage({id: "myTraits.error"}))
		}
	}
	start() {
		this.props.dispatch({
			type: MY_TRAITS.START
		});
	}

	setAnswer(field) {
		this.props.dispatch({
			type: MY_TRAITS.SET_VALUE,
			value: {
				value: !this.props.store[field],
				field
			}
		});
	}

	Guide() {
		return (
			<div>
				<div className={`${styles.questionHeader} ${styles.guide}`}>
					<h1>
						<FormattedMessage id="myTraits.guideHeading" />
					</h1>
					<p className={styles.description}>
						<FormattedMessage id="myTraits.guideDescription" />
					</p>
					<Button type={"primary"} onClick={() => this.start()}>
						<FormattedMessage id="buttonStart" />
					</Button>
				</div>
			</div>
		);
	}
	Step() {
		let traits = this.props.store.gender === 0 ? girlAll : boyAll;

		return (
			<div>
				<div className={styles.questionHeader}>
					<span>
						<FormattedMessage
							id="myTraits.question"
						/>
					</span>
					<h1>
						<FormattedMessage id="myTraits.questionHeader" />
					</h1>
					<p>
						<FormattedMessage id="myTraits.guideDescription" />
					</p>
				</div>
				<div className={styles.variants}>
					{
						traits.map((item, i) => {
							let disabled = false;

							if (this.props.store.checked === 7 && this.props.store[item.field] !== true) {
								disabled = true;
							}

							return (
								<Checkbox
									id={i}
									key={i}
									name={item.field}
									disabled={disabled}
									label={<FormattedMessage id={item.label} />}
									checked={this.props.store[item.field]}
									onChange={(e) => this.setAnswer(e.target.name, e.target.value)}
								/>
							);
						})
					}
				</div>
				<div className={styles.buttons}>
					<Button
						type={"primary"}
						onClick={() => this.finish()}>
						<FormattedMessage id={"buttonFinish"} />
					</Button>
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

		if (!this.props.store.testFinished) {
			this.props.history.push(routes.test);
		}

		if (!this.props.store.myAppearanceFinished) {
			this.props.history.push(routes.myAppearance);
		}

		if (!this.props.store.aboutMeFinished) {
			this.props.history.push(routes.aboutMe);
		}

		if (this.props.store.finished) {
			this.props.history.push(routes.finish);
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
							<TabsProgress active={6} />
							{
								this.state.loading ? (
									<div className="loading">
										<BounceLoader color={"#E6B43F"} />
									</div>
								) : (
									<this.Switch />
								)
							}
						</div>
					</div>
					<div className={`${styles.container} ${styles.progressBar}`}>
						<ProgresBar
							current={0}
							total={1}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (store) => ({
	store: {
		store: store,
		...store.myTraits,
		gender: store.partnersAppearance.gender === 0 ? 1 : 0,
		partnersAppearanceFinished: store.partnersAppearance.finished,
		aboutPartnerFinished: store.aboutPartner.finished,
		testFinished: store.test.finished,
		partnersTraitsFinished: store.partnersTraits.finished,
		myAppearanceFinished: store.myAppearance.finished,
		aboutMeFinished: store.aboutMe.finished,
		globalStarted: store.global.started
	}
});

export default injectIntl(connect(mapStateToProps)(withRouter(App)));
