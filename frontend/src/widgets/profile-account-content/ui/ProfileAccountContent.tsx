'use client'

import { AccountButton } from "./AccountButton";
import { useProfileContext } from "@/views";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { LogoutButton } from "./LogoutButton";
import { AboutBlock } from "./AboutBlock";
import { SocialBlock } from "./SocialBlock";
import { BecomeAuthorBlock } from "./BecomeAuthorBlock";

const ProfileAccountContent = ({ username }: TProfileAccountContentProps) => {
    const { profileCondition } = useProfileContext()
    const router = useRouter()
    
    function goToSavedComics() {
        router.push(`/profile/${username}/saved-comics`)
    }

    function goToPurchasedComics() {
        router.push(`/profile/${username}/purchased`)
    }

    function goToBecomeAuthor() {
        router.push(`/profile/${username}/becomeauthor`)
    }

    function goToSales() {
        router.push(`/profile/${username}/sales`)
    }

    return (
        <div
        className={clsx(
        "flex flex-col gap-[3.3vw]",
        "-mt-[2.2vw]",
        "bp700px:gap-[3.43vw] bp700px:grid bp700px:grid-cols-2 bp700px:mt-[0px]",
        "bp1200px:gap-[24px]"
        )}
        >
            {profileCondition === "ME" && 
            <BecomeAuthorBlock />}

            {profileCondition.includes("AUTHOR") && 
            <AboutBlock
            username={username}
            />}

            {profileCondition.includes("ME") && 
            <AccountButton
            title="Сохраненные комиксы"
            subText="Перейти"
            onClick={goToSavedComics}
            />}

            {profileCondition.includes("ME") && 
            <AccountButton
            title="Купленные комиксы"
            subText="Перейти"
            onClick={goToPurchasedComics}
            disabledText="В разработке"
            />}

            {profileCondition === "ME" && 
            <AccountButton
            title="Стать автором"
            subText="Перейти"
            onClick={goToBecomeAuthor}
            additionalImage="/ProfileStatic/Author.png"
            disabledText="В разработке"
            />}

            {profileCondition === "ME AUTHOR" && 
            <AccountButton
            title="Мои продажи"
            subText="Перейти"
            onClick={goToSales}
            additionalImage="/ProfileStatic/Sales.png"
            disabledText="В разработке"
            />}

            {profileCondition.includes("AUTHOR") && 
            <SocialBlock
            username={username}
            />}

            {profileCondition.includes("ME") && 
            <LogoutButton />}
        </div>
    )
}

export { ProfileAccountContent };

type TProfileAccountContentProps = {
    username: string
}