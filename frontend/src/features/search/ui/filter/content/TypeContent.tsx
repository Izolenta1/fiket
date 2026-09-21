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
import { typeParams } from "../../../model/fixtures";

const TypeContent = ({ onClose, setActiveContent }: TTypeContentProps) => {
    const { type, setType } = useSearchContext()
    
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
                >Тип</p>

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
                {typeParams.map(typeData =>
                <ModalToggle
                key={typeData.id}
                name={typeData.name}
                condition={typeData.value === type}
                trueCallback={() => setType(typeData.value)}
                falseCallback={() => setType("")}
                />)}
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
                activeCondition={type !== ""}
                onClose={onClose}
                />
            </div>
        </div>
    )
}

export { TypeContent };

type TTypeContentProps = {
    onClose: () => void,
    setActiveContent: React.Dispatch<React.SetStateAction<string>>
}