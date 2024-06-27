interface QuestionCardProps {
	question: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
	return (
		<div>
			<p className="quiz-num"></p>
			<p>{question}</p>
		</div>
	);
};

export default QuestionCard;
