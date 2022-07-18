import React from "react";
import styles from "./styles.module.scss";
import {withRouter} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {GLOBAL} from "../../store/actionTypes";
import {connect} from "react-redux";
import {Dropdown} from "react-bootstrap";

function App({history, dispatch, store}) {
	function cancelOnClick() {
		dispatch({
			type: GLOBAL.CLEAR
		});

		window.location.href = "https://diamondsmatch.com";
	}

	function setLanguage(code) {
		dispatch({
			type: GLOBAL.SET_LANGUAGE,
			value: code
		});
	}


	return (
		<div className={styles.topbar}>
			<div className={styles.wrap}>
				<span>
					<FormattedMessage id="topbar.name" />
				</span>
				<div className={styles.right}>
					<Dropdown>
						<Dropdown.Toggle id="dropdown-basic">
							<FormattedMessage id={store.global.language === "ru" ? "language.ru" : "language.en"} />
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item onClick={() => setLanguage("en")}>
								<FormattedMessage id={"language.en"} />
							</Dropdown.Item>
							<Dropdown.Item onClick={() => setLanguage("ru")}>
								<FormattedMessage id={"language.ru"} />
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<div className={styles.link} onClick={() => cancelOnClick()}>
						<FormattedMessage id="topbar.cancel" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default (withRouter(connect((store) => ({store}))(App)));
