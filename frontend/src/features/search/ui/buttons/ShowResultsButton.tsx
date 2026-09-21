import { Button } from "@/shared/ui";
import { useSearchContext } from "../../model/SearchProvider";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { interpretateSort } from "@/shared/lib";

const ShowResultsButton = ({ activeCondition, onClose }: TShowResultsButtonProps) => {
    const router = useRouter();
    const pathname = usePathname()
    const { sort, genres, type, yearFrom, yearTo, status, publisher, rating } = useSearchContext()

    function collectFilter() {
        return `/filter?limit=${20}
${genres.length > 0 ? genres.map(id => `&genres_id=${id}`).join("") : ""}
${type !== "" ? `&comic_type=${type}` : ""}
${yearFrom !== "" ? `&date_from=${yearFrom}` : ""}
${yearTo !== "" ? `&date_to=${yearTo}` : ""}
${status !== "" ? `&status=${status}` : ""}
${publisher !== "" ? `&publisher=${publisher}` : ""}
${rating !== "" ? `&rating=${rating}` : ""}
${sort !== "" ? interpretateSort(sort) : ""}
`
    }

    function handleRedirect() {
        if (pathname !== "/filter") {
            router.push(collectFilter())
        }
        else {
            router.replace(collectFilter())
            onClose()
        }
    };
    
    return (
        <Button
        text="Показать результаты"
        variant={activeCondition ? "primary" : "ghost"}
        onClick={handleRedirect}
        disabled={!activeCondition}
        />
    )
}

export { ShowResultsButton };

type TShowResultsButtonProps = {
    activeCondition: boolean,
    onClose: () => void,
}