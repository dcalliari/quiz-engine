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
	const [finalized, setFinalized] = useState(false);

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
		setFinalized(false);
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
		if (answers.every((answer) => answer !== null)) {
			const newScore = answers.reduce((acc, answer, index) => {
				const question = questions[index];
				if (
					question.type === "one-choice" &&
					question.options.some((opt) => opt.text === answer && opt.isCorrect)
				) {
					return acc + 1;
				}
				if (
					question.type === "multiple-choice" &&
					answer.every((ans) =>
						question.options.some((opt) => opt.text === ans && opt.isCorrect),
					)
				) {
					return acc + 1;
				}
				if (
					question.type === "input" &&
					answer.toLowerCase() === question.correctAnswer.toLowerCase()
				) {
					return acc + 1;
				}
				return acc;
			}, 0);

			setScore(newScore);
			setShowScore(true);
			setFinalized(true);
		}
	};

	const answeredQuestions = answers.filter((answer) => answer !== null).length;

	return (
		<div className="quiz">
			{showScore ? (
				<div className="score-section">
					{finalized ? (
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
					) : (
						"Please finish the quiz to see your score."
					)}
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
								disabled={answers[currentQuestion] === null}
								className="nav-button"
								type="button"
							>
								Next
							</button>
						) : (
							<button
								onClick={handleFinishQuiz}
								disabled={answers[currentQuestion] === null}
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
				</>
			)}
		</div>
	);
};

export default Quiz;
