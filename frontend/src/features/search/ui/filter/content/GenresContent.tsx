import {
    XmarkIcon,
    ModalToggle,
    ScrollbarWrapper,
    LoadingBlock
} from "@/shared/ui";
import clsx from "clsx";
import { useSearchContext } from "@/features/search";
import {
    ReturnFilterButton,
    ShowResultsButton
} from "../../buttons";
import { useGenres } from "@/entities";

const GenresContent = ({ onClose, setActiveContent }: TGenresContentProps) => {
    const { genres, addGenre, removeGenre, clearGenres } = useSearchContext()
    
    const { data: genresList, isLoading: isGenresLoading } = useGenres()

    const renderGenres = () => {
        if (isGenresLoading) {
            return <LoadingBlock />
        }

        if (genresList && genresList.genres.length > 0) {
            return genresList.genres.map(genreData =>
            <ModalToggle
            key={genreData.id}
            name={genreData.name}
            condition={genres.includes(genreData.id)}
            trueCallback={() => addGenre(genreData.id)}
            falseCallback={() => removeGenre(genreData.id)}
            />)
        }
    }

    return (
        <div
        className={clsx(
        "flex flex-col gap-[3.3vw]",
        "bp700px:gap-[2.29vw]",
        "bp1200px:gap-[20px]"
        )}
        >
            {/* Заголовок */}
            <div
            className={clsx(
            "flex items-center justify-between"
            )}
            >
                <p
                className={clsx(
                "label_l2 text-texticon_base_header select-none"
                )}
                >Жанры</p>

                <button
                onClick={onClose}
                className={clsx(
                "cursor-pointer increase_hover_anim"
                )}
                >
                    <XmarkIcon
                    svg_className={clsx(
                    "w-[6.6vw] h-[6.6vw]",
                    "bp700px:w-[4.57vw] bp700px:h-[4.57vw]",
                    "bp1200px:w-[32px] bp1200px:h-[32px]"
                    )}
                    path_className={clsx(
                    "stroke-texticon_base_header"
                    )}
                    />
                </button>
            </div>

            {/* Враппер кнопок */}
            <div
            className={clsx(
            "flex flex-col gap-[2.7vw]",
            "bp700px:gap-[1.43vw]",
            "bp1200px:gap-[10px]"
            )}
            >
                <ModalToggle
                name="Все жанры"
                condition={genres.length === 0}
                trueCallback={clearGenres}
                />

                <ScrollbarWrapper
                classNames={{
                root: "max-h-[69.4vw] bp700px:max-h-[42.86vw] bp1200px:max-h-[350px]",
                wrapper: "gap-[2.7vw] bp700px:gap-[1.43vw] bp1200px:gap-[10px]"
                }}
                >
                    {renderGenres()}
                </ScrollbarWrapper>
            </div>

            <div
            className={clsx(
            "flex items-center gap-[1.6vw]",
            "bp700px:gap-[0.86vw]",
            "bp1200px:gap-[6px]"
            )}
            >
                <ReturnFilterButton
                setActiveContent={setActiveContent}
                />

                <ShowResultsButton
                activeCondition={genres.length > 0}
                onClose={onClose}
                />
            </div>
        </div>
    )
}

export { GenresContent };

type TGenresContentProps = {
    onClose: () => void,
    setActiveContent: React.Dispatch<React.SetStateAction<string>>
}