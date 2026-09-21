'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

type YandexMetrikaMethod =
  | "init"
  | "hit"
  | "addFileExtension"
  | "extLink"
  | "file"
  | "firstPartyParams"
  | "firstPartyParamsHashed"
  | "getClientID"
  | "notBounce"
  | "params"
  | "reachGoal"
  | "setUserID"
  | "userParams";

declare const ym: (
    id: number,
    method: YandexMetrikaMethod,
    ...params: unknown[]
) => void;

const YandexMetrika = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const url = `${pathname}?${searchParams}`
        if (process.env.NEXT_PUBLIC_YAMETRIKA_ID && process.env.NEXT_PUBLIC_YAMETRIKA_STATE === "ON") {
            ym(Number(process.env.NEXT_PUBLIC_YAMETRIKA_ID), 'hit', url);
        }

    }, [pathname, searchParams])

    if (process.env.NEXT_PUBLIC_YAMETRIKA_STATE === "ON") {
        return (
            <Script
            id="metrika-counter"
            strategy="afterInteractive"
            >
                {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                    m[i].l=1*new Date();
                    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                    ym(${process.env.NEXT_PUBLIC_YAMETRIKA_ID}, "init", {
                            webvisor:true,
                            defer: true,
                            trackLinks:true,
                            trackHash:true,
                            accurateTrackBounce:true,
                            clickmap: true,
                            useCDN:false,
                            trustedDomains:["fiket.ru"]
                    });`
                }
            </Script>
        );
    }
}

const YandexMetrikaFallback = () => {
    if (process.env.NEXT_PUBLIC_YAMETRIKA_STATE === "ON") {
        return (
            <noscript>
                <div>
                    <img
                        src={`https://mc.yandex.ru/watch/${process.env.NEXT_PUBLIC_YAMETRIKA_ID}`}
                        style={{ position: 'absolute', left: '-9999px' }}
                        alt=""
                    />
                </div>
            </noscript>
        )
    }
}

export { YandexMetrika, YandexMetrikaFallback }