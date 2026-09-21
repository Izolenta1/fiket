import Link from "next/link";
import { TAuthorShort } from "../model/types";
import { PlugImage } from "@/shared/ui";
import { UserIcon } from "@/shared/ui";
import clsx from "clsx";

const AuthorCard = ({ author }: TAuthorCardProps) => {
    return (
        <article
        className={clsx(
        "select-none decrease_hover_anim",
        )}
        >
            <Link
            href={`/profile/${author.username}`}
            className={clsx(
            "w-full flex justify-center items-center flex-col gap-[2.2vw]",
            "bp700px:gap-[1.14vw]",
            "bp1200px:gap-[8px]"
            )}
            >
                <div
                className={clsx(
                "w-full flex justify-center items-center overflow-hidden",
                "bg-surface_secondary border-[0.27vw] border-border_default rounded-full",
                "bp700px:border-[0.14vw]",
                "bp1200px:border-[1px]",
                )}
                >
                    {author.ava_url == null ? 
                    <div
                    className={clsx(
                    "w-full aspect-square flex justify-center items-center"
                    )}
                    >
                        <UserIcon
                        svg_className={clsx(
                        "w-[60%] h-auto"
                        )}
                        path_className={clsx(
                        "fill-texticon_base_default"
                        )}
                        /> 
                    </div> :
                    <PlugImage
                    src={author.ava_url}
                    alt={author.username}
                    imageClassName={clsx(
                    "w-full aspect-square"
                    )}
                    />}
                </div>

                <p
                className={clsx(
                "subheader_regular line-clamp-1 text-texticon_base_header"
                )}
                >{author.nickname}</p>
            </Link>
        </article>
    );
}

export { AuthorCard };

type TAuthorCardProps = {
    author: TAuthorShort;
};