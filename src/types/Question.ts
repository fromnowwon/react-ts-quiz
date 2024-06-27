export type Question = {
	category: string;
	correct_answer: string;
	difficulty: Difficulty;
	incorrect_answers: string[];
	question: string;
	answers: string[];
	type: string;
};

export enum Difficulty {
	EASY = "easy",
	MEDIUM = "medium",
	HARD = "hard",
}

export type UserState = {
	question: string;
	selectedAnswer: string;
	correct: boolean;
	correctAnswer: string;
};
