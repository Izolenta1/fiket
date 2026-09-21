import { useUserQuery } from "@/entities";
import clsx from "clsx";
import { socialsConfig } from "../model/fixtures";

const SocialBlock = ({ username }: TSocialBlockProps) => {
    const { data: userData } = useUserQuery(username)

    if (userData) {
        const social = userData.author?.media_social;
        const hasAnySocial = socialsConfig.some(
            ({ key }) => social?.[key]
        );

        return (
            <div
            className={clsx(
            "select-none",
            "flex flex-col gap-[3.3vw] col-span-full",
            "p-[3.3vw]",
            "bg-surface_container border-[0.27vw] border-border_default rounded-[3.3vw]",
            "bp700px:gap-[1.71vw] bp700px:p-[2.29vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
            "bp1200px:gap-[12px] bp1200px:p-[16px] bp1200px:px-[24px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
            )}
            >
                <h2
                className={clsx(
                "label_l3 text-texticon_base_header"
                )}
                >Соц. сети</h2>

                {hasAnySocial
                ? <div
                className={clsx(
                "flex flex-col"
                )}
                >
                    {socialsConfig.map(({ key, label, isLink }) => {
                        const value = social?.[key];
                        if (!value) return null;

                        return (
                            <div
                            key={key}
                            className={clsx(
                            "flex gap-[4px]",
                            "caption_regular text-texticon_base_default"
                            )}
                            >
                                <span
                                className={clsx(
                                "!font-[600] text-texticon_base_accent"
                                )}
                                >{`${label} – `}</span>

                                {isLink
                                ? <a
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={clsx(
                                "increase_hover_anim w-fit"
                                )}
                                >Ссылка</a>
                                : <span>{value}</span>}
                            </div>
                        )
                    })}
                </div>
                : <span
                className={clsx(
                "caption_regular text-texticon_base_default"
                )}
                >Автор не указал свои соц. сети :с</span>}
            </div>
        )
    }
    else {
        return null
    }
}

export { SocialBlock };

type TSocialBlockProps = {
    username: string
}