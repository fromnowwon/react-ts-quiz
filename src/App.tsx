import { ArrowBigRight } from "lucide-react";
import { throttledFetchQuestions } from "./API";
import { useState } from "react";
import { Difficulty, Question } from "./types/Question";
import QuestionCard from "./components/QuestionCard";

const TOTAL_QUESTIONS = 10;

function App() {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [questionNum, setQuestionNum] = useState(0);
	const [loading, setLoading] = useState(false);

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
		setLoading(false);
	};

	return (
		<main>
			<h1>REACT QUIZ</h1>
			<button className="start-btn" onClick={startQuiz}>
				START
			</button>
			{!loading && questions.length > 0 && (
				<QuestionCard question={questions[questionNum].question} />
			)}
			<button className="next-btn">
				NEXT QUESTION
				<ArrowBigRight />
			</button>
		</main>
	);
}

export default App;
