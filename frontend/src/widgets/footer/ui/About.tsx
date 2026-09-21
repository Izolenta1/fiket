import clsx from "clsx";

const About = () => {
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
            >О нас</h3>

            <ul
            className={clsx(
            "flex flex-col gap-[1.6vw]",
            "footer_regular text-texticon_base_default text-nowrap",
            "bp700px:gap-[0.86vw]",
            "bp1200px:gap-[6px]"
            )}
            >
                <li>
                    <span>© 2025 - {new Date().getFullYear()} Фикет</span>
                </li>
                <li>
                    <span>ИП: [ФИО]</span>
                </li>
                <li>
                    <span>ОГРНИП: [номер]</span>
                </li>
                <li>
                    <span>ИНН: [номер]</span>
                </li>
            </ul>
        </div>
    )
}

export { About };