'use client'

import {
    HalfArrowIcon,
    LensIcon,
    XmarkIcon
} from "@/shared/ui";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import {
    SortButton,
    FilterButton,
    SearchProvider,
    FilterParamsInitializator
 } from "@/features/search";

const SearchHeader = ({ title, hideSearch, search, setSearch }: TSearchHeaderProps) => {
    const router = useRouter();
    
    return (
        <section
        className={clsx(
        "flex flex-col gap-[5.5vw]",
        "bp700px:gap-[4.57vw]",
        "bp1200px:gap-[32px]"
        )}
        >
            {/* Верхняя часть */}
            <div
            className={clsx(
            "flex items-center justify-between"
            )}
            >
                <button
                onClick={() => router.back()}
                className={clsx(
                "increase_hover_anim hover:cursor-pointer"
                )}
                >
                    <div
                    className={clsx(
                    "select-none",
                    "flex gap-[1.6vw] items-center",
                    "bp700px:gap-[0.86vw]",
                    "bp1200px:gap-[6px]"
                    )}
                    >
                        <HalfArrowIcon
                        svg_className={clsx(
                        "w-[6.6vw] h-[6.6vw]",
                        "bp700px:w-[4.57vw] bp700px:h-[4.57vw]",
                        "bp1200px:w-[32px] bp1200px:h-[32px]"
                        )}
                        path_className={clsx(
                        "stroke-texticon_base_header"
                        )}
                        />

                        <h1
                        className={clsx(
                        "label_l2 text-texticon_base_header"
                        )}
                        >{title}</h1>
                    </div>
                </button>

                <div
                className={clsx(
                "flex gap-[3.3vw]",
                "bp700px:gap-[1.71vw]",
                "bp1200px:gap-[12px]"
                )}
                >
                    <SearchProvider>
                        <FilterParamsInitializator />
                        <SortButton />
                        <FilterButton />
                    </SearchProvider>
                </div>
            </div>

            {/* Строка поиска */}
            {!hideSearch &&
            <div
            className={clsx(
            "flex"
            )}
            >
                <div
                className={clsx(
                "flex justify-center items-center",
                "py-[1.1vw] px-[3.3vw]",
                "bg-surface_container border-y-[0.27vw] border-l-[0.27vw] border-border_default rounded-l-[3.3vw]",
                "bp700px:py-[1.14vw] bp700px:px-[2.29vw] bp700px:border-y-[0.14vw] bp700px:border-l-[0.14vw] bp700px:rounded-l-[1.71vw]",
                "bp1200px:py-[8px] bp1200px:px-[16px] bp1200px:border-y-[1px] bp1200px:border-l-[1px] bp1200px:rounded-l-[12px]"
                )}
                >
                    <LensIcon
                    svg_className={clsx(
                    "w-[4.4vw] h-[4.4vw]",
                    "bp700px:w-[4.57vw] bp700px:h-[4.57vw]",
                    "bp1200px:w-[32px] bp1200px:h-[32px]"
                    )}
                    path_className={clsx(
                    "fill-texticon_base_default"
                    )}
                    />
                </div>
                
                <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Название тайтла или имя автора"
                className={clsx(
                "grow outline-0 py-[1.1vw]",
                "input_regular placeholder:text-texticon_base_default text-texticon_base_header caret-texticon_base_accent",
                "bg-surface_container border-y-[0.27vw] border-border_default",
                "bp700px:py-[0.57vw] bp700px:border-y-[0.14vw]",
                "bp1200px:py-[4px] bp1200px:border-y-[1px]"
                )}
                />
                
                <button
                onClick={() => setSearch("")}
                disabled={search === ""}
                className={clsx(
                "flex justify-center items-center",
                "py-[1.1vw] px-[3.3vw]",
                "bg-surface_container border-y-[0.27vw] border-r-[0.27vw] border-border_default rounded-r-[3.3vw]",
                "bp700px:py-[1.14vw] bp700px:px-[2.29vw] bp700px:border-y-[0.14vw] bp700px:border-r-[0.14vw] bp700px:rounded-r-[1.71vw]",
                "bp1200px:py-[8px] bp1200px:px-[16px] bp1200px:border-y-[1px] bp1200px:border-r-[1px] bp1200px:rounded-r-[12px]"
                )}
                >
                    <div
                    className={clsx(
                    "increase_hover_anim hover:cursor-pointer"
                    )}
                    >
                        <XmarkIcon
                        svg_className={clsx(
                        "transition-opacity duration-[400ms]",
                        "w-[6.6vw] h-[6.6vw]",
                        "bp700px:w-[4.57vw] bp700px:h-[4.57vw]",
                        "bp1200px:w-[32px] bp1200px:h-[32px]",
                        search === "" ? "opacity-0" : "opacity-100"
                        )}
                        path_className={clsx(
                        "stroke-texticon_base_header"
                        )}
                        />
                    </div>
                </button>
            </div>}
        </section>
    )
}

export { SearchHeader };

type TSearchHeaderProps = 
| {
    title: string,
    hideSearch: false
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
}
| {
    title: string,
    hideSearch: true
    search?: string,
    setSearch?: React.Dispatch<React.SetStateAction<string>>,
}