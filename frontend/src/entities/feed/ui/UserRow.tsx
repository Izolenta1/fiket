import clsx from "clsx";
import { UserIcon } from "@/shared/ui";
import { DeletePostButton } from "@/features/delete-post";
import { useProfileContext } from "@/views";

const UserRow = ({ username, post_id, page_number }: TUserRowProps) => {
    const { profileCondition } = useProfileContext()
    
    return (
        <div
        className={clsx(
        "relative select-none",
        "flex items-center gap-[1.6vw]",
        "bp700px:gap-[0.86vw]",
        "bp1200px:gap-[6px]"
        )}
        >
            <div
            className={clsx(
            "w-[5.5vw] h-[5.5vw]",
            "flex justify-center items-center",
            "bg-texticon_profile rounded-[50%]",
            "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
            "bp1200px:w-[28px] bp1200px:h-[28px]"
            )}
            >
                <UserIcon
                svg_className={clsx(
                "w-[3.8vw] h-[3.8vw]",
                "bp700px:w-[2.29vw] bp700px:h-[2.29vw]",
                "bp1200px:w-[20px] bp1200px:h-[20px]"
                )}
                path_className={clsx(
                "fill-texticon_base_header opacity-[64%]"
                )}
                />
            </div>

            <span
            className={clsx(
            "caption_regular text-texticon_base_header"
            )}
            >{username}</span>

            {profileCondition === "ME AUTHOR" &&
            <DeletePostButton
            username={username}
            post_id={post_id}
            page_number={page_number}
            />}
        </div>
    )
}

export { UserRow };

type TUserRowProps = {
    username: string,
    post_id: string,
    page_number: number
}