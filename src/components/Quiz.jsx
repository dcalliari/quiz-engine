"use client";

import ProgressBar from "@/components/ProgressBar";
import Question from "@/components/Question";
import { shuffleArray } from "@/utils/shuffle";
import React, { useState, useEffect } from "react";
import "@/styles/components/Quiz.scss";
import questionsData from "@/data/questions.json";

const Quiz = () => {
	const [questions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState([]);
	const [score, setScore] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [showConfirmPopup, setShowConfirmPopup] = useState(false);

	useEffect(() => {
		resetQuiz();
	}, []);

	const resetQuiz = () => {
		const shuffledQuestions = shuffleArray([...questionsData]).map(
			(question) => {
				if (question.options) {
					return {
						...question,
						options: shuffleArray([...question.options]),
					};
				}
				return question;
			},
		);
		setQuestions(shuffledQuestions);
		setAnswers(Array(shuffledQuestions.length).fill(null));
		setCurrentQuestion(0);
		setScore(0);
		setShowScore(false);
		setShowConfirmPopup(false);
	};

	const handleAnswerOptionClick = (selectedOption) => {
		const updatedAnswers = [...answers];
		updatedAnswers[currentQuestion] = selectedOption;
		setAnswers(updatedAnswers);
	};

	const handleMultipleChoiceOptionClick = (selectedOption) => {
		const updatedAnswers = [...answers];
		if (updatedAnswers[currentQuestion]) {
			if (updatedAnswers[currentQuestion].includes(selectedOption)) {
				updatedAnswers[currentQuestion] = updatedAnswers[
					currentQuestion
				].filter((option) => option !== selectedOption);
			} else {
				updatedAnswers[currentQuestion].push(selectedOption);
			}
		} else {
			updatedAnswers[currentQuestion] = [selectedOption];
		}
		setAnswers(updatedAnswers);
	};

	const handleInputChange = (input) => {
		const updatedAnswers = [...answers];
		updatedAnswers[currentQuestion] = input;
		setAnswers(updatedAnswers);
	};

	const handleNextQuestion = () => {
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		}
	};

	const handlePreviousQuestion = () => {
		const prevQuestion = currentQuestion - 1;
		if (prevQuestion >= 0) {
			setCurrentQuestion(prevQuestion);
		}
	};

	const handleFinishQuiz = () => {
		if (answers.some((answer) => answer === null)) {
			setShowConfirmPopup(true);
		} else {
			calculateScore();
		}
	};

	const calculateScore = () => {
		const newScore = answers.reduce((acc, answer, index) => {
			const question = questions[index];
			if (question.type === "one-choice") {
				if (
					question.options.some((opt) => opt.text === answer && opt.isCorrect)
				) {
					return acc + 1;
				}
			} else if (question.type === "multiple-choice") {
				if (
					Array.isArray(answer) &&
					answer.every((ans) =>
						question.options.some((opt) => opt.text === ans && opt.isCorrect),
					)
				) {
					return acc + 1;
				}
			} else if (question.type === "input") {
				if (
					Array.isArray(question.correctAnswers) &&
					question.correctAnswers.some(
						(correctAnswer) =>
							typeof answer === "string" &&
							answer.toLowerCase() === correctAnswer.toLowerCase(),
					)
				) {
					return acc + 1;
				}
			}
			return acc;
		}, 0);

		setScore(newScore);
		setShowScore(true);
		setShowConfirmPopup(false);
	};

	const handleConfirmFinish = () => {
		calculateScore();
	};

	const handleCancelFinish = () => {
		setShowConfirmPopup(false);
	};

	const answeredQuestions = answers.filter((answer) => answer !== null).length;

	return (
		<div className="quiz">
			{showScore ? (
				<div className="score-section">
					<>
						<p>
							You scored {score} out of {questions.length}
						</p>
						<div className="play-again-buttons">
							<button
								onClick={resetQuiz}
								className="again-button"
								type="button"
							>
								Play Again
							</button>
						</div>
					</>
				</div>
			) : (
				<>
					{questions.length > 0 && (
						<Question
							question={questions[currentQuestion]}
							selectedAnswer={answers[currentQuestion]}
							handleAnswerOptionClick={handleAnswerOptionClick}
							handleMultipleChoiceOptionClick={handleMultipleChoiceOptionClick}
							handleInputChange={handleInputChange}
						/>
					)}
					<div className="navigation-buttons">
						<button
							onClick={handlePreviousQuestion}
							disabled={currentQuestion === 0}
							className="nav-button"
							type="button"
						>
							Previous
						</button>
						{currentQuestion < questions.length - 1 ? (
							<button
								onClick={handleNextQuestion}
								className="nav-button"
								type="button"
							>
								Next
							</button>
						) : (
							<button
								onClick={handleFinishQuiz}
								className="nav-button"
								type="button"
							>
								Finish Quiz
							</button>
						)}
					</div>
					<ProgressBar
						currentQuestion={answeredQuestions}
						totalQuestions={questions.length}
					/>
					{showConfirmPopup && (
						<div className="popup">
							<div className="popup-content">
								<p>
									Are you sure you want to finish the quiz? Unanswered questions
									will be skipped.
								</p>
								<div className="popup-buttons">
									<button
										onClick={handleConfirmFinish}
										className="popup-button"
										type="button"
									>
										Continue
									</button>
									<button
										onClick={handleCancelFinish}
										className="popup-button"
										type="button"
									>
										Cancel
									</button>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Quiz;
