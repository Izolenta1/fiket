'use client'

import { createContext, useContext, useState, useEffect } from "react";

const BrowserWidthContext = createContext<number | undefined>(undefined);

const BrowserWidthProvider = ({ children }: { children: React.ReactNode }) => {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		setWidth(window.innerWidth)

		const handle = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handle);
		return () => window.removeEventListener("resize", handle);
	}, []);

	return <BrowserWidthContext.Provider value={width}>{children}</BrowserWidthContext.Provider>;
}

export { BrowserWidthProvider };

export function useBrowserWidth() {
    const ctx = useContext(BrowserWidthContext);
    if (ctx === undefined) {
        throw new Error("useBrowserWidth must be used inside BrowserWidthProvider");
    }
    return ctx;
}
