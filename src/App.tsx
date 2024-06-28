import {
	ArrowLeftCircleIcon,
	ArrowRightCircleIcon,
	EditIcon,
} from "lucide-react";
import { fetchQuestions } from "./API";
import { useState } from "react";
import { Difficulty, Question, UserState } from "./types/Question";
import QuestionCard from "./components/QuestionCard";
import Result from "./components/Result";

const TOTAL_QUESTIONS = 10;

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
			const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, level);
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

	const restartQuiz = () => {
		setQuestions([]);
		setUserState([]);
		setQuestionNum(0);
		setScores(Array.from({ length: TOTAL_QUESTIONS }, () => 0));
		setAnswered(Array.from({ length: TOTAL_QUESTIONS }, () => false));
		setFinish(false);
		setErrorMessage("");
	};

	const retryQuiz = () => {
		setQuestionNum(0);
		setScores(Array.from({ length: TOTAL_QUESTIONS }, () => 0));
		setFinish(false);
		setErrorMessage("");
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
				`다음 문제에 대한 답변을 선택하세요: ${unanswered
					.map((un) => `${un}번`)
					.join(", ")}`
			);
		}

		setFinish(true);
	};

	const selectDifficulty = (lv: Difficulty) => {
		setLevel(lv);
	};

	return (
		<main className="py-10 space-y-5">
			<h1 className="font-bold text-3xl text-center">REACT QUIZ</h1>

			<div className="max-w-lg mx-auto bg-slate-100 rounded-md p-7">
				{!(questions.length > 0) && !loading && !finish && (
					<div className="text-center">
						<div className="flex items-center justify-center">
							{Object.values(Difficulty).map((lv: Difficulty) => (
								<button
									key={lv}
									className={`font-bold mx-3 hover:underline underline-offset-4 ${
										level === lv ? "underline" : ""
									}`}
									onClick={() => selectDifficulty(lv)}
								>
									{lv.toUpperCase()}
								</button>
							))}
						</div>
						<button
							className="mt-5 w-20 text-lg rounded-md bg-slate-900 text-white hover:bg-slate-700"
							onClick={startQuiz}
						>
							START
						</button>
					</div>
				)}

				{loading && <p className="text-center">퀴즈 불러오는 중...</p>}
				{!loading && questions.length > 0 && !finish && (
					<QuestionCard
						questionNum={questionNum}
						totalQuestions={TOTAL_QUESTIONS}
						question={questions[questionNum].question}
						answers={questions[questionNum].answers}
						checkAnswer={checkAnswer}
						userState={userState}
					/>
				)}

				{!loading && !finish && questions.length > 0 && (
					<div>
						<div className="flex justify-between items-center mt-4 pt-3 border-t-2 border-gray-200">
							<div className="my-3 flex gap-3">
								<button
									onClick={prevQuestion}
									disabled={questionNum === 0 ? true : false}
									className={`text-sm ${
										questionNum === 0 ? "text-gray-400" : "text-gray-800"
									}`}
								>
									<ArrowLeftCircleIcon />
								</button>

								<button
									onClick={nextQuestion}
									disabled={questionNum + 1 === questions.length ? true : false}
									className={`text-sm ${
										questionNum + 1 === questions.length
											? "text-gray-400"
											: "text-gray-800"
									}`}
								>
									<ArrowRightCircleIcon />
								</button>
							</div>
							<div>
								{TOTAL_QUESTIONS === questionNum + 1 && (
									<button
										onClick={submitQuiz}
										className="flex items-center text-sm"
									>
										<span className="font-bold">제출</span>
										<EditIcon className="scale-75" />
									</button>
								)}
							</div>
						</div>

						{errorMessage && (
							<p className="font-bold text-sm text-right text-red-500">
								{errorMessage}
							</p>
						)}
					</div>
				)}
				{!loading && finish && (
					<Result
						scores={scores}
						userState={userState}
						restartQuiz={restartQuiz}
						retryQuiz={retryQuiz}
					/>
				)}
			</div>
		</main>
	);
}

export default App;
