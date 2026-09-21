import { useUserQuery } from "@/entities";
import {
    UserIcon,
    PlugImage
} from "@/shared/ui";
import Link from "next/link";
import { useProfileContext } from "@/views";
import clsx from "clsx";

const ProfileBannerInfo = ({ username }: TProfileBannerInfoProps) => {
    const { profileCondition } = useProfileContext()
    const { data: userData } = useUserQuery(username)
    
    if (userData) {
        return (
            <div
            className={clsx(
            "flex flex-col gap-[1.1vw] items-center",
            "bp700px:gap-[0.57vw]",
            "bp1200px:gap-[4px]"
            )}
            >
                <div
                className={clsx(
                "select-none",
                "flex justify-center items-center",
                "rounded-[50%] overflow-hidden",
                "w-[27.7vw] h-[27.7vw]",
                "bp700px:w-[25.71vw] bp700px:h-[25.71vw]",
                "bp1200px:w-[180px] bp1200px:h-[180px]"
                )}
                >
                    {userData.ava_url == null
                    ? <UserIcon
                    svg_className={clsx(
                    "w-[17.7vw] h-[17.7vw]",
                    "bp700px:w-[17.14vw] bp700px:h-[17.14vw]",
                    "bp1200px:w-[120px] bp1200px:h-[120px]"
                    )}
                    path_className={clsx(
                    "fill-texticon_base_header"
                    )}
                    />
                    : <PlugImage
                    src={userData.ava_url}
                    alt={userData.username}
                    imageClassName={clsx(
                    "w-full aspect-square"
                    )}
                    />}
                </div>

                <h2
                className={clsx(
                "label_l2 text-texticon_base_header"
                )}
                >{userData.nickname}</h2>

                {profileCondition.includes("ME") &&
                <Link
                href={`/profile/${username}/edit`}
                className={clsx(
                "increase_hover_anim hover:cursor-pointer",
                "subheader_regular text-texticon_base_accent select-none"
                )}
                >Редактировать</Link>}
            </div>
        )
    }
    else {
        return null
    }
}

export { ProfileBannerInfo };

type TProfileBannerInfoProps = {
    username: string
}