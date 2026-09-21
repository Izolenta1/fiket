'use client'

import { useState } from "react";
import { GenreBlock } from "./GenreBlock";
import { TGenre } from "@/entities/genre/model/types";
import clsx from "clsx";

const ComicGenres = ({ genres }: TComicGenresProps) => {
    const [showedFull, setShowedFull] = useState(false)

    return (
        <div
        className={clsx(
        "flex justify-center gap-x-[1.6vw] gap-y-[1.1vw] flex-wrap",
        "bp700px:gap-x-[0.86vw] bp700px:gap-y-[0.57vw]",
        "bp1200px:gap-x-[6px] bp1200px:gap-y-[4px]"
        )}
        >
            {genres.map((genre, index) =>
                <GenreBlock
                key={genre.id}
                slashCondition={index + 1 - genres.length !== 0}
                isShowed={index < 3 || showedFull}
                name={genre.name} />
            )}

            {genres.length > 3 && 
            <button
            onClick={() => setShowedFull(true)}
            className={clsx(
            "subheader_regular text-texticon_base_default",
            showedFull ? "hidden": ""
            )}
            >...</button>}
        </div>
    )
    
}

export { ComicGenres };

type TComicGenresProps = {
    genres: TGenre[]
}