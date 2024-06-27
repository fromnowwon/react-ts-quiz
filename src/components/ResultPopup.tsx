interface ResultPopupProps {
	scores: number[];
	totalQuestions: number;
}

const ResultPopup: React.FC<ResultPopupProps> = ({
	scores,
	totalQuestions,
}) => {
	return (
		<div>
			<div>
				<h2>결과</h2>
				{scores.map((score) => (
					<div>{score}</div>
				))}
				<p>{totalQuestions}문제</p>
			</div>
		</div>
	);
};

export default ResultPopup;
