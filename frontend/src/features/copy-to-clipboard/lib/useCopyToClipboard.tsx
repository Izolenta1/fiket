import { useState, useRef } from "react";

export const useCopyToClipboard = () => {
	const [toast, setToast] = useState<null | { message: string }>(null);
	const timeoutRef = useRef<any>(null);

	const copy = (text: string) => {
		navigator.clipboard.writeText(text);

		setToast({ message: "Скопировано!" });

		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			setToast(null);
		}, 2000);
	};

	return { copy, toast };
};