import {
    XmarkIcon,
    ModalToggle
} from "@/shared/ui";
import clsx from "clsx";
import { useSearchContext } from "@/features/search";
import {
    ReturnFilterButton,
    ShowResultsButton
} from "../../buttons";
import { Input } from "@/shared/ui";

const DateContent = ({ onClose, setActiveContent }: TDateContentProps) => {
    const { yearFrom, yearTo, setYearFrom, setYearTo } = useSearchContext()
    
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
                >Год выпуска</p>

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
                <Input
                placeholder='От'
                type='text'
                value={yearFrom}
                onChange={(e) => setYearFrom(e.target.value)}
                />

                <Input
                placeholder='До'
                type='text'
                value={yearTo}
                onChange={(e) => setYearTo(e.target.value)}
                />
            </div>

            <div
            className={clsx(
            "flex items-center gap-[1.6vw]",
            "bp700px:gap-[0.86vw]",
            "bp1200px:gap-[6px]"
            )}
            >
                <ReturnFilterButton
                setActiveContent={setActiveContent}
                />

                <ShowResultsButton
                activeCondition={yearFrom !== "" || yearTo !== ""}
                onClose={onClose}
                />
            </div>
        </div>
    )
}

export { DateContent };

type TDateContentProps = {
    onClose: () => void,
    setActiveContent: React.Dispatch<React.SetStateAction<string>>
}