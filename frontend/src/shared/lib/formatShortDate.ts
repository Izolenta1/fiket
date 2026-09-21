const months = ["янв.", "фев.", "мар.", "апр.", "мая", "июн.", "июл.", "авг.", "сен.", "окт.", "ноя.", "дек."];

export function formatShortDate(date_string: string) {
	const date = new Date(date_string);

	const day = date.getDate();
	const month = months[date.getMonth()];

	return `${day} ${month}`;
}
