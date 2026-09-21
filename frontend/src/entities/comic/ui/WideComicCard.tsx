import { TComicShort } from "../model/types";
import Link from "next/link";
import clsx from "clsx";
import { PlugImage } from "@/shared/ui";
import { FillEyeIcon } from "@/shared/ui";
import { StarIcon } from "@/shared/ui";
import { interpretateStatus } from "@/shared/lib";
import { formatNumber } from "@/shared/lib";
import { roundNumber } from "@/shared/lib";

const WideComicCard = ({ comic }: TWideComicCardProps) => {
    return (
        <article>
            <Link
            href={`/comic/${comic.transliterate_name}`}
            className={clsx(
            "select-none decrease_hover_anim",
            "flex flex-col w-[58.3vw]",
            "bp700px:w-[56vw]",
            "bp1200px:w-[392px]"
            )}
            >
                <div
                className={clsx(
                "overflow-hidden w-[58.3vw] h-[33.3vw]",
                "border-[0.27vw] border-border_default rounded-[1.6vw]",
                "bp700px:border-[0.14vw] bp700px:rounded-[0.86vw] bp700px:w-[56vw] bp700px:h-[31.43vw]",
                "bp1200px:border-[1px] bp1200px:rounded-[6px] bp1200px:w-[392px] bp1200px:h-[220px]"
                )}
                >
                    <PlugImage
                    src={comic.banner_url}
                    alt={comic.name}
                    imageClassName={clsx(
                    "w-full h-full object-cover object-center aspect-[1920/400]"
                    )}
                    />
                </div>

                <h3
                className={clsx(
                "label_l3 text-texticon_base_header text-start line-clamp-1",
                "mt-[1.6vw]",
                "bp700px:mt-[2.29vw]",
                "bp1200px:mt-[16px]"
                )}
                >{comic.name}</h3>

                <div
                className={clsx(
                "flex items-center gap-[1.1vw]",
                "subheader_regular text-texticon_base_default",
                "mt-[1.6vw]",
                "bp700px:gap-[0.57vw] bp700px:mt-[0.86vw]",
                "bp1200px:gap-[4px] bp1200px:mt-[6px]"
                )}
                >
                    <p
                    className={clsx(
                    "text-texticon_base_accent text-start"
                    )}
                    >{interpretateStatus(comic.status)}</p>

                    <span>/</span>

                    <FillEyeIcon
                    path_className={clsx(
                    "fill-texticon_base_default"
                    )}
                    svg_className={clsx(
                    "w-[4.4vw] h-[4.4vw]",
                    "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
                    "bp1200px:w-[24px] bp1200px:h-[24px]"
                    )}
                    />
                    {formatNumber(comic.views)}

                    <span>/</span>

                    <StarIcon
                    path_className={clsx(
                    "fill-texticon_base_default"
                    )}
                    svg_className={clsx(
                    "w-[4.4vw] h-[4.4vw]",
                    "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
                    "bp1200px:w-[24px] bp1200px:h-[24px]"
                    )}
                    />
                    {comic.rating == null ? "-" : roundNumber(comic.rating)}
                </div>
            </Link>
        </article>
    );
}

export { WideComicCard };

type TWideComicCardProps = {
    comic: TComicShort;
};