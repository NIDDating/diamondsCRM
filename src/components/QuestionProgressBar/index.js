import React from "react";
import {connect} from "react-redux";
import styles from "./styles.module.scss";
import {FormattedMessage, injectIntl} from "react-intl";

class App extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			current: 5,
			interval: null
		};
	}

	unsetInterval() {
		clearInterval(this.state.interval);
	}
	setInterval() {
		this.setState({
			current: 5,
			interval: setInterval(() => {
				if (this.state.current > 0) {
					this.setState({
						current: this.state.current - 1
					});
				} else {
					this.props.goNext();
				}
			}, 1000)
		});
	}

	getValue() {
		return this.state.current / 5 * 100;
	}

	componentDidMount() {
		this.setInterval();
	}
	componentWillUnmount() {
		this.unsetInterval();
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.id !== this.props.id) {
			this.unsetInterval();
			this.setInterval();
		}
	}

	getLetter(number) {
		switch (number) {
			default:
			case 0:
			case 5: return "";
			case 4:
			case 3:
			case 2: return "ы";
			case 1: return "а";
		}
	}

	render() {
		return (
			<div className={styles.progressBar}>
				<div className={styles.base}>
					<div
						className={styles.bar}
						style={{
							width: this.getValue() + "%"
						}}
					/>
				</div>
				<span>
				<FormattedMessage
					id="questionProgressBar.left"
					values={{
						seconds: this.state.current,
						letter: this.getLetter(this.state.current)
					}}
				/>
			</span>
			</div>
		);
	}
}

export default injectIntl(connect()(App));
