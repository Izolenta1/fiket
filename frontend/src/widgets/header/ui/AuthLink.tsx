import { UserIcon } from "@/shared/ui";
import Link from "next/link";
import clsx from "clsx";
import { useUser } from "@/global/providers";

const AuthLink = () => {
    const { user } = useUser()

    return (
        <Link
        href={user ? `/profile/${user.username}` : "/auth"}
        className={clsx(
        "h-fit w-fit",
        "increase_hover_anim"
        )}
        >
            <UserIcon
            svg_className={clsx(
            "w-[6.6vw] h-[6.6vw]",
            "bp700px:w-[4.57vw] bp700px:h-[4.57vw]",
            "bp1200px:w-[32px] bp1200px:h-[32px]"
            )}
            path_className={clsx(
            user ? "fill-texticon_base_accent" : "fill-texticon_base_default"
            )} 
            />
        </Link>
    )
}

export { AuthLink };