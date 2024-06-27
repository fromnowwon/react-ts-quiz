// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shuffleArray = (array: any[]) => {
	return [...array].sort(() => Math.random() - 0.5);
};

export const filterHtml = (content: string) => {
	const tempDiv = document.createElement("div");
	tempDiv.innerHTML = content;
	return tempDiv.textContent || tempDiv.innerText || "";
};
