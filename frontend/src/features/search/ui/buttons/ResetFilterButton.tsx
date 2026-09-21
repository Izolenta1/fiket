import { useSearchContext } from "../../model/SearchProvider";
import { Button } from "@/shared/ui";

const ResetFilterButton = () => {
    const { resetFilter } = useSearchContext()
    
    return (
        <Button
        text="Сбросить все"
        onClick={() => resetFilter()}
        variant="secondary"
        />
    )
}

export { ResetFilterButton };