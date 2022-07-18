import {connect} from "react-redux";
import styles from "./styles.module.scss";
import {FormattedMessage} from "react-intl";
import React from "react";

function App({current, total}) {
	function getValue() {
		return (current) / total * 100;
	}

	return (
		<div className={styles.progressBar}>
			<div className={styles.base}>
				<div
					className={styles.bar}
					style={{
						width: getValue() + "%"
					}}
				/>
			</div>
			<span>
				<FormattedMessage
					id="progressBar"
				/>
			</span>
		</div>
	);
}

export default connect()(App);
