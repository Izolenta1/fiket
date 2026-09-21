'use client'

import clsx from "clsx";
import { ProfileBannerInfo } from "./ProfileBannerInfo";
import { ContentSwitch } from "@/shared/ui";
import { useProfileContext } from "@/views";

const ProfileBannerBlock = ({ username }: TProfileBannerBlockProps) => {
    const { profileCondition, selectedContent, setSelectedContent } = useProfileContext()

    return (
        <section
        className={clsx(
        "flex flex-col gap-[5.5vw] items-center",
        "mt-[22.2vw]",
        "bp700px:gap-[4.57vw] bp700px:mt-[18.29vw]",
        "bp1200px:gap-[32px] bp1200px:mt-[180px]"
        )}
        >
            <ProfileBannerInfo username={username} />

            {profileCondition.includes("AUTHOR") &&
            <ContentSwitch
            buttons={[
            {label: "Лента", value: "Feed"},
            {label: "Комиксы", value: "Comics"},
            {label: "Аккаунт", value: "Account"}
            ]}
            selectedContent={selectedContent}
            setSelectedContent={setSelectedContent}
            classNames={{
            root: "bg-surface_container w-full bp1200px:w-[500px]"
            }}
            />}
        </section>
    )
}

export { ProfileBannerBlock };

type TProfileBannerBlockProps = {
    username: string
}