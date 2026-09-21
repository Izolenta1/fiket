import "@/global/css/globals.css"

import {
	CookieNotification
} from "@/widgets";
import {
	AppProvider,
	UserProvider,
} from "@/global/providers";
import { GlobalToastWrapper } from "@/shared/ui";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/shared/lib";
import {
	TokenRefresher,
	YandexMetrikaMainDynamic,
	YandexMetrikaFallbackDynamic,
	ScrollRestoration
} from "@/global/services";

export const metadata = {
	metadataBase: new URL('https://fiket.ru'),
	other: {
		"apple-mobile-web-app-title": "Fiket",
	},
}

export const viewport = {
    themeColor: '#030C11',
    width: 'device-width',
    initialScale: 1,
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("access_token")?.value;
	const refreshToken = cookieStore.get("refresh_token")?.value;

	const user = await getUserFromToken(accessToken)

	return (
		<html lang="ru" className="bg-surface_body">
			<body className="relative flex flex-col min-h-[100vh]">
				<CookieNotification />
				<YandexMetrikaMainDynamic />

				<AppProvider>
					<UserProvider
					initialUser={user}
					>
						<TokenRefresher refreshToken={refreshToken} />
						<GlobalToastWrapper />
						{children}
					</UserProvider>
				</AppProvider>

				<ScrollRestoration />
				<YandexMetrikaFallbackDynamic />
			</body>
		</html>
	);
}