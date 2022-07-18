import styles from "./styles.module.scss";
import Select from "react-select";
import Label from "../Label";

function App({id, value, label, placeholder, onChange, options, isMulti, ...props}) {
	const customStyles = {
		option: (provided, state) => ({
			...provided,
			cursor: "pointer"
		}),
		control: (provided) => ({
			...provided,
			cursor: "pointer"
		})
	}
	let multiValue = [];

	if (isMulti && value) {
		options.forEach(option => {
			for (let i = 0; i < value.length; i++) {
				if (option.value === value[i]) {

					multiValue.push(option);
				}
			}
		});
	}

	console.log(value, options);

	return (
		<div className={styles.input}>
			{label ? (
				<Label htmlFor={id}>
					{label}
				</Label>
			) : ("")}
			<Select
				id={id}
				name={id}
				styles={customStyles}
				{...props}
				theme={theme => ({
					...theme,
					borderRadius: 8,
					colors: {
						...theme.colors,
						primary25: '#F9ECCF',
						primary: '#E6B43F',
						neutral10: "#FFF"
					},
				})}
				value={isMulti ? value : options ? options.filter(option => option.value === value) : []}
				options={options}
				placeholder={placeholder}
				className={styles.select}
				onChange={(e) => onChange(e)}
				isMulti={isMulti}
				{...props}
			/>
		</div>
	);
}

export default App;
