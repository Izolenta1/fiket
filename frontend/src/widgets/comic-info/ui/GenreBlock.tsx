import clsx from "clsx";

const GenreBlock = ({ slashCondition, isShowed, name }: TGenreBlockProps) => {
    return (
        <span
        className={clsx(
        "flex gap-[1.6vw]",
        "subheader_regular text-texticon_base_default",
        "bp700px:gap-[0.86vw]",
        "bp1200px:gap-[6px]",
        isShowed ? "" : "hidden"
        )}
        >
            <span>{name}</span>
            
            {slashCondition ? <span>/</span> : ""}
        </span>
    )
    
}

export { GenreBlock };

type TGenreBlockProps = {
    slashCondition: boolean;
    isShowed: boolean;
    name: string
}