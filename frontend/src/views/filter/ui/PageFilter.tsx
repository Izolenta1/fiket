'use client'

import { AnimatedMain } from "@/shared/ui";
import {
    SearchHeader,
    FilterResults
} from "@/widgets";

const PageFilter = () => {
    return (
        <AnimatedMain>
            <SearchHeader
            title="Фильтр"
            hideSearch={true}
            />
            
            <FilterResults />
        </AnimatedMain>
    )
}

export { PageFilter };