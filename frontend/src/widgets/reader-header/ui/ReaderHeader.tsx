import Link from "next/link";
import {
    MicroHalfArrowIcon,
    HalfArrowIcon
} from "@/shared/ui";
import { TChapterReader } from "@/entities/chapter/model/types";
import clsx from "clsx";
import { Z_INDEX } from "@/shared/config";
import { HorizontalCounter } from "./HorizontalCounter";
import { VerticalCounter } from "./VerticalCounter";

const ReaderHeader = ({ chapter, comic_transliterate_id, currentPage }: TReaderHeaderProps) => {
    return (
        <div
        className={clsx(
        "fixed top-0 left-0",
        "flex justify-center items-center",
        "w-full h-[13.8vw] px-[3.3vw]",
        "bg-surface_container backdrop-blur-[50px] rounded-b-[3.3vw]",
        "bp700px:h-[7.14vw] bp700px:px-[1.71vw] bp700px:rounded-b-[1.71vw]",
        "bp1200px:h-[50px] bp700px:px-[12px] bp700px:rounded-b-[12px]"
        )}
        style={{
            zIndex: Z_INDEX.chrome
        }}
        >
            <div
            className={clsx(
            "select-none",
            "grow grid grid-cols-[1fr_auto_1fr] items-center",
            "max-w-[1040px]"
            )}
            >
                <Link
                href={`/comic/${comic_transliterate_id}`}
                className={clsx(
                "w-fit increase_hover_anim"
                )}
                >
                    <div
                    className={clsx(
                    "h-full flex gap-[1.1vw] items-center self-start",
                    "bp700px:gap-[0.57vw]",
                    "bp1200px:gap-[4px]"
                    )}
                    >
                        <HalfArrowIcon
                        svg_className={clsx(
                        "w-[5.5vw] h-[5.5vw]",
                        "bp700px:w-[2.86vw] bp700px:h-[2.86vw]",
                        "bp1200px:w-[20px] bp700px:h-[20px]"
                        )}
                        path_className={clsx(
                        "stroke-texticon_base_subheader"
                        )}
                        />

                        <span
                        className={clsx(
                        "label_l3 text-texticon_base_subheader"
                        )}
                        >Fiket</span>
                    </div>
                </Link>

                <div
                className={clsx(
                "h-full flex gap-[3.3vw] items-center",
                "bp700px:gap-[1.71vw]",
                "bp1200px:gap-[12px]"
                )}
                >
                    {chapter.previous_id && 
                    <Link
                    href={`/comic/${comic_transliterate_id}/chapter/${chapter.previous_id}/reader`}
                    className={clsx(
                    "increase_hover_anim"
                    )}
                    >
                        <MicroHalfArrowIcon
                        svg_className={clsx(
                        "w-[4.4vw] h-[4.4vw]",
                        "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                        "bp1200px:w-[16px] bp1200px:h-[16px]"
                        )}
                        path_className={clsx(
                        "stroke-texticon_base_subheader"
                        )}
                        />
                    </Link>}

                    <span
                    className={clsx(
                    "caption_regular text-texticon_base_subheader"
                    )}
                    >#{chapter.chapter_number != undefined ? chapter.chapter_number : "null"}</span>

                    {chapter.next_id && 
                    <Link
                    href={`/comic/${comic_transliterate_id}/chapter/${chapter.next_id}/reader`}
                    className={clsx(
                    "increase_hover_anim"
                    )}
                    >
                        <MicroHalfArrowIcon
                        svg_className={clsx(
                        "w-[4.4vw] h-[4.4vw]",
                        "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                        "bp1200px:w-[16px] bp1200px:h-[16px]",
                        "rotate-180"
                        )}
                        path_className={clsx(
                        "stroke-texticon_base_subheader"
                        )}
                        />
                    </Link>}
                </div>

                {chapter.comic_type === "HORIZONTAL"
                ? <HorizontalCounter
                currentPage={currentPage}
                pagesCount={chapter.pages_count}
                />
                : <VerticalCounter
                currentPage={currentPage}
                pagesCount={chapter.pages_count}
                />}
            </div>
        </div>
    )
}

export { ReaderHeader };

type TReaderHeaderProps = {
    chapter: TChapterReader,
    comic_transliterate_id: string,
    currentPage: number
}