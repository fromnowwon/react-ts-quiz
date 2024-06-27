import { ArrowBigRight } from "lucide-react";
import { throttledFetchQuestions } from "./API";
import { useState } from "react";
import { Difficulty, Question, UserAnswer } from "./types/Question";
import QuestionCard from "./components/QuestionCard";

const TOTAL_QUESTIONS = 10;

function App() {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [questionNum, setQuestionNum] = useState(0);
	const [loading, setLoading] = useState(false);
	const [score, setScore] = useState(0);
	const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
	const [finish, setFinish] = useState(false);

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
		}
		setQuestionNum(0);
		setScore(0);
		setLoading(false);
	};

	const checkAnswer = (e: React.MouseEvent<HTMLInputElement>) => {
		const selectedAnswer = e.currentTarget.value;
		const correctAnswer = questions[questionNum].correct_answer;
		const correct = selectedAnswer === correctAnswer;

		if (correct) {
			setScore((prevScore) => prevScore + 1);
		}

		const userAnswersObject: UserAnswer = {
			question: questions[questionNum].question,
			selectedAnswer,
			correct,
			correctAnswer: questions[questionNum].correct_answer,
		};

		setUserAnswers((prevAnswer) => [...prevAnswer, userAnswersObject]);
	};

	const nextQuestion = () => {
		if (questionNum === TOTAL_QUESTIONS) setFinish(true);
		else setQuestionNum((prevNum) => prevNum + 1);
	};

	return (
		<main>
			<h1>REACT QUIZ</h1>
			<button className="start-btn" onClick={startQuiz}>
				START
			</button>
			<p>Score: {score}</p>
			{!loading && questions.length > 0 && !finish && (
				<QuestionCard
					questionNum={questionNum}
					totalQuestions={TOTAL_QUESTIONS}
					question={questions[questionNum].question}
					answers={questions[questionNum].answers}
					checkAnswer={checkAnswer}
				/>
			)}
			<button onClick={nextQuestion} className="next-btn">
				NEXT QUESTION
				<ArrowBigRight />
			</button>
		</main>
	);
}

export default App;
