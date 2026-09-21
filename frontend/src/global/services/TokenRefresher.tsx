"use client";

import { useEffect, useEffectEvent } from "react";
import { useRefreshMutation } from "@/features/auth";
import { useUser } from "../providers";
import Cookies from "js-cookie";

const TokenRefresher = ({ refreshToken }: TTokenRefresherProps) => {
    const { clearUser } = useUser()

    const {mutate: refreshMutate, isPending: refreshPending} = useRefreshMutation({
        onError: () => {
            clearUser()
        }
    })

    const refreshEvent = useEffectEvent(() => {
        if (refreshPending) return

        refreshMutate();
    })

    const conditionRefreshEvent = useEffectEvent(() => {
        if (refreshPending) return

        const access_token = Cookies.get("access_token")
        if (access_token) return

        refreshMutate();
    })

	useEffect(() => {
        if (!refreshToken) return

		const interval = setInterval(refreshEvent, 10 * 60 * 1000);
        window.addEventListener("focus", conditionRefreshEvent);

		return () => {
            clearInterval(interval)
            window.removeEventListener("focus", conditionRefreshEvent);
        };
	}, [refreshToken]);

	return null;
}

export { TokenRefresher }

type TTokenRefresherProps = {
	refreshToken: string | undefined
}