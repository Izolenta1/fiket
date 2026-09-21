import { TComicShort } from "../model/types";
import { FillEyeIcon } from "@/shared/ui";
import { formatNumber } from "@/shared/lib";
import { interpretateStatus } from "@/shared/lib";
import { PlugImage } from "@/shared/ui";
import Link from "next/link";
import clsx from "clsx";
import { mergeObjectClassNames } from "@/shared/lib";

const ComicCard = ({ comic, classNames }: TComicCardProps) => {
    const merge = mergeObjectClassNames(defaultClassNames, classNames);
    
    return (
        <article
        className={clsx(
        merge("root"),
        "grow"
        )}
        >
            <Link
            href={`/comic/${comic.transliterate_name}`}
            className={clsx(
            "select-none decrease_hover_anim",
            "flex flex-col w-full"
            )}
            >
                <div
                className={clsx(
                "overflow-hidden w-full h-auto",
                "border-[0.27vw] border-border_default rounded-[1.6vw]",
                "bp700px:border-[0.14vw] bp700px:rounded-[0.86vw]",
                "bp1200px:border-[1px] bp1200px:rounded-[6px]"
                )}
                >
                    <PlugImage
                    src={comic.poster_url}
                    alt={comic.name}
                    imageClassName={clsx(
                    "w-full aspect-[720/1040]"
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

                <span
                className={clsx(
                "flex items-center justify-items-start gap-[1.1vw]",
                "subheader_regular text-texticon_base_default",
                "mt-[1.1vw]",
                "bp700px:gap-[0.57vw] bp700px:mt-[0.57vw]",
                "bp1200px:gap-[4px] bp1200px:mt-[4px]"
                )}
                >
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
                </span>

                <p
                className={clsx(
                "subheader_regular text-texticon_base_accent text-start",
                "mt-[1.6vw]",
                "bp700px:mt-[1.71vw]",
                "bp1200px:mt-[12px]"
                )}
                >{interpretateStatus(comic.status)}</p>
            </Link>
        </article>
    );
}

export { ComicCard };

type TComicCardClassNames = {
	root?: string;
};

type TComicCardProps = {
	comic: TComicShort;
    classNames?: TComicCardClassNames;
};

const defaultClassNames: Required<TComicCardClassNames> = {
	root: "",
};