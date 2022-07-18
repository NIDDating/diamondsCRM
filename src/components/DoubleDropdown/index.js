import styles from "./styles.module.scss";
import Input from "../Input";
import React from "react";
import Label from "../Label";
import Dropdown from "../Dropdown";
import AsyncDropdown from "../AsyncDropdown";

function App({label, placeholder1, options1, options2, async2, value1, value2, placeholder2, id1, id2, onChange, onInputChange2, ...props}) {
	return (
		<div className={styles.double}>
			<Label htmlFor={id1}>{label}</Label>
			<div className={styles.inputs}>
				<Dropdown
					id={id1}
					value={value1}
					placeholder={placeholder1}
					options={options1}
					onChange={(e) => e ? onChange(id1, e.value) : onChange(id1, null)}
				/>
				<Dropdown
					id={id2}
					value={value2}
					placeholder={placeholder2}
					options={options2}
					onInputChange={onInputChange2 ? onInputChange2 : null}
					onChange={(e) => e ? onChange(id2, e.value) : onChange(id2, null)}
				/>
			</div>
		</div>
	);
}

export default App;
