interface QuestionCardProps {
	questionNum: number;
	totalQuestions: number;
	question: string;
	answers: string[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({
	questionNum,
	totalQuestions,
	question,
	answers,
}) => {
	return (
		<div>
			<p className="quiz-num">
				{questionNum + 1} / {totalQuestions}
			</p>
			<p dangerouslySetInnerHTML={{ __html: question }}></p>
			<div>
				{answers.map((answer, idx) => (
					<button key={answer}>
						{idx + 1}.<span dangerouslySetInnerHTML={{ __html: answer }}></span>
					</button>
				))}
			</div>
		</div>
	);
};

export default QuestionCard;
