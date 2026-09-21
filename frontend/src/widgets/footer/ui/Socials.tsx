import { YoutubeIcon } from "@/shared/ui";
import { VkIcon } from "@/shared/ui";
import { TelegramIcon } from "@/shared/ui";
import { TikTokIcon } from "@/shared/ui";
import { mergeObjectClassNames } from "@/shared/lib";
import clsx from "clsx";

const Socials = ({ classNames }: TSocialsProps) => {
    const merge = mergeObjectClassNames(defaultClassNames, classNames);

    return (
        <ul
        className={clsx(
        `flex gap-[1.6vw] ${merge("root")}`,
        "bp700px:gap-[0.86vw]",
        "bp1200px:gap-[12px]"
        )}
        >
            <li>
                <a
                href="https://youtube.com/@fiket_ru"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                "increase_hover_anim",
                )}
                >
                    <YoutubeIcon
                    svg_className={clsx(
                    "w-[6.6vw] h-[6.6vw]",
                    "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
                    "bp1200px:w-[28px] bp1200px:h-[28px]"
                    )}
                    />
                </a>
            </li>
            <li>
                <a
                href="https://vk.com/fiket_ru"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                "increase_hover_anim",
                )}
                >
                    <VkIcon
                    svg_className={clsx(
                    "w-[6.6vw] h-[6.6vw]",
                    "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
                    "bp1200px:w-[28px] bp1200px:h-[28px]"
                    )}
                    />
                </a>
            </li>
            <li>
                <a
                href="https://t.me/Fiket_ru"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                "increase_hover_anim",
                )}
                >
                    <TelegramIcon
                    svg_className={clsx(
                    "w-[6.6vw] h-[6.6vw]",
                    "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
                    "bp1200px:w-[28px] bp1200px:h-[28px]"
                    )}
                    />
                </a>
            </li>
            <li>
                <a
                href="https://www.tiktok.com/@fiket_ru"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                "increase_hover_anim",
                )}
                >
                    <TikTokIcon
                    svg_className={clsx(
                    "w-[6.6vw] h-[6.6vw]",
                    "bp700px:w-[3.43vw] bp700px:h-[3.43vw]",
                    "bp1200px:w-[28px] bp1200px:h-[28px]"
                    )}
                    />
                </a>
            </li>
        </ul>
    )
}

export { Socials };

type TSocialsClassNames = {
	root?: string;
};

type TSocialsProps = {
	classNames?: TSocialsClassNames;
};

const defaultClassNames: Required<TSocialsClassNames> = {
	root: "flex bp1200px:hidden",
};