import React from "react";
import "@/styles/components/Question.scss";
import Image from "next/image";

const Question = ({
	question,
	selectedAnswer,
	handleAnswerOptionClick,
	handleMultipleChoiceOptionClick,
	handleInputChange,
}) => {
	const renderOptions = () => {
		if (question.type === "one-choice") {
			return question.options.map((option) => (
				<button
					key={option.text}
					onClick={() => handleAnswerOptionClick(option.text)}
					className={`option-button ${option.text === selectedAnswer ? "selected" : ""}`}
					type="button"
				>
					{option.text}
				</button>
			));
		}
		if (question.type === "multiple-choice") {
			return question.options.map((option) => (
				<button
					key={option.text}
					onClick={() => handleMultipleChoiceOptionClick(option.text)}
					className={`option-button ${selectedAnswer?.includes(option.text) ? "selected" : ""}`}
					type="button"
				>
					{option.text}
				</button>
			));
		}
		return null;
	};

	const renderInput = () => {
		if (question.type === "input") {
			return (
				<input
					type="text"
					value={selectedAnswer || ""}
					onChange={(e) => handleInputChange(e.target.value)}
					className="input-answer"
					placeholder="Type your answer..."
				/>
			);
		}
		return null;
	};

	return (
		<div className="question">
			<div className="question-title">{question.title}</div>
			<div className="question-description">{question.description}</div>
			{question.image && (
				<Image
					width={500}
					height={150}
					src={question.image}
					alt={question.title}
					className="question-image"
				/>
			)}
			<div className="question-text">{question.question}</div>
			<div className="options">{renderOptions()}</div>
			<div className="input">{renderInput()}</div>
		</div>
	);
};

export default Question;
