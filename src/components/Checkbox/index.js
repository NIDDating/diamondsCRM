import styles from "./styles.module.scss";
import check from "../../assets/arrow.svg";

function App({id, name, label, onChange, ...props}) {
	return (
		<div className={styles.checkbox}>
			<input
				type="checkbox"
				id={id}
				name={name}
				onChange={(e) => onChange(e)}
				{...props}
			/>
			<label htmlFor={id}>
				{label}
				<div className={styles.dot}>
					<img src={check} alt="check" className={styles.active} />
				</div>
			</label>
		</div>
	);
}

export default App;
