import React from "react";
import styles from "./styles.module.scss";
import {FormattedMessage} from "react-intl";

function App({active}) {
	function renderInactive(passed) {
		return (
			<div className={`${styles.wrap} ${styles.inactive} ${passed ? styles.completed : ""}`}>
				<div className={styles.bar} />
			</div>
		);
	}
	function renderActive(label) {
		return (
			<div className={`${styles.wrap} ${styles.active}`}>
				<div className={styles.bar} />
				<span>{label}</span>
			</div>
		);
	}
	function renderSwitch(step, intlId) {
		return active === step
			? renderActive(<FormattedMessage id={intlId} />)
			: renderInactive(step < active);
	}

	return (
		<div className={styles.tabsProgress}>
			{renderSwitch(0, "tabsProgress.step0")}
			{renderSwitch(1, "tabsProgress.step1")}
			{renderSwitch(2, "tabsProgress.step2")}
			{renderSwitch(3, "tabsProgress.step3")}
			{renderSwitch(4, "tabsProgress.step4")}
			{renderSwitch(5, "tabsProgress.step5")}
			{renderSwitch(6, "tabsProgress.step6")}
		</div>
	);
}

export default App;
