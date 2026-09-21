import { TComicShort } from "../model/types";
import { mergeObjectClassNames } from "@/shared/lib";
import Link from "next/link";
import {
    PlugImage,
    StarIcon,
    FillEyeIcon
} from "@/shared/ui";
import {
    formatNumber,
    interpretateStatus,
    roundNumber
} from "@/shared/lib";
import clsx from "clsx";

const SlimComicCard = ({ comic, classNames }: TSlimComicCardProps) => {
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
            "flex gap-[3.3vw]",
            "bp700px:gap-[1.71vw]",
            "bp1200px:gap-[12px]"
            )}
            >
                <div
                className={clsx(
                "w-[17.7vw] h-[17.7vw]",
                "flex justify-center items-center shrink-0",
                "border-[0.27vw] border-border_default rounded-[3.3vw] overflow-hidden",
                "bp700px:w-[9.14vw] bp700px:h-[9.14vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
                "bp1200px:w-[64px] bp1200px:h-[64px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
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

                <div
                className={clsx(
                "flex flex-col"
                )}
                >
                    <h3
                    className={clsx(
                    "label_l3 line-clamp-1 text-texticon_base_header"
                    )}
                    >{comic.name}</h3>

                    <p
                    className={clsx(
                    "flex gap-[1.1vw] items-center",
                    "mt-[1.6vw]",
                    "subheader_regular text-texticon_base_default",
                    "bp700px:gap-[0.57vw] bp700px:mt-[0.86vw]",
                    "bp1200px:gap-[4px] bp1200px:mt-[6px]"
                    )}
                    >
                        <StarIcon
                        svg_className={clsx(
                        "w-[3.3vw] h-[3.3vw]",
                        "bp700px:w-[1.71vw] bp700px:h-[1.71vw]",
                        "bp1200px:w-[12px] bp1200px:h-[12px]"
                        )}
                        path_className={clsx(
                        "fill-texticon_base_default"
                        )}
                        />

                        {comic.rating == null ? "-" : roundNumber(comic.rating)}

                        <span>/</span>

                        <FillEyeIcon
                        svg_className={clsx(
                        "w-[4.4vw] h-[4.4vw]",
                        "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                        "bp1200px:w-[16px] bp1200px:h-[16px]"
                        )}
                        path_className={clsx(
                        "fill-texticon_base_default"
                        )}
                        />

                        {formatNumber(comic.views)}
                    </p>

                    <p
                    className={clsx(
                    "subheader_regular text-texticon_base_accent",
                    "mt-auto"
                    )}
                    >{interpretateStatus(comic.status)}</p>
                </div>
            </Link>
        </article>
    );
}

export { SlimComicCard };

type TSlimComicCardClassNames = {
	root?: string;
};

type TSlimComicCardProps = {
	comic: TComicShort;
    classNames?: TSlimComicCardClassNames;
};

const defaultClassNames: Required<TSlimComicCardClassNames> = {
	root: "",
};