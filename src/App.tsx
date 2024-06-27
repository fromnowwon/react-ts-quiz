import { ArrowBigRight } from "lucide-react";
import { throttledFetchQuestions } from "./API";
import { useState } from "react";
import { Difficulty, Question } from "./types/Question";

function App() {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [loading, setLoading] = useState(false);

	const startQuiz = async () => {
		setLoading(true);
		try {
			const newQuestions = await throttledFetchQuestions(10, Difficulty.EASY);
			setQuestions(newQuestions);
		} catch (error) {
			console.error("Error fetching questions:", error);
		}
		setLoading(false);
	};

	return (
		<main>
			<h1>REACT QUIZ</h1>
			<button className="start-btn" onClick={startQuiz}>
				START
			</button>
			<div></div>
			<button className="next-btn">
				NEXT QUESTION
				<ArrowBigRight />
			</button>
		</main>
	);
}

export default App;
