'use client'

import { useUser } from "@/global/providers";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Z_INDEX } from "@/shared/config";

const AgeRestriction = () => {
    const router = useRouter();
    const { user } = useUser()

    function redirectToAuth() {
        if (!Boolean(user)) {
            router.push("/auth");
        }
    }

	return (
        <div
        className={clsx(
        "flex justify-center absolute inset-0",
        "backdrop-blur-[6px] bg-surface_blure"
        )}
        style={{
            zIndex: Z_INDEX.ageResctriction
        }}
        >
            <span
            className={clsx(
            "h-fit w-[250px]",
            "button_regular text-texticon_base_subheader text-center",
            "border-[1px] border-texticon_base_accent rounded-[12px] bg-surface_body",
            "px-[16px] py-[8px] mt-[120px]"
            )}
            >
                Комикс доступен только для 
                <button
                onClick={redirectToAuth}
                className={clsx(
                "text-texticon_base_accent underline underline-offset-2"
                )}
                >авторизованных пользователей</button> 
                старше 18 лет</span>
        </div>
	);
}

export { AgeRestriction };