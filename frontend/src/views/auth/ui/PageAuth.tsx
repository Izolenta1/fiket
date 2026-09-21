'use client'

import { useState } from "react";
import { ContentSwitch } from "@/shared/ui";
import clsx from "clsx";
import { AnimatePresence, motion } from 'framer-motion'
import { RenderAuthForm } from "./RenderAuthForm";
import { AnimatedMain } from "@/shared/ui";

const PageAuth = () => {
    const [selectedContent, setSelectedContent] = useState("Auth");

    return (
        <AnimatedMain>
            <div
            className={clsx(
            "flex flex-col gap-[3.3vw] self-center w-full",
            "bp700px:gap-[1.71vw] bp700px:max-w-[65.71vw]",
            "bp1200px:gap-[12px] bp1200px:max-w-[540px]"
            )}
            >
                <ContentSwitch
                buttons={[
                {label: "Авторизация", value: "Auth"},
                {label: "Регистрация", value: "Registration"},
                {label: "Сброс пароля", value: "Recovery"}
                ]}
                selectedContent={selectedContent}
                setSelectedContent={setSelectedContent}
                />

                <AnimatePresence
                initial={false}
                mode="popLayout"
                >
                    <motion.div
                    key={selectedContent}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                       {RenderAuthForm(selectedContent)} 
                    </motion.div>
                </AnimatePresence>
            </div>
		</AnimatedMain>
    );
};

export { PageAuth };