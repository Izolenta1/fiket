import Link from "next/link";
import clsx from "clsx";
import { TLinkType } from "../model";
import { BreadcrumbsItem } from "./BreadcrumbItem";

const Breadcrumbs = ({ linkArray }: TBreadcrumbsProps) => {
    
    return (
        <section
        className={clsx(
        "flex gap-[1.1vw]",
        "breadcrumbs_regular text-texticon_base_header select-none",
        "bp700px:gap-[0.57vw]",
        "bp1200px:gap-[4px]"
        )}
        >
            <Link
            href={`/`}
            className={clsx(
            "increase_hover_anim"
            )}
            >Fiket</Link>

            {linkArray.map(link =>
            <BreadcrumbsItem
            key={link.link}
            link={link}
            />)}
        </section>
    )
}

export { Breadcrumbs };

type TBreadcrumbsProps = {
    linkArray: TLinkType[]
}