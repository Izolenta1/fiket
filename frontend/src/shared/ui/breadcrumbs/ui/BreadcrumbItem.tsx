import { TLinkType } from "../model";
import Link from "next/link";
import clsx from "clsx";

const BreadcrumbsItem = ({ link }: TBreadcrumbsItemProps) => {
    return (
        link.link ?
        <>
            <span>/</span>
            <Link
            href={link.link}
            className={clsx(
            "increase_hover_anim"
            )}
            >
                <div
                className={clsx(
                "flex gap-[1.1vw]",
                "bp700px:gap-[0.57vw]",
                "bp1200px:gap-[4px]"
                )}
                >
                    {link.name}
                </div>
            </Link>
        </>
        :
        <span
        key={link.id}
        className={clsx(
        "flex gap-[1.1vw]",
        "text-texticon_base_default",
        "bp700px:gap-[0.57vw]",
        "bp1200px:gap-[4px]"
        )}
        >
            <span>/</span>
            {link.name}
        </span>
    )
}

export { BreadcrumbsItem };

type TBreadcrumbsItemProps = {
    link: TLinkType
}