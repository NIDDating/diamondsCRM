import styles from "./styles.module.scss";
import {FormattedMessage} from "react-intl";
import React from "react";

function App({id, name, label, onChange, ...props}) {
	return (
		<div className={styles.checkbox}>
			<input
				type="radio"
				name={name}
				id={id}
				onChange={(e) => onChange(e)}
				{...props}
			/>
			<label htmlFor={id}>
				{label}
				<div className={styles.dot}>
					<div className={styles.active}></div>
				</div>
			</label>
		</div>
	);
}

class RadioProps {
	constructor(id, name, labelIntlId, checked, onChange) {
		this.id = id;
		this.name = name;
		this.label = (<FormattedMessage id={labelIntlId} />);
		this.checked = checked;
		this.onChange = onChange;
	}
}

export {RadioProps};

export default App;
