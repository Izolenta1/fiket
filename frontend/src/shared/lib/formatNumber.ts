export function formatNumber(num: number | undefined): string {
    if (!num && num !== 0) {
        return ""
    }

	if (num >= 1_000_000) {
		return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + " млн.";
	}
	if (num >= 1_000) {
		return (num / 1_000).toFixed(1).replace(/\.0$/, "") + " тыс.";
	}
	return num.toString();
}