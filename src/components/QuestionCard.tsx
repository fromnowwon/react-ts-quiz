import React, { useState, useEffect } from "react";
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
	const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(
		null
	);

	useEffect(() => {
		if (userState[questionNum]?.selectedAnswer !== undefined) {
			const idx = answers.findIndex(
				(answer) => answer === userState[questionNum]?.selectedAnswer
			);
			setSelectedAnswerIdx(idx);
		} else {
			setSelectedAnswerIdx(null);
		}
	}, [questionNum, answers, userState]);

	const handleClickAnswer = (e: React.MouseEvent<HTMLInputElement>) => {
		checkAnswer(e);
		const idx = parseInt(e.currentTarget.dataset.idx || "", 10);
		setSelectedAnswerIdx(idx);
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
								className={`inline-block text-wrap text-left ${
									selectedAnswerIdx === idx
										? "hover:underline underline-offset-4"
										: "hover:underline"
								}`}
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
								? `${questionNum + 1}. ${userState[questionNum].selectedAnswer}`
								: "-"}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default QuestionCard;
