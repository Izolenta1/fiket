import { useAuthorComics } from "@/entities"
import {
    NoDataPlug,
    Accordion,
    LoadingBlock
} from "@/shared/ui"
import clsx from "clsx"
import { AuthorComicCard } from "@/widgets"

const AuthorBlock = ({ username, block_name, paid_type }: TDefaultBlockProps) => {
	const { data: list, ref: listLoadingRef, hasNextPage: isListNext, isLoading: isListLoading, enabled: isListEnabled } = useAuthorComics(username, paid_type)
    
    const renderList = () => {
        if (list) {
            if (list.pages[0].answer.length <= 0) {
                return <NoDataPlug text="Тут комиксов пока нет :/" />
            }
            
			return list.pages.map((group, i) => (
                group.answer.map((comic) => (
                    <AuthorComicCard
                    key={comic.id}
                    comic={comic}
                    username={username}
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
                    "flex flex-col gap-[3.3vw]",
                    "bp700px:gap-[2.86vw]",
                    "bp1200px:gap-[20px] bp1200px:grid bp1200px:grid-cols-2"
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

export { AuthorBlock };

type TDefaultBlockProps = {
    username: string,
    block_name: string,
    paid_type: string
}