import { useFullComic } from "@/entities"
import clsx from "clsx"

const ComicDescription = ({ comic_transliterate_id }: TComicDescriptionProps) => {
    const { data: comic } = useFullComic(comic_transliterate_id)
    
    if (comic) {
        return (
            <section
            className={clsx(
            "w-full flex flex-col gap-[3.3vw]",
            "bp700px:gap-[3.43vw]",
            "bp1200px:gap-[24px]"
            )}
            >
                <h2
                className={clsx(
                "label_l2 text-texticon_base_header select-none"
                )}
                >Описание</h2>

                <p
                className={clsx(
                "caption_regular text-texticon_base_default"
                )}
                >{comic.description ? comic.description : "Описание не задано"}</p>
            </section>
        )
    }

    return null
}

export { ComicDescription };

type TComicDescriptionProps = {
    comic_transliterate_id: string
}