import clsx from "clsx";

const ColumnWrapper = ({ children }: TColumnWrapperProps) => {
    return (
        <div
        className={clsx(
        "flex flex-col gap-[3.3vw]",
        "bp700px:gap-[3.43vw]",
        "bp1200px:gap-[24px]"
        )}
        >
            {children}
        </div>
    );
};

export { ColumnWrapper };

type TColumnWrapperProps = {
    children: React.ReactNode
}