import { FirstChapterButton } from "@/entities";
import { AddListButton } from "@/features/toggle-comic-list";
import clsx from "clsx";

const ComicInfoButtons = ({ comic_transliterate_id }: TComicInfoButtons) => {
    return (
        <div
        className={clsx(
        "flex justify-center gap-[1.6vw] w-full",
        "bp700px:mt-[1.71vw] bp700px:gap-[3.43vw]",
        "bp1200px:mt-[12px] bp1200px:gap-[24px]"
        )}
        >
            <FirstChapterButton
            comic_transliterate_id={comic_transliterate_id}
            />

            <AddListButton
            comic_id={comic_transliterate_id.substring(comic_transliterate_id.lastIndexOf("_") + 1)}
            />
        </div>
    )
    
}

export { ComicInfoButtons };

type TComicInfoButtons = {
    comic_transliterate_id: string
}