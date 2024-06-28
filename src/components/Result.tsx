import { PartyPopper } from "lucide-react";
import { UserState } from "../types/Question";
import { filterHtml } from "../util";

interface ResultProps {
	scores: number[];
	userState: UserState[];
}

const Result: React.FC<ResultProps> = ({ scores, userState }) => {
	const totalScore = scores.reduce((acc, curr) => acc + curr);

	return (
		<div>
			<h2>
				<PartyPopper />
				결과
				<PartyPopper />
			</h2>
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

export default Result;
