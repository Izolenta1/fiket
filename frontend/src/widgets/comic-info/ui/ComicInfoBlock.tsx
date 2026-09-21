import { useFullComic } from "@/entities"
import clsx from "clsx"
import { ComicGenres } from "./ComicGenres"
import { ComicStatusNPublisher } from "./ComicStatusNPublisher"
import { ComicAuthor } from "./ComicAuthor"
import { ComicInfoButtons } from "./ComicInfoButtons"

const ComicInfoBlock = ({ comic_transliterate_id }: TComicInfoBlockProps) => {
    const { data: comic } = useFullComic(comic_transliterate_id)
    
    if (comic) {
        return (
            <div
            className={clsx(
            "mt-[27.7vw]",
            "flex flex-col gap-[3.3vw] items-center",
            "bp700px:mt-[21.43vw] bp700px:gap-[1.71vw]",
            "bp1200px:mt-[220px] bp700px:gap-[12px]"
            )}
            >
                <h1
                className={clsx(
                "label_l2 text-texticon_base_header text-center"
                )}
                >{comic.name}</h1>

                <ComicGenres
                genres={comic.genres}
                />

                <ComicStatusNPublisher
                status={comic.status}
                publisher={comic.publisher}
                />

                <ComicAuthor
                username={comic.author.username}
                ava_url={comic.author.ava_url}
                nickname={comic.author.nickname}
                />

                <ComicInfoButtons
                comic_transliterate_id={comic_transliterate_id}
                />
            </div>
        )
    }

    return null
}

export { ComicInfoBlock };

type TComicInfoBlockProps = {
    comic_transliterate_id: string
}