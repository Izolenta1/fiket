'use client'

import {
    AnimatedMain,
    Breadcrumbs
} from "@/shared/ui";
import clsx from "clsx";
import { CopyToClipboard } from "@/features/copy-to-clipboard";

const PageAuthors = () => {
    const informationBreadcrumbs = [
        {id: 1, name: "Стать автором", link: ""},
    ]

    return (
        <AnimatedMain>
            <Breadcrumbs
            linkArray={informationBreadcrumbs}
            />

            <h1
            className={clsx(
            "label_l1 text-texticon_base_header select-none"
            )}
            >Стать автором</h1>

            <section
            className={clsx(
            "caption_regular text-texticon_base_default",
            "flex flex-col gap-[3.3vw]",
            "bp700px:gap-[1.71vw]",
            "bp1200px:gap-[12px]"
            )}
            >
                <p>В скором времени мы добавим автоматизированную систему для того чтобы вы самостоятельно могли стать автором  и публиковать свои работы у нас на сайте. </p>
                <div>
                    Но пока что для того чтобы получить возможность публикации своих работ у нас на сайте, напишите письмо нам на почту - 
                    <CopyToClipboard
                    text="author@fiket.ru"
                    classNames={{
                    root: "text-texticon_base_accent"
                    }}
                    />
                </div>
                <p>В письме укажите информацию о вашем профиле на нашем сайте (написать что нужно указать), а также примеры ваших работ в целях модерации. </p>
            </section>
        </AnimatedMain>
    )
}

export { PageAuthors };