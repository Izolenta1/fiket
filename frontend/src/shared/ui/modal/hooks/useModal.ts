'use client'

import { useState } from "react";

export function useModal() {
	const [state, setState] = useState(false);

	const openModal = () => setState(true);

	const closeModal = () => setState(false);

	return {
		open: state,
		openModal,
		closeModal,
	};
}
