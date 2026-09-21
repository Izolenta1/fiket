'use client'

import { SearchLink } from "./SearchLink";
import { AuthLink } from "./AuthLink";
import { LogoFullIcon } from "@/shared/ui";
import clsx from "clsx";
import Link from "next/link";
import { Z_INDEX } from "@/shared/config";

const Header = () => {
    return (
        <header
        className={clsx(
        "w-full flex justify-center",
        "bg-surface_secondary rounded-b-[3.3vw]",
        "bp700px:rounded-b-[1.71vw]",
        "bp1200px:rounded-b-[12px]"
        )}
        style={{
            zIndex: Z_INDEX.chrome
        }}
        >
			<div
            className={clsx(
            "flex justify-between items-center grow",
            "py-[3.3vw] px-[5.5vw]",
            "bp700px:py-[2.29vw] bp700px:px-[5.71vw]",
            "bp1200px:py-[16px] bp1200px:px-0 bp1200px:max-w-[1040px]"
            )}
            >
                <Link
                href={"/"}
                className={clsx(
                "increase_hover_anim",
                )}
                >
                	<LogoFullIcon
                    svg_className={clsx(
                    "h-[6.6vw] w-auto",
                    "bp700px:h-[5.71vw]",
                    "bp1200px:h-[40px]"
                    )} 
                    />
                </Link>

				<nav
                className={clsx(
                "flex gap-[3.3vw] h-fit w-fit",
                "bp700px:gap-[1.71vw]",
                "bp1200px:gap-[12px]"
                )}
                >
					<SearchLink />
					<AuthLink />
				</nav>
			</div>
		</header>
    )
}

export { Header };