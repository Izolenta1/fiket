'use client'

import clsx from "clsx";

const Ads = () => {
    if (process.env.NEXT_PUBLIC_ADS_STATE === "OFF") {
        return null
    }

    return (
        <div
        className={clsx(
        "bg-texticon_profile select-none",
        "flex justify-center items-center w-full h-[44.4vw]",
        "label_l1 text-texticon_base_default",
        "bp700px:h-[28.57vw]",
        "bp1200px:h-[200px]"
        )}
        >ADS</div>
    );
}

export { Ads };