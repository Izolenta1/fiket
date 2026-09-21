'use client'

import dynamic from 'next/dynamic';

const YandexMetrikaMainDynamic = dynamic(() => import('./YandexMetrika').then(mod => mod.YandexMetrika), { ssr: false });
const YandexMetrikaFallbackDynamic = dynamic(() => import('./YandexMetrika').then(mod => mod.YandexMetrikaFallback), { ssr: false });

export { YandexMetrikaMainDynamic, YandexMetrikaFallbackDynamic }