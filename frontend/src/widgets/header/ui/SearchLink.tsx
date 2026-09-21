import { LensIcon } from "@/shared/ui";
import Link from "next/link";
import clsx from "clsx";

const SearchLink = () => {
    return (
        <Link
        href="/search"
        className={clsx(
        "h-fit w-fit",
        "increase_hover_anim"
        )}
        >
            <LensIcon
            svg_className={clsx(
            "w-[6.6vw] h-[6.6vw]",
            "bp700px:w-[4.57vw] bp700px:h-[4.57vw]",
            "bp1200px:w-[32px] bp1200px:h-[32px]"
            )}
            path_className={clsx(
            "fill-texticon_base_default"
            )}
            />
        </Link>
    )
}

export { SearchLink };