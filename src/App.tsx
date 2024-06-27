import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { throttledFetchQuestions } from "./API";
import { useState } from "react";
import { Difficulty, Question, UserAnswer } from "./types/Question";
import QuestionCard from "./components/QuestionCard";
import ResultPopup from "./components/ResultPopup";

const TOTAL_QUESTIONS = 3;

function App() {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [questionNum, setQuestionNum] = useState(0);
	const [loading, setLoading] = useState(false);
	const [score, setScore] = useState(0);
	const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
	const [finish, setFinish] = useState(false);
	const [selectedState, setSelectedState] = useState<boolean[]>(() =>
		Array.from({ length: TOTAL_QUESTIONS }, () => false)
	);
	const [scores, setScores] = useState<number[]>(() =>
		Array.from({ length: TOTAL_QUESTIONS }, () => 0)
	);

	const startQuiz = async () => {
		setLoading(true);
		try {
			const newQuestions = await throttledFetchQuestions(
				TOTAL_QUESTIONS,
				Difficulty.EASY
			);
			setQuestions(newQuestions);
			console.log(newQuestions);
		} catch (error) {
			console.error("Error fetching questions:", error);
		} finally {
			setQuestionNum(0);
			setScore(0);
			setLoading(false);
			setFinish(false);
		}
	};

	const checkAnswer = (e: React.MouseEvent<HTMLInputElement>) => {
		if (!finish) {
			const selectedAnswer = e.currentTarget.value;
			const correctAnswer = questions[questionNum].correct_answer;
			const correct = selectedAnswer === correctAnswer;

			setSelectedState((prevSelected) => {
				const updatedSelected = [...prevSelected];
				updatedSelected[questionNum] = true;
				return updatedSelected;
			});

			if (correct) {
				setScores((prevScores) => {
					const updatedScores = [...prevScores];
					updatedScores[questionNum] = 1;
					return updatedScores;
				});
			}

			const updatedAnswers = [...userAnswers];
			updatedAnswers[questionNum] = {
				question: questions[questionNum].question,
				selectedAnswer,
				correct,
				correctAnswer: questions[questionNum].correct_answer,
			};

			setUserAnswers(updatedAnswers);
		}
	};

	const nextQuestion = () => {
		if (questionNum < TOTAL_QUESTIONS - 1)
			setQuestionNum((prevNum) => prevNum + 1);
	};

	const prevQuestion = () => {
		if (questionNum > 0) {
			setQuestionNum((prevNum) => prevNum - 1);
		}
	};

	const submitQuiz = () => {
		setFinish(true);
	};

	return (
		<main>
			<h1>REACT QUIZ</h1>
			{!(questions.length > 0) && !loading && !finish && (
				<button className="start-btn" onClick={startQuiz}>
					START
				</button>
			)}

			{loading && <p>퀴즈 불러오는 중...</p>}
			{!loading && questions.length > 0 && !finish && (
				<QuestionCard
					questionNum={questionNum}
					totalQuestions={TOTAL_QUESTIONS}
					question={questions[questionNum].question}
					answers={questions[questionNum].answers}
					checkAnswer={checkAnswer}
				/>
			)}

			{!loading && questionNum > 0 && (
				<button onClick={prevQuestion} className="prev-btn">
					이전
					<ArrowBigLeft />
				</button>
			)}

			{!loading &&
				userAnswers.length > 0 &&
				!finish &&
				TOTAL_QUESTIONS > questionNum + 1 && (
					<button onClick={nextQuestion} className="next-btn">
						다음
						<ArrowBigRight />
					</button>
				)}

			{!loading &&
				!finish &&
				userAnswers.length === questionNum + 1 &&
				TOTAL_QUESTIONS === questionNum + 1 && (
					<button onClick={submitQuiz} className="submit-btn">
						제출
					</button>
				)}
			{!loading && finish && (
				<ResultPopup scores={scores} totalQuestions={TOTAL_QUESTIONS} />
			)}
		</main>
	);
}

export default App;
