import { LogoFullIcon } from "@/shared/ui";
import { Socials } from "./Socials";
import clsx from "clsx";

const Title = () => {
    return (
        <div
        className={clsx(
        "flex items-center justify-between",
        )}
        >
            <LogoFullIcon
            svg_className={clsx(
            "h-[6.6vw] w-auto",
            "bp700px:h-[5.71vw]",
            "bp1200px:h-[40px]"
            )} 
            />

            <Socials
            classNames={{
            root: "hidden bp1200px:flex"
            }}
            />
        </div>
    )
}

export { Title };