import { ArrowLeft, Dot, PartyPopper } from "lucide-react";
import { UserState } from "../types/Question";
import { filterHtml } from "../util";

interface ResultProps {
	scores: number[];
	userState: UserState[];
	restartQuiz: () => void;
	retryQuiz: () => void;
}

const Result: React.FC<ResultProps> = ({
	scores,
	userState,
	restartQuiz,
	retryQuiz,
}) => {
	const totalScore = scores.reduce((acc, curr) => acc + curr);
	const handleRetryQuiz = () => {
		retryQuiz();
	};

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
					</li>
				))}
			</ul>
			<div className="flex gap-4 justify-center border-t-2 mt-5 pt-4 px-5">
				<button className="flex w-20" onClick={handleRetryQuiz}>
					<ArrowLeft className="scale-75" />
					다시풀기
				</button>
				<button
					className="w-20 rounded-md bg-slate-900 text-white hover:bg-slate-700"
					onClick={restartQuiz}
				>
					처음으로
				</button>
			</div>
		</div>
	);
};

export default Result;
