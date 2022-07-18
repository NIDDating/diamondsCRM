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
import ProgressBar from "../../components/ProgressBar";
import Constructor from "../../components/Constructor";
import img from "../../assets/imgs/images.jpg";
import logo from "../../assets/imgs/logo.png";
import closeIcon from "../../assets/imgs/Close.svg";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: false
		}
	}

	goto() {
		this.props.dispatch({type: GLOBAL.START});
		this.props.history.push(routes.partnersAppearance);
	}

	componentDidMount() {
		if (this.props.store.started) {
			this.props.history.push(routes.partnersAppearance);
		}
	}

	render() {
		return (
			<div className={styles.index}>
				<div className={styles.left}>
					<div className={styles.container}>
						<div>
							<div className={styles.topbar}>
								<img src={logo} alt="logotype"/>
								<img
									className={styles.closeIcon}
									src={closeIcon}
									alt="close"
									onClick={() => window.location = "https://diamondsmatch.com"}
								/>
							</div>
							<div className={`${styles.image} ${styles.mobileOnly}`} style={{background: `url(${img})`}} />
							<h1>
								<FormattedMessage id={"start.heading"} />
							</h1>
							<p>
								<FormattedMessage id={"start.about"} />
							</p>
							<div className={styles.wrap}>
								<input id="checkbox-1" type="checkbox" checked={this.state.checked} onChange={() => this.setState({checked: !this.state.checked})} />
								<label className={styles.checkbox} htmlFor="checkbox-1" />
								<span>
									<FormattedMessage id={"start.agree"} /> <a href="#"><FormattedMessage id={"start.policy"} /></a>
								</span>
							</div>
							<Button
								disabled={!this.state.checked}
								type={"primary"}
								onClick={() => this.goto()}>
								<FormattedMessage id={"start.start"} />
							</Button>
						</div>
					</div>
				</div>
				<div className={`${styles.right} ${styles.desktopOnly}`} style={{background: `url(${img})`}}>

				</div>
			</div>
		);
	}
}

const mapStateToProps = (store) => ({
	store: {
		started: store.global.started
	}
});

export default injectIntl(connect(mapStateToProps)(withRouter(App)));
