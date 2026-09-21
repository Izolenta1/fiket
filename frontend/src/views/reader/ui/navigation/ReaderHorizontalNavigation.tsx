import { ArrowIcon } from "@/shared/ui";
import { Z_INDEX } from "@/shared/config";
import clsx from "clsx";

const ReaderHorizontalNavigation = ({ page, setPage, page_limit }: TReaderHorizontalNavigationProps) => {
    function addPage() {
        if (page + 1 < page_limit) {
            setPage(prev => prev + 1)
        }
    }

    function subtructPage() {
        if (page - 1 >= 0) {
            setPage(prev => prev - 1)
        }
    }
    
    return (
        <div
        className={clsx(
        "absolute inset-0",
        "flex items-end justify-between"
        )}
        style={{
        zIndex: Z_INDEX.readerPageNavigation
        }}
        >
            {/* Кнопка перелистывания страницы назад */}
            <button
            onClick={subtructPage}
            className={clsx(
            "hover:cursor-pointer",
            "flex justify-center items-end self-stretch",
            "p-[3.3vw] mt-[13.8vw]",
            "bp700px:pr-[17.14vw] bp700px:p-[1.71vw] bp700px:mt-[7.14vw]",
            "bp1200px:pr-[360px] bp1200px:p-[12px] bp1200px:mt-[50px]"
            )}
            >
                <div
                className={clsx(
                "increase_hover_anim"
                )}
                >
                    <div
                    className={clsx(
                    "flex justify-center items-center",
                    "pointer-events-none backdrop-blur-[6px]", 
                    "w-fit h-fit p-[2.2vw]",
                    "bg-surface_container rounded-[3.3vw]",
                    "bp700px:p-[1.14vw] bp700px:rounded-[1.71vw]",
                    "bp1200px:p-[8px] bp1200px:rounded-[12px]"
                    )}
                    >
                        <ArrowIcon
                        svg_className={clsx(
                        "rotate-180 pointer-events-none",
                        "w-[8.8vw] h-[8.8vw]",
                        "bp700px:w-[4.57vw] bp700px:h-[4.57vw]",
                        "bp1200px:w-[32px] bp1200px:h-[32px]"
                        )}
                        path_className={clsx(
                        "stroke-texticon_base_subheader"
                        )}
                        />
                    </div>
                </div>
            </button>

            {/* Кнопка перелистывания страницы вперед */}
            <button
            onClick={addPage}
            className={clsx(
            "hover:cursor-pointer",
            "flex justify-center items-end self-stretch",
            "p-[3.3vw] mt-[13.8vw]",
            "bp700px:pl-[17.14vw] bp700px:p-[1.71vw] bp700px:mt-[7.14vw]",
            "bp1200px:pl-[360px] bp1200px:p-[12px] bp1200px:mt-[50px]"
            )}
            >
                <div
                className={clsx(
                "increase_hover_anim"
                )}
                >
                    <div
                    className={clsx(
                    "flex justify-center items-center",
                    "pointer-events-none backdrop-blur-[6px]", 
                    "w-fit h-fit p-[2.2vw]",
                    "bg-surface_container rounded-[3.3vw]",
                    "bp700px:p-[1.14vw] bp700px:rounded-[1.71vw]",
                    "bp1200px:p-[8px] bp1200px:rounded-[12px]"
                    )}
                    >
                        <ArrowIcon
                        svg_className={clsx(
                        "pointer-events-none",
                        "w-[8.8vw] h-[8.8vw]",
                        "bp700px:w-[4.57vw] bp700px:h-[4.57vw]",
                        "bp1200px:w-[32px] bp1200px:h-[32px]"
                        )}
                        path_className={clsx(
                        "stroke-texticon_base_subheader"
                        )}
                        />
                    </div>
                </div>
            </button>
        </div>
    )
}

export { ReaderHorizontalNavigation };

type TReaderHorizontalNavigationProps = {
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    page_limit: number
}