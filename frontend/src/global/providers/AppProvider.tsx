"use client";

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from "@/shared/api";
import { BrowserWidthProvider } from "./BrowserWidthProvider";
import { GlobalToastProvider } from "./GlobalToastProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<GlobalToastProvider>
				<BrowserWidthProvider>
					{children}
				</BrowserWidthProvider>
			</GlobalToastProvider>
		</QueryClientProvider>
	);
};

export { AppProvider };
