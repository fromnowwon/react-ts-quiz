import { Difficulty, Question } from "./types/Question";

export const fetchQuestions = async (
	amount: number,
	difficulty: Difficulty
) => {
	const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
	const response = await fetch(endpoint);
	const data = await response.json();
	const questions = data.results.map((question: Question) => {
		return {
			...question,
		};
	});

	return questions;
};
