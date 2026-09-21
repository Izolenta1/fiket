'use client'

import clsx from "clsx"
import { useFilter } from "@/entities"
import { useSearchParams } from "next/navigation"
import {
    NoDataPlug,
    LoadingBlock
} from "@/shared/ui"
import { SearchComicCard } from "./SearchComicCard";

const FilterResults = () => {
    const searchParams = useSearchParams()
    const { data: comics, ref: comicsLoadingRef, hasNextPage: isComicsNext, isLoading: isComicsLoading } = useFilter(searchParams)

	// Рендер блока комисков
	const renderComics = () => {
        if (comics) {
            if (comics.pages[0].answer.length <= 0) {
                return (
                    <NoDataPlug
                    text="Комиксы не найдены. Попробуйте выбрать другие параметры фильтрации."
                    classNames={{
                    root: "col-span-full"
                    }}
                    />
                )
            }

			return comics.pages.map((group) => (
                group.answer.map((comic) => (
                    <SearchComicCard key={comic.id} comic={comic}/>
                ))
            ))
		}
	}
    
    return (
		<section
        className={clsx(
        "flex flex-col gap-[5.5vw]",
        "bp700px:gap-[4.57vw]",
        "bp1200px:gap-[32px]"
        )}
        >
			{/* Тайтлы */}
			<div
            className={clsx(
            "flex flex-col gap-[2.7vw]",
            "bp700px:gap-[1.43vw]",
            "bp1200px:gap-[10px]"
            )}
            >
				<h2
                className={clsx(
                "label_l2 text-texticon_base_header select-none"
                )}
                >Тайтлы</h2>

                <div
                className={clsx(
                "flex flex-col gap-[2.7vw]",
                "bp700px:grid bp700px:grid-cols-3 bp700px:justify-between bp700px:gap-y-[3.43vw] bp700px:gap-x-[4.57vw]",
                "bp1200px:gap-x-[32px] bp1200px:gap-y-[32px] bp1200px:grid-cols-5"
                )}
                >
                    {renderComics()}
                </div>

                <div
                ref={comicsLoadingRef}
                className={clsx(
                (isComicsNext || isComicsLoading) ? "" : "hidden"
                )}
                >
                    <LoadingBlock />
                </div>
			</div>
		</section>
    )
}

export { FilterResults };