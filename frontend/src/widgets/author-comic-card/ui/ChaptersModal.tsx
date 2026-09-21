import {
    Modal,
    XmarkIcon,
    NoDataPlug,
    ScrollbarWrapper,
    LoadingBlock,
    Button
} from "@/shared/ui";
import clsx from "clsx";
import { useComicChapters } from "@/entities";
import { ChapterCell } from "./ChapterCell";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ChaptersModal = ({ open, onClose, username, comic_transliterate_id }: TChaptersModalProps) => {
    const comic_id = comic_transliterate_id.substring(comic_transliterate_id.lastIndexOf("_") + 1)
    
    const [selectedChapter, setSelectedChapter] = useState("")
    const { data: chapters, ref: chaptersLoadingRef, hasNextPage: isChaptersNext } = useComicChapters(comic_id, false)
    
    const router = useRouter()
    function goToEditChapter() {
        router.push(`/profile/${username}/comic/${comic_transliterate_id}/chapter/${selectedChapter}`)
    }

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
					<ChapterCell
                    key={chapter.id}
                    chapter={chapter}
                    value={selectedChapter}
                    setValue={setSelectedChapter}
                    />
				))
			))
		}
	}

    return (
        <Modal
        open={open}
        onClose={onClose}
        >
            <div
            className={clsx(
            "flex flex-col gap-[3.3vw]",
            "bp700px:gap-[2.29vw]",
            "bp1200px:gap-[20px]"
            )}
            >
                
                {/* Заголовок */}
                <div
                className={clsx(
                "flex items-center justify-between"
                )}
                >
                    <p
                    className={clsx(
                    "label_l2 text-texticon_base_header select-none"
                    )}
                    >Выберите главу</p>

                    <button
                    onClick={onClose}
                    className={clsx(
                    "cursor-pointer increase_hover_anim"
                    )}
                    >
                        <XmarkIcon
                        svg_className={clsx(
                        "w-[6.6vw] h-[6.6vw]",
                        "bp700px:w-[4.57vw] bp700px:h-[4.57vw]",
                        "bp1200px:w-[32px] bp1200px:h-[32px]"
                        )}
                        path_className={clsx(
                        "stroke-texticon_base_header"
                        )}
                        />
                    </button>
                </div>

                <ScrollbarWrapper
                classNames={{
                root: "max-h-[111.1vw] bp700px:max-h-[57.14vw] bp1200px:max-h-[400px]",
                wrapper: "gap-[2.7vw] bp700px:gap-[1.43vw] bp1200px:gap-[10px]"
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
                    isChaptersNext || (open && !chapters) ? "" : "hidden"
                    )}
                    >
                        <LoadingBlock />
                    </div>
                </ScrollbarWrapper>

                <div
                className={clsx(
                "flex items-center gap-[1.6vw]",
                "bp700px:gap-[0.86vw]",
                "bp1200px:gap-[6px]"
                )}
                >
                    <Button
                    text='Назад'
                    type='button'
                    variant='secondary'
                    onClick={onClose}
                    />

                    <Button
                    text='Выбрать'
                    type='button'
                    onClick={goToEditChapter}
                    variant={selectedChapter === "" ? "ghost" : "primary"}
                    disabled={selectedChapter === ""}
                    />
                </div>
            </div>
        </Modal>
    )
}

export { ChaptersModal };

type TChaptersModalProps = {
    open: boolean,
    onClose: () => void,
    username: string,
    comic_transliterate_id: string,
}