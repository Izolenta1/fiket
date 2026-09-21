import {
    Modal,
    ModalToggle,
    XmarkIcon
} from "@/shared/ui";
import clsx from "clsx";
import { sortParams } from "../../model/fixtures";
import { useSearchContext } from "../../model/SearchProvider";
import { ShowResultsButton } from "../buttons";

const SortModal = ({ open, onClose }: TSortModalProps) => {
    const { sort, setSort } = useSearchContext()

    return (
        <Modal
        open={open}
        onClose={onClose}
        >
            <div
            className={clsx(
            "flex flex-col gap-[3.3vw]",
            "bp700px:gap-[1.71vw]",
            "bp1200px:gap-[12px]"
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
                    >Показать сначала</p>

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
                    {sortParams.map(sortData =>
                    <ModalToggle
                    key={sortData.id}
                    name={sortData.name}
                    condition={sortData.name === sort}
                    trueCallback={() => setSort(sortData.name)}
                    />)}
                </div>

                <ShowResultsButton
                activeCondition={true}
                onClose={onClose}
                />
            </div>
        </Modal>
    )
}

export { SortModal };

type TSortModalProps = {
    open: boolean,
    onClose: () => void,
}