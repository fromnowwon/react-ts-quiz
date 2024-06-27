import { throttle } from "lodash";
import { Difficulty, Question } from "./types/Question";
import { shuffleArray } from "./util";

export const fetchQuestions = async (
	amount: number,
	difficulty: Difficulty
) => {
	const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
	const response = await fetch(endpoint);
	const data = await response.json();
	const questions = data.results.map((question: Question) => {
		const answers = shuffleArray([
			...question.incorrect_answers,
			question.correct_answer,
		]);

		return {
			...question,
			answers,
		};
	});

	return questions;
};

export const throttledFetchQuestions = throttle(fetchQuestions, 60000, {
	leading: true, // 처음 호출 즉시 실행
	trailing: false, // 마지막 호출을 무시
});
