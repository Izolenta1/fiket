'use client'

import {
    AnimatePresence,
    motion
} from "framer-motion";
import {
    useEffect,
    useState
} from "react";
import { useSearch } from "@/features/search";
import {
    LoadingBlock,
    NoDataPlug,
    Button
} from "@/shared/ui";
import dynamic from "next/dynamic";
export const Ads = dynamic(() => import('@/widgets').then(mod => mod.Ads), { ssr: false });
import { SearchComicCard } from "./SearchComicCard";
import { AuthorCard } from "@/entities";
import clsx from "clsx";

const SearchResults = ({ debouncedSearch }: TSearchResultsProps) => {
    const { data: searchData, isLoading: isSearchLoading } = useSearch(debouncedSearch)

	const [comicsFull, setComicsFull] = useState(false)
	const [authorsFull, setAuthorsFull] = useState(false)

	useEffect(() => {
		setComicsFull(false)
		setAuthorsFull(false)
	}, [searchData])

	// Рендер блока комисков
	const renderComics = () => {
		if (isSearchLoading) {
			return <LoadingBlock/>
		}

		if (searchData && searchData.comics.length > 0) {
			const visibleComics = comicsFull ? searchData.comics : searchData.comics.slice(0, 5)

			return (
                <>
                    <div
                    className={clsx(
                    "flex flex-col gap-[2.7vw]",
                    "bp700px:grid bp700px:grid-cols-3 bp700px:justify-between bp700px:gap-y-[3.43vw] bp700px:gap-x-[4.57vw]",
                    "bp1200px:gap-x-[32px] bp1200px:gap-y-[32px] bp1200px:grid-cols-5"
                    )}
                    >
                        {visibleComics.map((comic) => (<SearchComicCard key={comic.id} comic={comic}/>))}
                    </div>

                    {(searchData.comics.length > 5 && !comicsFull) && 
                    <Button
                    text={`Показать все ${searchData.comics.length}`}
                    onClick={() => setComicsFull(true)}
                    variant='primary'
                    classNames={{
                    root: "mt-[2.7vw] bp700px:mt-[4.57vw] bp1200px:mt-[32px]"
                    }}
                    />}
                </>
            )
		}
		else {
			return (
                <NoDataPlug
                text={`Комиксы не найдены. ${searchData ? "К сожалению по вашему запросу ничего найдено не было :(" : "Поиск осуществляется от трех символов"}`}
                />
            )
		}
	}

	// Рендер блока авторов
	const renderAuthors = () => {
		if (isSearchLoading) {
			return <LoadingBlock/>
		}

		if (searchData && searchData.authors.length > 0) {
			const visibleAuthors = authorsFull ? searchData.authors : searchData.authors.slice(0, 9)

			return (
                <>
                    <div
                    className={clsx(
                    "grid grid-cols-3 gap-[2.7vw] justify-between",
                    "bp1200px:grid-cols-5 bp1200px:gap-[32px]"
                    )}
                    >
                        {visibleAuthors.map((author) => (<AuthorCard key={author.id} author={author} />))}
                    </div>

                    {(searchData.authors.length > 9 && !authorsFull) && 
                    <Button
                    text={`Показать все ${searchData.authors.length}`}
                    onClick={() => setAuthorsFull(true)}
                    variant='primary'
                    classNames={{
                    root: "mt-[8.8vw] bp700px:mt-[4.57vw] bp1200px:mt-[32px]"
                    }}
                    />}
                </>
            )
		}
		else {
			return (
                <NoDataPlug
                text={`Авторы не найдены. ${searchData ? "К сожалению по вашему запросу ничего найдено не было :(" : "Поиск осуществляется от трех символов"}`}
                />
            )
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

				{/* Враппер результата тайтлов */}
				<AnimatePresence
                initial={false}
                mode="wait"
                >
					<motion.div
                        key={searchData?.comics.toString() + isSearchLoading.toString()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
					>
						{renderComics()}
					</motion.div>
				</AnimatePresence>
			</div>

			<Ads />

			{/* Авторы */}
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
                >Авторы</h2>

				{/* Враппер результата авторов */}
				<AnimatePresence
                initial={false}
                mode="wait"
                >
					<motion.div
                    key={searchData?.comics.toString() + isSearchLoading.toString()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
					>
						{renderAuthors()}
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
    )
}

export { SearchResults };

type TSearchResultsProps = {
    debouncedSearch: string
}