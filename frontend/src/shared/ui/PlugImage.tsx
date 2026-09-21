'use client'

import Image from "next/image";
import { getImagePlaceholder } from "@/shared/lib";
import { useState } from "react";
import { NoImageIcon } from "./icons";
import clsx from "clsx";

const PlugImage = ({ src, alt, imageClassName }: TPlugImageProps) => {
    const [imageState, setImageState] = useState("Loading")

    const renderState = () => {
        switch (imageState) {
            case "Error":
                return (
                    <div
                    className={clsx(
                    "w-full h-full flex justify-center items-center",
                    "bg-surface_secondary"
                    )}
                    >
                        <NoImageIcon
                        svg_className={clsx(
                        "w-[8.3vw] h-[8.3vw]",
                        "bp700px:w-[4.29vw] bp700px:h-[4.29vw]",
                        "bp1200px:w-[30px] bp1200px:h-[30px]"
                        )}
                        />
                    </div>
                )
        }
    }

    return (
        <div 
            className={imageClassName}
        >
            {renderState()}
            
            {imageState !== "Error" && 
            <Image 
            src={src} 
            alt={alt} 
            width="0" 
            height="0" 
            sizes="100vw" 
            className={imageClassName}
            placeholder="blur"
            blurDataURL={getImagePlaceholder()}
            onError={() => setImageState("Error")}
            />}
        </div>
    );
}

export { PlugImage };

type TPlugImageProps = {
    src: string;
    alt: string;
    imageClassName: string
};