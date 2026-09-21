import Image from "next/image";
import clsx from "clsx";
import { Z_INDEX } from "@/shared/config";

const FullWidthBanner = ({ image_url, image_alt }: TFullWidthBannerProps) => {
    if (image_url) {
        return (
            <Image
            priority
            src={image_url}
            alt={image_alt ?? "Banner"}
            width="0"
            height="0"
            sizes="100vw"
            className={clsx(
            "absolute left-[50%] translate-x-[-50%] h-[55.5vw] w-auto",
            "object-cover mask-[url(/BannerMask.svg)] mask-no-repeat mask-[100%_auto] mask-bottom select-none",
            "-mt-[8.8vw]",
            "bp700px:h-[42.86vw] bp700px:-mt-[4.57vw]",
            "bp1200px:h-[400px] bp1200px:-mt-[52px]",
            "bp1920px:w-full bp1920px:h-auto"
            )}
            style={{
                zIndex: Z_INDEX.fullWidthBanner
            }}
            />
        )
    }
    
    return (
        null
    )
}

export { FullWidthBanner };

type TFullWidthBannerProps = {
    image_url: string | undefined,
    image_alt: string | undefined
}