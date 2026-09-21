'use client'

import { useUserList } from "../model/queries";
import {
    Accordion,
    NoDataPlug,
    LoadingBlock
} from "@/shared/ui";
import clsx from "clsx";
import { ComicCard } from "@/entities/comic";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const ProfileSavedComicsBlock = ({ username, category_id, list_name, list_mode }: TProfileSavedComicsBlockProps) => {
	const { data: list, ref: listLoadingRef, hasNextPage: isListNext, isLoading: isListLoading, refetch: refetchList, enabled: isListEnabled } = useUserList(username, category_id, list_mode)
    
    const renderList = () => {
        if (list) {
            if (list.pages[0].answer.length <= 0) {
                return <NoDataPlug text="Данный список пуст :/" />
            }
            
			return list.pages.map((group, i) => (
                group.answer.map((comic) => (
                    <ComicCard
                    key={comic.id}
                    comic={comic}
                    />
                ))
			))
		}
	}

	const queryClient = useQueryClient()

	useEffect(() => {
		// Сброс комиксов и рефетч первой страницы
		queryClient.removeQueries({ queryKey: ["list", username, category_id] })

		refetchList()
	}, [list_mode])
    
    return (
        <section
        className={(
        "self-start w-full"
        )}
        >
            <Accordion
            title={list_name}
            >
                <div
                className={clsx(
                "flex flex-col gap-[3.3vw]",
                "bp700px:gap-[3.43vw]",
                "bp1200px:gap-[32px]"
                )}
                >
                    <div
                    className={clsx(
                    "grid grid-cols-3 gap-[3.3vw]",
                    "bp700px:gap-x-[4.57vw] bp700px:gap-y-[3.43vw]",
                    "bp1200px:gap-[32px] bp1200px:grid-cols-5"
                    )}
                    >
                        {renderList()}
                    </div>

                    <div
                    ref={listLoadingRef}
                    className={clsx(
                    (!isListEnabled || isListNext || isListLoading) ? "" : "hidden"
                    )}
                    >
                        <LoadingBlock />
                    </div>
                </div>
            </Accordion>

        </section>
    )
}

export { ProfileSavedComicsBlock };

type TProfileSavedComicsBlockProps = {
    username: string;
    category_id: string;
    list_name: string;
    list_mode: string
}