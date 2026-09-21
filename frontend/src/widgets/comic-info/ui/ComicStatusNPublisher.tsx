import clsx from "clsx";
import { interpretateStatus } from "@/shared/lib";

const ComicStatusNPublisher = ({ status, publisher }: TComicStatusNPublisherProps) => {
    return (
        <div
        className={clsx(
        "flex gap-[5.5vw] justify-center items-center",
        "subheader_regular text-texticon_base_default text-center select-none",
        "bp700px:gap-[2.86vw]",
        "bp1200px:gap-[20px]"
        )}
        >
            <p
            className={clsx(
            "text-nowrap flex-1"
            )}
            >
                Статус -

                <span
                className={clsx(
                "text-texticon_base_accent"
                )}
                > {interpretateStatus(status)}</span>
            </p>
            
            {publisher &&
            <p
            className={clsx(
            "flex-1"
            )}
            >
                Издательство -
                
                <span
                className={clsx(
                "text-texticon_base_accent"
                )}
                > {publisher}</span>
            </p>}
        </div>
    )
    
}

export { ComicStatusNPublisher };

type TComicStatusNPublisherProps = {
    status: string,
    publisher: string | null
}