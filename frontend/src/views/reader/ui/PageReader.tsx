'use client'

import {
    ReaderHeader,
    ReaderHorizontalPage,
    ReaderVerticalPage
} from "@/widgets";
import { useState } from "react";
import { useChapter } from "@/entities";
import {
    ReaderHorizontalNavigation,
    ReaderVerticalNavigation
} from "./navigation";

const PageReader = ({ comic_transliterate_id, chapter_id }: TPageReaderProps) => {
    const [currentPage, setCurrentPage] = useState(0)

    const { data: chapter } = useChapter(chapter_id)
    
    if (chapter) {
        return (
            <main className="relative !p-[0px] !min-h-auto">
                <ReaderHeader
                chapter={chapter}
                comic_transliterate_id={comic_transliterate_id}
                currentPage={currentPage}
                />

                {chapter.comic_type  === "HORIZONTAL"
                ? <ReaderHorizontalPage
                chapter_id={chapter_id}
                page={currentPage}
                page_limit={chapter.pages_count ? chapter.pages_count : 0}
                />
                : <ReaderVerticalPage
                chapter_id={chapter_id}
                page={currentPage}
                page_limit={chapter.pages_count ? chapter.pages_count : 0}
                setPage={setCurrentPage}
                />}

                {chapter.comic_type  === "HORIZONTAL"
                ? <ReaderHorizontalNavigation
                page={currentPage}
                setPage={setCurrentPage}
                page_limit={chapter.pages_count ? chapter.pages_count : 0}
                />
                : <ReaderVerticalNavigation />
                }
            </main>
        )
    }
    else {
        return null
    }
}

export { PageReader };

type TPageReaderProps = {
    comic_transliterate_id: string;
    chapter_id: string
}