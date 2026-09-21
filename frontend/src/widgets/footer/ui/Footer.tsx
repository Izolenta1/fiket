'use client'

import { Title } from "./Title";
import { ContentDevider } from "@/shared/ui";
import { TechSupport } from "./TechSupport";
import { Socials } from "./Socials";
import { Support } from "./Support";
import { Service } from "./Service";
import { About } from "./About";
import clsx from "clsx";
import { Z_INDEX } from "@/shared/config";

const Footer = () => {
    return (
        <footer
        className={clsx(
        "flex justify-center",
        "bg-surface_secondary rounded-t-[3.3vw]",
        "bp700px:rounded-t-[1.71vw]",
        "bp1200px:rounded-t-[12px]"
        )}
        style={{
            zIndex: Z_INDEX.chrome
        }}
        >
			<div
            className={clsx(
            "grow flex flex-col gap-[3.3vw]",
            "py-[5.5vw] px-[5.5vw]",
            "bp700px:py-[2.86vw] bp700px:px-[5.71vw] bp700px:gap-[1.7vw]",
            "bp1200px:py-[24px] bp1200px:px-0 bp1200px:gap-[32px] bp1200px:max-w-[1040px]"
            )}
            >
                <Title />
                <ContentDevider />
                <div
                className={clsx(
                "flex flex-col gap-[5.5vw]",
                "bp700px:gap-[2.86vw]",
                "bp1200px:flex-row bp1200px:gap-[24px]"
                )}
                >
                    <TechSupport />
                    <Socials />
                    <Support />
                    <Service />
                    <About />  
                </div>
            </div>
        </footer>
    )
}

export { Footer };