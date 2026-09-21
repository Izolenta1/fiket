import { useComicChapters } from "../../model/queries";
import {
    ScrollbarWrapper,
    LoadingBlock,
    NoDataPlug
} from "@/shared/ui";
import { ComicChaptersCell } from "./ComicChaptersCell";
import clsx from "clsx";

const ComicChapters = ({ comic_transliterate_id, purchasePlaceholder }: TComicChaptersProps) => {
    const comic_id = comic_transliterate_id.substring(comic_transliterate_id.lastIndexOf("_") + 1)
    
    const { data: chapters, ref: chaptersLoadingRef, hasNextPage: isChaptersNext } = useComicChapters(comic_id, true)
    
	const renderChapters = () => {
		if (chapters) {
			if (chapters.pages[0].answer.chapters.length <= 0) {
				return (
                    <NoDataPlug
                    text="У этого комикса пока еще нет глав :/"
                    />
                )
			}

			return chapters.pages.map((group) => (
				group.answer.chapters.map((chapter) => (
					<ComicChaptersCell
                    key={chapter.id}
                    comic_transliterate_id={comic_transliterate_id}
                    chapter={chapter}
                    />
				))
			))
		}
	}

    if (chapters) {
        return (
            <section
            className={clsx(
            "w-full flex flex-col gap-[3.3vw]",
            "bp700px:gap-[1.71vw]",
            "bp1200px:gap-[12px]"
            )}
            >
                <h2
                className={clsx(
                "label_l2 text-texticon_base_header select-none"
                )}
                >Главы</h2>

                {/* Враппер для глав */}
                <div
                className={clsx(
                "flex flex-col gap-[3.3vw]",
                "bg-surface_container rounded-[3.3vw]",
                "bp700px:gap-[1.71vw] bp700px:rounded-[1.71vw]",
                "bp1200px:gap-[12px] bp1200px:rounded-[12px]"
                )}
                >
                    <div
                    className={clsx(
                    "h-[8.3vw] flex items-center",
                    "caption_regular text-texticon_base_default select-none",
                    "bg-surface_container rounded-b-[1.1vw] rounded-t-[3.3vw]",
                    "px-[3.3vw] py-[1.1vw]",
                    "bp700px:px-[1.71vw] bp700px:py-[1.14vw] bp700px:rounded-b-[0.57vw] bp700px:rounded-t-[1.71vw] bp700px:h-[7.14vw]",
                    "bp1200px:px-[12px] bp1200px:py-[8px] bp1200px:rounded-b-[4px] bp1200px:rounded-t-[12px] bp1200px:h-[50px]"
                    )}
                    >Всего глав - {chapters.pages[0].pagination.total}</div>

                    <div
                    className={clsx(
                    "relative px-[3.3vw]",
                    "bp700px:px-[1.71vw]",
                    "bp1200px:px-[12px]"
                    )}
                    >
                        <ScrollbarWrapper
                        classNames={{
                        root: "max-h-[106.6vw] bp700px:max-h-[87.14vw] bp1200px:max-h-[610px] min-h-[106.6vw] bp700px:min-h-[87.14vw] bp1200px:min-h-[610px]",
                        }}
                        >
                            <div
                            className={clsx(
                            "flex flex-col gap-[4.4vw]",
                            "bp700px:gap-[2.29vw]",
                            "bp1200px:gap-[16px]"
                            )}
                            >{renderChapters()}</div>

                            <div
                            ref={chaptersLoadingRef}
                            className={clsx(
                            !isChaptersNext ? "hidden" : ""
                            )}
                            >
                                <LoadingBlock/>
                            </div>
                        </ScrollbarWrapper>

                        {purchasePlaceholder}
                    </div>

                    <div
                    className={clsx(
                    "h-[8.3vw]",
                    "bg-surface_container rounded-t-[1.1vw] rounded-b-[3.3vw]",
                    "bp700px:h-[7.14vw] bp700px:rounded-t-[0.57vw] bp700px:rounded-b-[1.71vw]",
                    "bp1200px:h-[50px] bp1200px:rounded-t-[4px] bp1200px:rounded-b-[12px]"
                    )}
                    />
                </div>
            </section>
        )
    }

    return (
        null
    )
    
}

export { ComicChapters };

type TComicChaptersProps = {
    comic_transliterate_id: string,
    purchasePlaceholder: React.ReactNode
}