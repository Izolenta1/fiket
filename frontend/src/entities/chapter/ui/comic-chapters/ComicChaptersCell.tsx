import { TChapter } from "../../model/types";
import Link from "next/link";
import {
    PlugImage,
    FillEyeIcon
} from "@/shared/ui";
import {
    formatShortDate,
    formatNumber
} from "@/shared/lib";
import clsx from "clsx";

const ComicChaptersCell = ({ chapter, comic_transliterate_id }: TComicChaptersCellProps) => {
    return (
        <article
        className={clsx(
        "select-none decrease_hover_anim",
        "w-fit"
        )}
        >
            <Link
            href={`/comic/${comic_transliterate_id}/chapter/${chapter.id}/reader`}
            className={clsx(
            "flex gap-[3.3vw]",
            "bp700px:gap-[1.71vw]",
            "bp1200px:gap-[12px]"
            )}
            >
                <div
                className={clsx(
                "w-[17.7vw] h-[17.7vw] flex items-center justify-center",
                "rounded-[3.3vw] overflow-hidden",
                "bp700px:w-[14.29vw] bp700px:h-[14.29vw] bp700px:rounded-[1.71vw]",
                "bp1200px:w-[100px] bp1200px:h-[100px] bp1200px:rounded-[12px]"
                )}
                >
                    <PlugImage
                    src={chapter.poster_url}
                    alt={chapter.name}
                    imageClassName="w-full aspect-[720/1040]"
                    />
                </div>

                <div
                className={clsx(
                "flex flex-col gap-[1.6vw]",
                "bp700px:gap-[0.86vw]",
                "bp1200px:gap-[6px]"
                )}
                >
                    <h3
                    className={clsx(
                    "label_l3 text-texticon_base_header"
                    )}
                    >{chapter.name}</h3>

                    <p
                    className={clsx(
                    "flex gap-[1.1vw] items-center",
                    "subheader_regular text-texticon_base_default",
                    "bp700px:gap-[0.57vw]",
                    "bp1200px:gap-[4px]"
                    )}
                    >
                        {formatShortDate(chapter.created_at)}

                        <span>/</span>

                        <FillEyeIcon
                        svg_className={clsx(
                        "w-[4.4vw] h-[4.4vw]",
                        "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
                        "bp1200px:w-[24px] bp1200px:h-[24px]"
                        )}
                        path_className={clsx(
                        "fill-texticon_base_default"
                        )}
                        />
                        
                        {formatNumber(chapter.views)}
                    </p>

                    <span
                    className={clsx(
                    "mt-auto",
                    "subheader_regular text-texticon_base_default"
                    )}
                    >Глава {chapter.number}</span>
                </div>
            </Link>
		</article>
    )
}

export { ComicChaptersCell };

type TComicChaptersCellProps = {
    chapter: TChapter;
    comic_transliterate_id: string
};