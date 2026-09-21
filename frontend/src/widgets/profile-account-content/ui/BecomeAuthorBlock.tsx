import clsx from "clsx";

const BecomeAuthorBlock = () => {
    return (
        <div
        className={clsx(
        "flex flex-col gap-[3.3vw] col-span-full",
        "p-[3.3vw]",
        "bg-surface_container border-[0.27vw] border-border_default rounded-[3.3vw]",
        "bp700px:gap-[1.71vw] bp700px:p-[2.29vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
        "bp1200px:gap-[12px] bp1200px:p-[16px] bp1200px:px-[24px] bp1200px:border-[1px] bp1200px:rounded-[12px]"
        )}
        >
            <h2
            className={clsx(
            "label_l3 text-texticon_base_header select-none"
            )}
            >Стать автором</h2>

            <span
            className={clsx(
            "caption_regular text-texticon_base_default"
            )}
            >
                Приём заявок на публикацию своих комиксов осуществляется через почту <span className={clsx("text-texticon_base_accent underline underline-offset-2")}>support@fiket.ru</span>. Напишите нам на почту, расскажите немного о себе и прикрепите свои работы.
            </span>
        </div>
    )
}

export { BecomeAuthorBlock };