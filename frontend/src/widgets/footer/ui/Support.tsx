import Link from "next/link";
import clsx from "clsx";

const Support = () => {
    return (
        <div
        className={clsx(
        "flex flex-col gap-[2.7vw]",
        "bp700px:gap-[1.43vw]",
        "bp1200px:gap-[10px]"
        )}
        >
            <h3
            className={clsx(
            "label_l3 text-texticon_base_header select-none"
            )}
            >Помощь</h3>

            <nav>
                <ul
                className={clsx(
                "flex flex-col gap-[1.6vw]",
                "footer_regular text-texticon_base_default",
                "bp700px:gap-[0.86vw]",
                "bp1200px:gap-[6px]"
                )}
                >
                    <li>
                        <Link
                        href="/information"
                        className={clsx(
                        "increase_hover_anim select-none w-fit",
                        )}
                        >Информация</Link>
                    </li>
                    <li>
                        <Link
                        href="/questions"
                        className={clsx(
                        "increase_hover_anim select-none w-fit",
                        )}
                        >Вопросы и ответы</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export { Support };