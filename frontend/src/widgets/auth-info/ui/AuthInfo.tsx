'use client'

import clsx from "clsx";
import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";

const AuthInfo = ({ type, headerText, bodyText }: TAuthInfo) => {
    const router = useRouter()
    
    return (
        <div
        className={clsx(
        "w-full flex flex-col gap-[3.3vw] self-center",
        "px-[6.6vw] py-[3.3vw]",
        "bg-surface_secondary border-[0.27vw] border-border_default rounded-[3.3vw]",
        "bp700px:w-[65.71vw] bp700px:gap-[2.29vw] bp700px:rounded-[1.71vw] bp700px:border-[0.14vw] bp700px:px-[3.43vw] bp700px:py-[2.29vw]",
        "bp1200px:w-[540px] bp1200px:gap-[20px] bp1200px:rounded-[12px] bp1200px:border-[1px] bp1200px:px-[24px] bp1200px:py-[16px]"
        )}
        >
            <span
            className={clsx(
            "label_l2 text-texticon_base_approved",
            type === "positive" ? "text-texticon_base_approved" : "text-texticon_base_warning"
            )}
            >{headerText}</span>
            
            <p
            className={clsx(
            "caption_regular text-texticon_base_default"
            )}
            >{bodyText}</p>
            
            <Button
            text='Войти в аккаунт'
            type='submit'
            onClick={() => router.push("/auth")}
            variant={type === "negative" ? 'ghost' : 'primary'}
            classNames={{
            root: "mt-[2.2vw] bp700px:mt-0"
            }}
            disabled={type === "negative"}
            />
        </div>
    );
};

export { AuthInfo };

type TAuthInfo = {
    type: "positive" | "negative"
    headerText: string,
    bodyText: string
}