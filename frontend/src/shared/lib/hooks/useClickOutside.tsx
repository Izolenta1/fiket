'use client'

import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(handler: () => void) {
	const elementRef = useRef<T | null>(null);

	useEffect(() => {
        if (!elementRef.current) return;

		const listener = (event: MouseEvent | TouchEvent) => {
            if (!elementRef.current?.contains(event.target as Node)) {
                handler();
            }
		};

		document.addEventListener("mouseup", listener);

		return () => {
			document.removeEventListener("mouseup", listener);
		};
	}, [elementRef, handler]);

	return elementRef;
}
