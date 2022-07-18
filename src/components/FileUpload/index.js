import React, {useState} from "react";
import styles from "./styles.module.scss";
import {withRouter} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {GLOBAL} from "../../store/actionTypes";
import {connect} from "react-redux";
import {Dropdown} from "react-bootstrap";
import {Formik} from "formik";
import {uploadPhoto} from "../../utils/api";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

function App({dispatch, store}) {
	const init = {
		file: '',
	};
	let [loading, setLoading] = useState(false);

	const handleFileUpload = (event, setFieldValue) => {
		setFieldValue("file", event.currentTarget.files[0]);
	}

	const handleSubmit = (values) => {
		setLoading(true);

		(async () => {
			let exts = [".jpeg", ".jpg", ".png"];

			let isRightExt = false;
			for (let ext of exts) {
				if (values.file.name.indexOf(ext) !== -1) {
					isRightExt = true;
				}
			}
			if (isRightExt) {
				try	{
					let data = await uploadPhoto(store.uid, values.file);

					dispatch({
						type: GLOBAL.ADD_IMAGE,
						value: data.data.path
					});

					setLoading(false);
				} catch(e) {
					toast(e.toString());

					setLoading(false);
				}
			}
			else {
				alert(`Неверный формат фотографии. Поддерживаемые форматы: ${exts.join(' ')}`);
			}

			setLoading(false);
		})();
	}

	return (
		<Formik
			initialValues = {init}
			onSubmit = {handleSubmit}
		>
			{({
					setFieldValue,
					submitForm
				}) => (
				<div>
					<input
						type="file"
						id={`uploadPhoto`}
						name={`uploadPhoto`}
						onChange={(event) => {
							handleFileUpload(event, setFieldValue);
							submitForm();
						}}
						hidden
					/>
					{
						loading ? (
							<div className={styles.upload}>
								<ClipLoader color={"#E6B43F"} />
							</div>
						) : (
							<label
								className={styles.upload}
								htmlFor = {`uploadPhoto`}>
								<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M15.3292 2.13003L12.6705 2.13003L12.6705 12.6706L2.1299 12.6706L2.1299 15.3294L12.6705 15.3294L12.6705 25.87L15.3292 25.87L15.3292 15.3294L25.8698 15.3294V12.6706L15.3292 12.6706L15.3292 2.13003Z" fill="#183032" opacity="0.5"/>
								</svg>
							</label>
						)
					}
				</div>
			)}
		</Formik>
	);
}

export default (withRouter(connect((store) => ({store: {uid: store.aboutMe.uid}}))(App)));
