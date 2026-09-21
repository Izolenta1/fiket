'use client'

import { TComicShort } from "@/entities/comic/model/types";
import clsx from "clsx";
import {
    PlugImage,
    FillEyeIcon
} from "@/shared/ui";
import Link from "next/link";
import {
    formatNumber,
    formatShortDate
} from "@/shared/lib";
import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { ChaptersModal } from "./ChaptersModal";
import { useModal } from "@/shared/ui";

const AuthorComicCard = ({ comic, username }: TComicCardProps) => {
    const router = useRouter()
    const { open, openModal, closeModal } = useModal();
    
    function goToEditComic() {
        router.push(`/profile/${username}/comic/edit/${comic.transliterate_name}`)
    }

    function goToNewChapter() {
        router.push(`/profile/${username}/comic/${comic.transliterate_name}/chapter/new`)
    }
    
    return (
        <article
        className={clsx(
        "flex gap-[2.2vw] grow",
        "p-[3.3vw]",
        "bg-surface_container rounded-[3.3vw] border-[0.27vw] border-border_default",
        "bp700px:gap-[1.43vw] bp700px:p-[1.71vw] bp700px:rounded-[1.71vw] bp700px:border-[0.14vw]",
        "bp1200px:gap-[12px] bp1200px:p-[20px] bp700px:rounded-[12px] bp700px:border-[1px]"
        )}
        >
            <Link
            href={`/comic/${comic.transliterate_name}`}
            className={clsx(
            "select-none decrease_hover_anim",
            )}
            >
                <PlugImage
                src={comic.poster_url}
                alt={comic.name}
                imageClassName={clsx(
                "w-[33.3vw] aspect-[720/1040]",
                "rounded-[1.6vw] border-[0.27vw] border-border_default",
                "bp700px:w-[17.14vw] bp700px:rounded-[0.86vw] bp700px:border-[0.14vw]",
                "bp1200px:w-[160px] bp1200px:rounded-[6px] bp1200px:border-[1px]",
                )}
                />
            </Link>

            <div
            className={clsx(
            "flex flex-col grow"
            )}
            >
                <Link
                href={`/comic/${comic.transliterate_name}`}
                className={clsx(
                "decrease_hover_anim w-fit"
                )}
                >
                    <div
                    className={clsx(
                    "label_l3 text-texticon_base_header text-start line-clamp-1 select-none"
                    )}
                    >{comic.name}</div>
                </Link>

                <span
                className={clsx(
                "flex items-center justify-items-start gap-[1.1vw]",
                "subheader_regular text-texticon_base_default select-none",
                "mt-[1.6vw]",
                "bp700px:gap-[0.57vw] bp700px:mt-[0.86vw]",
                "bp1200px:gap-[4px] bp1200px:mt-[6px]"
                )}
                >
                    {formatShortDate(comic.created_at)}

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
                </span>

                <div
                className={clsx(
                "mt-auto",
                "grid grid-cols-1 gap-[2.2vw]",
                "bp700px:gap-[1.14vw] bp700px:grid-cols-2",
                "bp1200px:gap-[8px] bp1200px:grid-cols-1",
                )}
                >
                    <Button
                    text="Добавить главу"
                    onClick={goToNewChapter}
                    variant="primaryAlt"
                    />

                    <Button
                    text="Редактировать главу"
                    onClick={openModal}
                    variant="primaryAlt"
                    />
                    <ChaptersModal
                    open={open}
                    onClose={closeModal}
                    username={username}
                    comic_transliterate_id={comic.transliterate_name}
                    />

                    <Button
                    text="Редактировать комикс"
                    onClick={goToEditComic}
                    variant="primaryAlt"
                    classNames={{
                    wrapper: "col-span-full"
                    }}
                    />
                </div>
            </div>
        </article>
    );
}

export { AuthorComicCard };

type TComicCardProps = {
    comic: TComicShort;
    username: string
};