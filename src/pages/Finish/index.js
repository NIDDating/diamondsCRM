import React from "react";
import styles from "./styles.module.scss";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {GLOBAL, TEST} from "../../store/actionTypes";
import TabsProgress from "../../components/TabsProgress";
import Button from "../../components/Button";
import ProgresBar from "../../components/ProgressBar";
import Topbar from "../../components/Topbar";
import {FormattedMessage, injectIntl} from "react-intl";
import {routes} from "../../router/config";
import initScroll from "../../utils/initScroll";
import Radio from "../../components/Radio";
import test from "../../utils/test";
import BounceLoader from "react-spinners/BounceLoader";

class App extends React.Component {
	componentDidMount() {
		initScroll();

		if (!this.props.store.finished) {
			this.props.history.push(routes.partnersAppearance);
		}
	}

	finish() {
		this.props.dispatch({
			type: GLOBAL.RESET
		});

		window.location.href = "https://diamondsmatch.com";
	}

	render() {
		return (
			<div className={styles.test}>
				<div className={styles.left}>
					<div>
						<div className={styles.container}>
							<Topbar />
							<div>
								<div className={`${styles.questionHeader} ${styles.guide}`}>
									<h1>
										<FormattedMessage id="finish.guideHeading" />
									</h1>
									<p className={styles.description}>
										<FormattedMessage id="finish.guideDescription" />
									</p>
									<Button type={"primary"} onClick={() => this.finish()}>
										<FormattedMessage id="buttonFinish" />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (store) => {
	return {
		store: {
			...store.test,
			gender: store.partnersAppearance.gender,
			partnersAppearanceFinished: store.partnersAppearance.finished,
			aboutPartnerFinished: store.aboutPartner.finished,
			testFinished: store.test.finished,
			partnersTraitsFinished: store.partnersTraits.finished,
			myAppearanceFinished: store.myAppearance.finished,
			aboutMeFinished: store.aboutMe.finished,
			myTraitsFinished: store.myTraits.finished,
			finished: store.global.finished
		}
	};
}

export default injectIntl(connect(mapStateToProps)(withRouter(App)));
