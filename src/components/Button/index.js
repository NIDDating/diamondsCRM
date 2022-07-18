import React from "react";
import styles from "./styles.module.scss";

function App({children, href, type, disabled, ...props}) {
	if (href) {
		return (
			<a href={href} className={`${styles.button} ${styles[type]}`} {...props}>
				{children}
			</a>
		);
	} else {
		return (
			<div className={`${styles.button} ${styles[type]} ${disabled ? styles.disabled : ""}`} {...props}>
				{children}
			</div>
		);
	}

}

export default App;