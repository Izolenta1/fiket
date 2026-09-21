import { TChapterReader } from "@/entities/chapter/model/types"

export function generateReaderMetadata(comic_transliterate_id: string, chapter_id: string, chapter: TChapterReader) {
    return {
        title: `Fiket | Глава ${chapter.chapter_number + 1} - ${chapter.chapter_name}`,
        alternates: {
            canonical: `https://fiket.ru/comic/${comic_transliterate_id}/chapter/${chapter_id}`
        },
        robots: "noindex nofollow"
    }
}