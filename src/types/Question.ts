export type Question = {
	category: string;
	correct_answer: string;
	difficulty: Difficulty;
	incorrect_answers: string[];
	question: string;
	type: string;
};

export enum Difficulty {
	EASY = "easy",
	MEDIUM = "medium",
	HARD = "hard",
}
