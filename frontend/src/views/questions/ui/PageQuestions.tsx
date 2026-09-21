'use client'

import {
    AnimatedMain,
    Breadcrumbs
} from "@/shared/ui";
import clsx from "clsx";
import { AskQuestionForm } from "@/features/ask-question";

const PageQuestions = () => {
    const questionsBreadcrumbs = [
        {id: 1, name: "Вопросы и ответы", link: ""},
    ]

    return (
        <AnimatedMain>
            <Breadcrumbs
            linkArray={questionsBreadcrumbs}
            />

            <h1
            className={clsx(
            "label_l1 text-texticon_base_header select-none"
            )}
            >Вопросы и ответы</h1>

            <section
            className={clsx(
            "caption_regular text-texticon_base_default",
            "flex flex-col gap-[3.3vw]",
            "bp700px:gap-[1.71vw]",
            "bp1200px:gap-[12px]"
            )}
            >
                <p>Эта страница будет со временем пополняться, но пока тут пустовато :/</p>
            </section>

            <AskQuestionForm />
        </AnimatedMain>
    )
}

export { PageQuestions };