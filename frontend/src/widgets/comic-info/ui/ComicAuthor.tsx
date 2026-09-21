import Link from "next/link";
import {
    UserIcon,
    PlugImage
} from "@/shared/ui";
import clsx from "clsx";

const ComicAuthor = ({ username, ava_url, nickname }: TComicAuthorProps) => {
    return (
        <Link
        href={`/profile/${username}`}
        className={clsx(
        "select-none increase_hover_anim",
        )}
        >
            <div
            className={clsx(
            "select-none",
            "flex items-center gap-[2.7vw]",
            "bp700px:mt-[0.57vw] bp700px:gap-[1.43vw]",
            "bp1200px:mt-[4px] bp1200px:gap-[10px]"
            )}
            >
                <div
                className={clsx(
                "flex justify-center items-center",
                "w-[8.8vw] h-[8.8vw]",
                "rounded-[3.3vw] overflow-hidden",
                "bp700px:w-[6.86vw] bp700px:h-[6.86vw] bp700px:rounded-[1.71vw]",
                "bp1200px:w-[48px] bp1200px:h-[48px] bp1200px:rounded-[12px]"
                )}
                >
                    {ava_url == null
                    ? <UserIcon
                    svg_className={clsx(
                    "w-[8.8vw] h-[8.8vw]",
                    "bp700px:w-[6.86vw] bp700px:h-[6.86vw]",
                    "bp1200px:w-[48px] bp1200px:h-[48px]"
                    )}
                    path_className={clsx(
                    "fill-texticon_base_default"
                    )}
                    />
                    : <PlugImage
                    src={ava_url}
                    alt={username}
                    imageClassName={clsx(
                    "w-full aspect-square"
                    )}
                    />}
                </div>
                
                <p
                className={clsx(
                "caption_regular text-texticon_base_header"
                )}
                >{nickname}</p>
            </div>
        </Link>
    )
    
}

export { ComicAuthor };

type TComicAuthorProps = {
    username: string,
    ava_url: string,
    nickname: string
}