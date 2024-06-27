import { filterHtml } from "../util";

interface QuestionCardProps {
	questionNum: number;
	totalQuestions: number;
	question: string;
	answers: string[];
	checkAnswer: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
	questionNum,
	totalQuestions,
	question,
	answers,
	checkAnswer,
}) => {
	const handleClickAnswer = (e: React.MouseEvent<HTMLInputElement>) => {
		checkAnswer(e);
	};

	return (
		<div>
			<p className="quiz-num">
				{questionNum + 1} / {totalQuestions}
			</p>
			<p>{filterHtml(question)}</p>
			<div>
				{answers.map((answer, idx) => (
					<label key={idx}>
						<span>{idx + 1}.</span>
						<input
							type="button"
							onClick={handleClickAnswer}
							value={filterHtml(answer)}
						/>
					</label>
				))}
			</div>
		</div>
	);
};

export default QuestionCard;
