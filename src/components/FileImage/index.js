import React, {useState} from "react";
import styles from "./styles.module.scss";
import {withRouter} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {GLOBAL} from "../../store/actionTypes";
import {connect} from "react-redux";
import {Dropdown} from "react-bootstrap";
import {Formik} from "formik";
import {deletePhoto, uploadPhoto} from "../../utils/api";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import removeIcon from "../../assets/imgs/removePhoto.png";

function App({item, dispatch, store}) {
	let [loading, setLoading] = useState(false);

	return (
		<div className={styles.photoWrapper}>
			<img src={item} />
			<div className={styles.removePhoto}>
				<div className={styles.imgWrapper}>
					{
						loading ? null : (
							<img src={removeIcon} onClick={() => {
								setLoading(true);
								(async () => {
									try {
										let data = await deletePhoto(item);

										dispatch({
											type: GLOBAL.REMOVE_IMAGE,
											value: item
										});
										setLoading(false);
									} catch (e) {
										toast.error(e.toString());
										setLoading(false);
									}
								})();
							}} />
						)
					}
				</div>
			</div>
		</div>
	);
}

export default (withRouter(connect((store) => ({store: {uid: store.aboutMe.uid}}))(App)));
