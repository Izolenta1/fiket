import clsx from "clsx";
import { ComicBannerInfo } from "./ComicBannerInfo";
import { ComicBannerButtons } from "./ComicBannerButtons";

const ComicBannerBlock = ({ comic_transliterate_id }: TComicBannerBlockProps) => {
    const comic_id = comic_transliterate_id.substring(comic_transliterate_id.lastIndexOf("_") + 1)
    
    return (
        <div
        className={clsx(
        "flex flex-col gap-[1.1vw] items-end",
        "bp700px:gap-[1.14vw]",
        "bp1200px:gap-[8px]"
        )}
        >
            <ComicBannerInfo comic_transliterate_id={comic_transliterate_id} />
            <ComicBannerButtons comic_transliterate_id={comic_transliterate_id} comic_id={comic_id} />
        </div>
    )
}

export { ComicBannerBlock };

type TComicBannerBlockProps = {
    comic_transliterate_id: string
}