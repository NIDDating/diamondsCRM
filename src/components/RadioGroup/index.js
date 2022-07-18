import styles from "./styles.module.scss";
import {FormattedMessage} from "react-intl";
import React from "react";
import Radio from "../Radio";
import Label from "../Label";

function App({labelIntlID, onChange, variants}) {
	return (
		<div className={styles.group}>
			<Label>
				<FormattedMessage id={labelIntlID} />
			</Label>
			<div className={styles.variants}>
				{
					variants.map((item, i) => (
						<Radio
							key={i}
							id={item.id}
							name={item.name}
							label={item.label}
							checked={item.checked}
							onChange={(e) => onChange(e.target.name, e.target.id)}
						/>
					))
				}
			</div>
		</div>
	);
}

export default App;
