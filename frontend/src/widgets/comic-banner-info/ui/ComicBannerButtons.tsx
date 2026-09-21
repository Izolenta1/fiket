import clsx from "clsx";
import { RateButton } from "@/features/rate-comic";
import { LikeButton } from "@/features/like-comic";
import { useFullComic } from "@/entities";

const ComicBannerButtons = ({ comic_transliterate_id, comic_id }: TComicBannerButtonsProps) => {
    const { data: comic } = useFullComic(comic_transliterate_id)
    
    if (comic) {
        return (
            <div
            className={clsx(
            "flex gap-[1.1vw]",
            "bp700px:gap-[1.14vw]",
            "bp1200px:gap-[8px]"
            )}
            >
                <RateButton comic_id={comic_id} />
                <LikeButton comic_transliterate_id={comic_transliterate_id} liked={comic.liked} likes_count={comic.likes_count} />
            </div>
        )
    }

    return null
}

export { ComicBannerButtons };

type TComicBannerButtonsProps = {
    comic_transliterate_id: string,
    comic_id: string
}