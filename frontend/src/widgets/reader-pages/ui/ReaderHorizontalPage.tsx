'use client'

import {
    useHorizontalPage,
    usePrepareHorizontalPage
} from "@/entities";
import { useEffect } from "react";
import {
    LoadingBlock,
    NoDataPlug
} from "@/shared/ui";
import Image from "next/image";
import clsx from "clsx";
import { Z_INDEX } from "@/shared/config";

const ReaderHorizontalPage = ({ chapter_id, page, page_limit }: TReaderHorizontalPageProps) => {
    const { data: comicPage, isLoading: isComicPageLoading, error: comicPageError } = useHorizontalPage(chapter_id, page)
    const { data: nextComicPage } = usePrepareHorizontalPage(chapter_id, page, page_limit)

    // Предзагрузка следующей страницы
    useEffect(() => {
        if (nextComicPage) {
            const img = new window.Image();
            img.src = nextComicPage.value; // загрузится в кэш
        }
    }, [nextComicPage]);

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

        if (comicPage && !isComicPageLoading) {
            return (
                <div
                className={clsx(
                "relative flex",
                "w-full h-screen"
                )}
                >
                    {/* Фоновое изображение */}
                    <div
                    className={clsx(
                    "absolute inset-0",
                    "bp700px:hidden"
                    )}
                    style={{
                    zIndex: Z_INDEX.readerPageBackground
                    }}
                    >
                        <Image
                        src={comicPage.value}
                        alt="page_background"
                        unoptimized
                        width={0}
                        height={0}
                        fill
                        className={clsx(
                        "object-cover blur-[10px]"
                        )}
                        />

                        <div
                        className={clsx(
                        "absolute inset-0",
                        "bg-surface_container"
                        )}
                        />
                    </div>

                    {/* Основное изображение */}
                    <div
                    className={clsx(
                    "grow flex justify-center items-center",
                    "mt-[13.8vw]",
                    "bp700px:mt-[7.14vw]",
                    "bp1200px:mt-[50px]"
                    )}
                    style={{
                    zIndex: Z_INDEX.readerPage
                    }}
                    >
                        <Image
                        src={comicPage.value}
                        alt="page"
                        unoptimized
                        width={0}
                        height={0}
                        className={clsx(
                        "object-contain select-none",
                        "h-full w-auto"
                        )}
                        />
                    </div>
                </div>
            )
        }
    }

    return (
        renderPage()
    )
}

export { ReaderHorizontalPage };

type TReaderHorizontalPageProps = {
    chapter_id: string,
    page: number,
    page_limit: number
}