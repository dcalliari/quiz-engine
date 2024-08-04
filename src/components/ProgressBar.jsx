import React from "react";
import "@/styles/components/ProgressBar.scss";

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
	const progressPercentage = (currentQuestion / totalQuestions) * 100;

	return (
		<div className="progress-bar-container">
			<div
				className="progress-bar"
				style={{ width: `${progressPercentage}%` }}
			/>
			<span className="progress-text">
				{currentQuestion} of {totalQuestions}
			</span>
		</div>
	);
};

export default ProgressBar;
