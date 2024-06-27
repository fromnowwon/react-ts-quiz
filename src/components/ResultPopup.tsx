import { UserState } from "../types/Question";
import { filterHtml } from "../util";

interface ResultPopupProps {
	scores: number[];
	userState: UserState[];
}

const ResultPopup: React.FC<ResultPopupProps> = ({ scores, userState }) => {
	const totalScore = scores.reduce((acc, curr) => acc + curr);

	return (
		<div>
			<h2>결과</h2>
			{userState.map((answer, idx) => (
				<li key={idx}>
					<p>
						{idx + 1}번: {answer.correct ? 1 : 0}점
					</p>
					<p>정답: {filterHtml(answer.correctAnswer)}</p>
					<p>내가 선택한 답: {filterHtml(answer.selectedAnswer)}</p>
				</li>
			))}
			<p>총 {totalScore}점</p>
		</div>
	);
};

export default ResultPopup;
