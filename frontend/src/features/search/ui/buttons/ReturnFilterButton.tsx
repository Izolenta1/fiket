import { Button } from "@/shared/ui";

const ReturnFilterButton = ({ setActiveContent }: TReturnFilterButtonProps) => {
    return (
        <Button
        text="Назад"
        onClick={() => setActiveContent("Фильтр")}
        variant="secondary"
        />
    )
}

export { ReturnFilterButton };

type TReturnFilterButtonProps = {
    setActiveContent: React.Dispatch<React.SetStateAction<string>>
}