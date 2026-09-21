import { XmarkIcon } from "@/shared/ui";
import clsx from "clsx";
import {
    ContentButton,
    ShowResultsButton,
    ResetFilterButton
} from "../../buttons";
import { useSearchContext } from "@/features/search";

const MainContent = ({ onClose, setActiveContent }: TMainContentProps) => {
    const { genres, type, yearFrom, yearTo, status, rating, publisher } = useSearchContext()
    
    return (
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
                >Фильтр</p>

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

            {/* Враппер кнопок */}
            <div
            className={clsx(
            "flex flex-col gap-[2.7vw]",
            "bp700px:gap-[1.43vw]",
            "bp1200px:gap-[10px]"
            )}
            >
                <ContentButton
                onClick={() => setActiveContent("Жанры")}
                name="Жанры"
                condition={genres.length != 0}
                />

                <ContentButton
                onClick={() => setActiveContent("Тип")}
                name="Тип"
                condition={type !== ""}
                />

                <ContentButton
                onClick={() => setActiveContent("Дата")}
                name="Дата"
                condition={yearFrom !== "" || yearTo !== ""}
                />

                <ContentButton
                onClick={() => setActiveContent("Статус")}
                name="Статус"
                condition={status !== ""}
                />

                <ContentButton
                onClick={() => setActiveContent("Возрастной рейтинг")}
                name="Возрастной рейтинг"
                condition={rating !== ""}
                />

                <ContentButton
                onClick={() => setActiveContent("Издатели")}
                name="Издатели"
                condition={publisher !== ""}
                />
            </div>

            <div
            className={clsx(
            "flex items-center gap-[1.6vw]",
            "bp700px:gap-[0.86vw]",
            "bp1200px:gap-[6px]"
            )}
            >
                <ResetFilterButton />

                <ShowResultsButton
                activeCondition={genres.length > 0 || type !== "" || yearFrom !== "" || yearTo !== "" || status !== "" || publisher !== "" || rating !== ""}
                onClose={onClose}
                />
            </div>
        </div>
    )
}

export { MainContent };

type TMainContentProps = {
    onClose: () => void,
    setActiveContent: React.Dispatch<React.SetStateAction<string>>
}