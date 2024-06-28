import { filterHtml } from "../util";
import { CheckCircle } from "lucide-react";
import { UserState } from "../types/Question";

interface QuestionCardProps {
	questionNum: number;
	totalQuestions: number;
	question: string;
	answers: string[];
	checkAnswer: (e: React.MouseEvent<HTMLInputElement>) => void;
	userState: UserState[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({
	questionNum,
	totalQuestions,
	question,
	answers,
	checkAnswer,
	userState,
}) => {
	const handleClickAnswer = (e: React.MouseEvent<HTMLInputElement>) => {
		checkAnswer(e);
	};

	return (
		<div>
			<p className="quiz-num text-sm">
				<span className="font-bold">{questionNum + 1}</span> / {totalQuestions}
			</p>
			<p className="mt-2 font-bold">{filterHtml(question)}</p>
			<div className="mt-2 flex flex-col gap-2">
				{answers.map((answer, idx) => (
					<label key={idx}>
						<div className="flex">
							<span className="mr-2">{idx + 1}.</span>
							<input
								type="button"
								onClick={handleClickAnswer}
								value={filterHtml(answer)}
								className="inline-block cursor-pointer text-wrap text-left hover:underline"
								data-idx={idx}
							/>
						</div>
					</label>
				))}

				<div className="flex items-center mt-3">
					<CheckCircle className="text-red-500 scale-75" />
					<p className="text-red-500 text-sm ml-1">
						선택 답안:
						<span className="ml-2 font-bold">
							{userState[questionNum]
								? userState[questionNum].selectedAnswer
								: "-"}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default QuestionCard;
