import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { throttledFetchQuestions } from "./API";
import { useState } from "react";
import { Difficulty, Question, UserState } from "./types/Question";
import QuestionCard from "./components/QuestionCard";
import ResultPopup from "./components/ResultPopup";

const TOTAL_QUESTIONS = 3;

function App() {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [questionNum, setQuestionNum] = useState(0);
	const [level, setLevel] = useState<Difficulty>(Difficulty.EASY);
	const [loading, setLoading] = useState(false);
	const [userState, setUserState] = useState<UserState[]>([]);
	const [finish, setFinish] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [scores, setScores] = useState<number[]>(() =>
		Array.from({ length: TOTAL_QUESTIONS }, () => 0)
	);
	const [answered, setAnswered] = useState(() =>
		Array.from({ length: TOTAL_QUESTIONS }, () => false)
	);

	const startQuiz = async () => {
		setLoading(true);
		try {
			const newQuestions = await throttledFetchQuestions(
				TOTAL_QUESTIONS,
				level
			);
			setQuestions(newQuestions);
		} catch (error) {
			console.error("Error fetching questions:", error);
		} finally {
			setQuestionNum(0);
			setLoading(false);
			setFinish(false);
			setScores(Array.from({ length: TOTAL_QUESTIONS }, () => 0));
			setErrorMessage("");
		}
	};

	const checkAnswer = (e: React.MouseEvent<HTMLInputElement>) => {
		if (!finish) {
			const selectedAnswer = e.currentTarget.value;
			const correctAnswer = questions[questionNum].correct_answer;
			const correct = selectedAnswer === correctAnswer;

			const updatedAnswered = [...answered];
			updatedAnswered[questionNum] = true;
			setAnswered(updatedAnswered);

			const updatedUserState = [...userState];
			updatedUserState[questionNum] = {
				question: questions[questionNum].question,
				selectedAnswer,
				correct,
				correctAnswer: questions[questionNum].correct_answer,
			};

			if (correct) {
				setScores((prevScores) => {
					const updatedScores = [...prevScores];
					updatedScores[questionNum] = 1;
					return updatedScores;
				});
			}

			setUserState(updatedUserState);
		}
	};

	const nextQuestion = () => {
		if (questionNum < TOTAL_QUESTIONS - 1)
			setQuestionNum((prevNum) => prevNum + 1);
	};

	const prevQuestion = () => {
		setErrorMessage("");
		if (questionNum > 0) {
			setQuestionNum((prevNum) => prevNum - 1);
		}
	};

	const submitQuiz = () => {
		const unanswered = answered.reduce((acc: number[], curr, index) => {
			if (!curr) {
				acc.push(index + 1);
			}
			return acc;
		}, []);

		if (answered.includes(false)) {
			return setErrorMessage(
				`다음 문제에 대한 답변을 선택하세요: ${unanswered.join(", ")}`
			);
		}

		setFinish(true);
	};

	const selectDifficulty = (level: Difficulty) => {
		setLevel(level);
	};

	return (
		<main>
			<h1>REACT QUIZ</h1>

			{!(questions.length > 0) && !loading && !finish && (
				<div>
					<div>
						<h2>난이도를 선택하세요</h2>
						{Object.values(Difficulty).map((level: Difficulty) => (
							<button onClick={() => selectDifficulty(level)}>{level}</button>
						))}
					</div>
					<button className="start-btn" onClick={startQuiz}>
						START
					</button>
				</div>
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

			{!loading && !finish && questionNum > 0 && (
				<button onClick={prevQuestion} className="prev-btn">
					이전
					<ArrowBigLeft />
				</button>
			)}

			{!loading &&
				questions.length > 0 &&
				!finish &&
				TOTAL_QUESTIONS > questionNum + 1 && (
					<button onClick={nextQuestion} className="next-btn">
						다음
						<ArrowBigRight />
					</button>
				)}

			{!loading && !finish && TOTAL_QUESTIONS === questionNum + 1 && (
				<button onClick={submitQuiz} className="submit-btn">
					제출
				</button>
			)}
			{errorMessage && <p>{errorMessage}</p>}
			{!loading && finish && (
				<ResultPopup scores={scores} userState={userState} />
			)}
		</main>
	);
}

export default App;
