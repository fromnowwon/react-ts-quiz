import { Dot, PartyPopper } from "lucide-react";
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
			<h2 className="flex justify-center font-bold text-2xl">결과</h2>
			<p className="mt-2 pb-3 text-center font-bold text-lg">
				총 {totalScore}점
			</p>

			<ul className="flex flex-col gap-3">
				{userState.map((answer, idx) => (
					<li
						key={idx}
						className="list-none flex flex-col gap-1 border-t-2 pt-3 px-5"
					>
						<p
							className={`flex font-bold ${
								answer.correct ? "text-green-600" : "text-red-600"
							}`}
						>
							{idx + 1}번 ({answer.correct ? "정답" : "오답"}
							{answer.correct && <PartyPopper className="scale-75" />})
						</p>
						<p className="flex">
							<Dot />
							{answer.correct ? 1 : 0}점
						</p>
						<p className="flex">
							<Dot />
							선택한 답: {filterHtml(answer.selectedAnswer)}
						</p>

						{!answer.correct && (
							<p className="flex">
								<Dot />
								정답: {filterHtml(answer.correctAnswer)}
							</p>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Result;
