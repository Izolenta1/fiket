'use client'

import { AnimatedMain } from "@/shared/ui";
import {
    SearchHeader,
    SearchResults
} from "@/widgets";
import { useDebounce } from "@/shared/lib";
import { useState } from "react";

const PageSearch = () => {
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search, 500);
    
    return (
        <AnimatedMain>
            <SearchHeader
            title="Быстрый поиск"
            hideSearch={false}
            search={search}
            setSearch={setSearch}
            />

            <SearchResults
            debouncedSearch={debouncedSearch}
            />
        </AnimatedMain>
    )
}

export { PageSearch };