'use client'

import { useVerticalPages } from "@/entities";
import {
    LoadingBlock,
    NoDataPlug
} from "@/shared/ui";
import Image from "next/image";
import clsx from "clsx";
import { Z_INDEX } from "@/shared/config";

const ReaderVerticalPage = ({ chapter_id, page, page_limit, setPage }: TReaderVerticalPageProps) => {
    const { data: comicPage, isLoading: isComicPageLoading, hasNextPage: isPageNext, isFetchingNextPage: isPageNextFetching, error: comicPageError, ref: pageLoadingRef } = useVerticalPages(chapter_id, page, page_limit, setPage)

    function renderPage() {
        if (comicPageError) {
            if (comicPageError.response) {
                switch (comicPageError.response.status) {
                    case 403: 
                    return (
                        <div
                        className={clsx(
                        "relative w-full h-screen",
                        "flex justify-center items-center"
                        )}
                        >
                            <NoDataPlug
                            text="Этот комикс является платным. Купите комикс и у вас откроется доступ к главам."
                            />
                        </div>
                    )
                    case 404: 
                    return (
                        <div
                        className={clsx(
                        "relative w-full h-screen",
                        "flex justify-center items-center"
                        )}
                        >
                            <NoDataPlug
                            text="Содержимое главы по какой-то причине не найдено :/"
                            />
                        </div>
                    )
                    case 429: 
                    return (
                        <div
                        className={clsx(
                        "relative w-full h-screen",
                        "flex justify-center items-center"
                        )}
                        >
                            <NoDataPlug
                            text="Вы листали слишком быстро. Попробуйте листать помедленнее."
                            />
                        </div>
                    )
                }
            }
        }

        if (isComicPageLoading) {
            return (            
                <LoadingBlock
                classNames={{
                root: "relative w-full h-screen"
                }}
                />
            )
        }

        if (comicPage) {
            return (
                <div
                className={clsx(
                "flex flex-col self-center w-fit",
                "mt-[13.8vw]",
                "bp700px:mt-[7.14vw]",
                "bp1200px:mt-[50px]"
                )}
                >
                    {comicPage.pages.map((page) => {
                        return <Image
                        src={page.value}
                        alt="page"
                        key={page.value}
                        unoptimized
                        width={0}
                        height={0}
                        className={clsx(
                        "w-full h-auto",
                        "bp700px:max-w-[55.71vw]",
                        "bp1200px:max-w-[640px]"
                        )}
                        style={{
                        zIndex: Z_INDEX.readerPage
                        }}
                        />
                    })}

                    <div
                    ref={pageLoadingRef}
                    className={clsx(
                    "py-[3.3vw]",
                    "bp700px:py-[1.71vw]",
                    "bp1200px:p-[12px]",
                    !isPageNext && !isPageNextFetching ? "hidden" : ""
                    )}
                    >
                        <LoadingBlock/>
                    </div>
                </div>
            )
        }
    }
    
    return (
        renderPage()
    )
}

export { ReaderVerticalPage };

type TReaderVerticalPageProps = {
    chapter_id: string,
    page: number,
    page_limit: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
}