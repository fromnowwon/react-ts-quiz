import { ArrowBigRight } from "lucide-react";
import { fetchQuestions } from "./API";

function App() {
	return (
		<main>
			<h1>REACT QUIZ</h1>
			<button className="start-btn" onClick={fetchQuestions()}>
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
