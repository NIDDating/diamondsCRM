import React from "react";
import styles from "./styles.module.scss";

function App({htmlFor, children, ...props}) {
	return (
		<label
			className={styles.label}
			htmlFor={htmlFor}
			{...props}>
			{children}
		</label>
	);
}

export default App;
