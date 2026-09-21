'use client'

import clsx from "clsx";
import { ProfileOptions } from "@/features/profile";
import { useFullComic } from "@/entities";

const NewChapterHeader = ({ comic_transliterate_id }: TNewChapterHeaderProps) => {
    const { data: comic } = useFullComic(comic_transliterate_id)

    if (comic) {
        return (
            <div
            className={clsx(
            "flex flex-col gap-[3.3vw]",
            "bp700px:gap-[3.43vw]",
            "bp1200px:gap-[24px] bp1200px:grid bp1200px:grid-cols-2"
            )}
            >
                <h1
                className={clsx(
                "label_l1 text-texticon_base_header select-none"
                )}
                >Добавить главу</h1>

                <ProfileOptions
                title={comic.name}
                />
            </div>
        )
    }
    else {
        return null
    }
}

export { NewChapterHeader };

type TNewChapterHeaderProps = {
    comic_transliterate_id: string
}