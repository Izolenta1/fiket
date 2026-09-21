import Link from "next/link";
import { useFirstChapter } from "../model/queries";
import clsx from "clsx";

const FirstChapterButton = ({ comic_transliterate_id }: TFirstChapterButtonProps) => {
    const { data: firstChapter } = useFirstChapter(comic_transliterate_id.substring(comic_transliterate_id.lastIndexOf("_") + 1))
    
    if (firstChapter) {
        if (!firstChapter.answer.purchased || firstChapter.answer.chapters.length == 0) {
            return (
                null
            )
        }

        return (
            <Link
            href={`/comic/${comic_transliterate_id}/chapter/${firstChapter.answer.chapters[0].id}`}
            className={clsx(
            "increase_hover_anim select-none",
            "flex-1 !flex justify-center items-center grow",
            "px-[2.7vw] py-[2.2vw]",
            "button_regular text-texticon_base_header",
            "bg-surface_body rounded-[3.3vw]",
            "bp700px:max-w-[38.57vw] bp700px:px-[1.43vw] bp700px:py-[1.14vw] bp700px:rounded-[1.71vw]",
            "bp1200px:max-w-[270px] bp1200px:px-[10px] bp1200px:py-[12px] bp1200px:rounded-[12px]"
            )}
            >Читать сначала</Link>
        )
    }

    return (
        null
    )
    
}

export { FirstChapterButton };

type TFirstChapterButtonProps = {
    comic_transliterate_id: string
}