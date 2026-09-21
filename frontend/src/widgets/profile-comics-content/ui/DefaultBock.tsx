import {
    useAuthorComics,
    ComicCard
} from "@/entities"
import {
    NoDataPlug,
    Accordion,
    LoadingBlock
} from "@/shared/ui"
import clsx from "clsx"

const DefaultBlock = ({ username, block_name, paid_type }: TDefaultBlockProps) => {
	const { data: list, ref: listLoadingRef, hasNextPage: isListNext, isLoading: isListLoading, enabled: isListEnabled } = useAuthorComics(username, paid_type)
    
    const renderList = () => {
        if (list) {
            if (list.pages[0].answer.length <= 0) {
                return <NoDataPlug text="Тут комиксов пока нет :/" />
            }
            
			return list.pages.map((group, i) => (
                group.answer.map((comic) => (
                    <ComicCard
                    key={comic.id}
                    comic={comic}
                    />
                ))
			))
		}
	}
    
    return (
        <section
        className={(
        "self-start w-full"
        )}
        >
            <Accordion
            title={block_name}
            >
                <div
                className={clsx(
                "flex flex-col gap-[3.3vw]",
                "bp700px:gap-[3.43vw]",
                "bp1200px:gap-[32px]"
                )}
                >
                    <div
                    className={clsx(
                    "grid grid-cols-3 gap-[3.3vw]",
                    "bp700px:gap-x-[4.57vw] bp700px:gap-y-[3.43vw]",
                    "bp1200px:gap-[32px] bp1200px:grid-cols-5"
                    )}
                    >
                        {renderList()}
                    </div>

                    <div
                    ref={listLoadingRef}
                    className={clsx(
                    (!isListEnabled || isListNext || isListLoading) ? "" : "hidden"
                    )}
                    >
                        <LoadingBlock />
                    </div>
                </div>
            </Accordion>

        </section>
    )
}

export { DefaultBlock };

type TDefaultBlockProps = {
    username: string,
    block_name: string,
    paid_type: string
}