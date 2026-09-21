import { TChapter } from "@/entities/chapter/model/types";
import clsx from "clsx";
import {
    PlugImage,
    FillEyeIcon
} from "@/shared/ui";
import {
    formatShortDate,
    formatNumber
} from "@/shared/lib";

const ChapterCell = ({ chapter, value, setValue }: TChapterCellProps) => {
    return (
        <button
        onClick={() => setValue(chapter.id)}
        className={clsx(
        "w-fit decrease_hover_anim select-none hover:cursor-pointer"
        )}
        >
            <div
            className={clsx(
            "flex gap-[3.3vw]",
            "bp700px:gap-[1.71vw]",
            "bp1200px:gap-[12px]"
            )}
            >
                <div
                className={clsx(
                "transition-color duration-[400ms]",
                "flex justify-center items-center",
                "w-[17.7vw] h-[17.7vw]",
                "rounded-[3.3vw] overflow-hidden border-[0.27vw]",
                "bp700px:w-[11.43vw] bp700px:h-[11.43vw] bp700px:rounded-[1.71vw] bp700px:border-[0.14vw]",
                "bp1200px:w-[80px] bp1200px:h-[80px] bp1200px:rounded-[12px] bp1200px:border-[1px]",
                chapter.id === value ? "border-texticon_base_accent" : "border-transparent"
                )}
                >
                    <PlugImage
                    src={chapter.poster_url}
                    alt={chapter.name}
                    imageClassName={clsx(
                    "w-full aspect-[720/1040]"
                    )}
                    />
                </div>

                <div
                className={clsx(
                "flex flex-col"
                )}
                >
                    <h3
                    className={clsx(
                    "transition-color duration-[400ms]",
                    "label_l3 text-start",
                    chapter.id === value ? "text-texticon_base_accent" : "text-texticon_base_header"
                    )}>{chapter.name}</h3>

                    <p
                    className={clsx(
                    "subheader_regular text-texticon_base_default",
                    "mt-[1.6vw]",
                    "flex items-center gap-[1.1vw]",
                    "bp700px:mt-[0.86vw] bp700px:gap-[0.57vw]",
                    "bp1200px:mt-[6px] bp1200px:gap-[4px]"
                    )}
                    >
                        <span>{formatShortDate(chapter.created_at)}</span>

                        <span>/</span>

                        <FillEyeIcon
                        svg_className={clsx(
                        "w-[4.4vw] h-[4.4vw]",
                        "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                        "bp1200px:w-[16px] bp1200px:h-[16px]",
                        )}
                        path_className={clsx(
                        "fill-texticon_base_default"
                        )}
                        />
                        
                        <span>{formatNumber(chapter.views)}</span>
                    </p>
                </div>
            </div>
        </button>
    )
}

export { ChapterCell };

type TChapterCellProps = {
    chapter: TChapter,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}