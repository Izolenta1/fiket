import {
    ComicCard,
    SlimComicCard
} from "@/entities";
import { TComicShort } from "@/entities/comic/model/types";

const SearchComicCard = ({ comic }: TSearchComicCardProps) => {
    return (
        <>
            <SlimComicCard
            comic={comic}
            classNames={{
            root: "block bp700px:hidden"
            }}
            />

            <ComicCard
            comic={comic}
            classNames={{
            root: "hidden bp700px:block"
            }}
            />
        </>
    )
}

export { SearchComicCard };

type TSearchComicCardProps = {
    comic: TComicShort;
}