'use client'

import { useSearchContext } from "./SearchProvider";
import {
    useEffect,
    useEffectEvent
} from "react";
import { useSearchParams } from 'next/navigation'

const FilterParamsInitializator = () => {
    const { initGenres, setType, setYearFrom, setYearTo, setStatus, setPublisher, setRating, setSort } = useSearchContext()
    const searchParams = useSearchParams()

    const initializatorEvent = useEffectEvent(() => {
        // Разбор параметров поиска и инициализация их в контекст
        const applySingleValue = (key: string, setter: (val: string) => void) => {
            const value = searchParams.get(key);
            if (value && !Array.isArray(value)) {
                setter(value);
            }
        };

        const applyArrayValue = (key: string, setter: (val: string[]) => void) => {
            const value = searchParams.get(key);
            if (value) {
                setter(Array.isArray(value) ? value : [value]);
            }
        };

        applyArrayValue("genres_id", initGenres);
        applySingleValue("comic_type", setType);
        applySingleValue("date_from", setYearFrom);
        applySingleValue("date_to", setYearTo);
        applySingleValue("status", setStatus);
        applySingleValue("publisher", setPublisher);
        applySingleValue("rating", setRating);

        // Применение сортировки
        const sortMap: { [key: string]: string } = {
            "views_sort:desc": "Популярные",
            "views_sort:asc": "Не популярные",
            "date_sort:desc": "Новые",
            "date_sort:asc": "Старые",
            "rating_sort:desc": "С высоким рейтингом",
            "rating_sort:asc": "С низким рейтингом"
        };

        for (const [key, label] of Object.entries(sortMap)) {
            const [param, value] = key.split(":");
            if (searchParams.get(param) === value) {
                setSort(label);
                break;
            }
        }        
    })

    useEffect(() => {
        initializatorEvent()
    }, [])

    return null;
}

export { FilterParamsInitializator }