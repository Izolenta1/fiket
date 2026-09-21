import { useFullComic } from "@/entities";
import {
    formatNumber,
    formatAccessibility
} from "@/shared/lib";
import {
    FillEyeIcon,
    StarIcon,
    GlassBackground
} from "@/shared/ui";
import clsx from "clsx";

const ComicBannerInfo = ({ comic_transliterate_id }: TComicBannerInfoProps) => {
    const { data: comic } = useFullComic(comic_transliterate_id)
    
    if (comic) {
        return (
            <GlassBackground>
                <div
                className={clsx(
                "flex gap-[1.6vw] items-center",
                "widget_regular text-texticon_base_header select-none",
                "px-[3.3vw] py-[1.1vw]",
                "bp700px:px-[2.29vw] bp700px:py-[1.14vw] bp700px:gap-[0.86vw]",
                "bp1200px:px-[16px] bp1200px:py-[8px] bp1200px:gap-[6px]"
                )}
                >
                    <span>{formatAccessibility(comic.cost_type)}</span>
                    <span>/</span>

                    <span
                    className={clsx(
                    "flex items-center gap-[1.1vw]",
                    "bp700px:gap-[0.57vw]",
                    "bp1200px:gap-[4px]"
                    )}
                    >
                        <FillEyeIcon
                        svg_className={clsx(
                        "w-[4.4vw] h-[4.4vw]",
                        "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                        "bp1200px:w-[16px] bp1200px:h-[16px]"
                        )}
                        path_className={clsx(
                        "fill-texticon_base_header"
                        )}
                        /> 
                        {formatNumber(comic.views)}
                    </span>
                    <span>/</span>

                    <span
                    className={clsx(
                    "flex items-center gap-[1.1vw]",
                    "bp700px:gap-[0.57vw]",
                    "bp1200px:gap-[4px]"
                    )}
                    >
                        <StarIcon
                        svg_className={clsx(
                        "w-[4.4vw] h-[4.4vw]",
                        "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                        "bp1200px:w-[16px] bp1200px:h-[16px]"
                        )}
                        path_className={clsx(
                        "fill-texticon_base_header"
                        )}
                        />
                        {comic.rating != null ? comic.rating : "-"}
                    </span>
                    <span>/</span>

                    <span
                    className={clsx(
                    "text-texticon_base_accent"
                    )}
                    >{comic.age_rating}+</span>
                </div>
            </GlassBackground>
        )
    }

    return (
        null
    )
}

export { ComicBannerInfo };

type TComicBannerInfoProps = {
    comic_transliterate_id: string
}