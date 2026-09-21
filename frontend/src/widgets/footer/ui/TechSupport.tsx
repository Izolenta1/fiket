import { CopyToClipboard } from "@/features/copy-to-clipboard";
import clsx from "clsx";

const TechSupport = () => {
    return (
        <div
        className={clsx(
        "flex flex-col gap-[2.7vw]",
        "bp700px:gap-[1.43vw]",
        "bp1200px:gap-[10px] bp1200px:order-4"
        )}
        >
            <h3
            className={clsx(
            "label_l3 text-texticon_base_header select-none"
            )}
            >Техническая поддержка</h3>

            <span
            className={clsx(
            "footer_regular text-texticon_base_default select-none"
            )}
            >
                При возникновении вопросов
                <br />
                вы всегда можете связаться с нами по адресу:
                <br />
                <br />
                <CopyToClipboard
                text="support@fiket.ru"
                classNames={{
                root: "text-texticon_base_accent"
                }}
                />
            </span>
        </div>
    )
}

export { TechSupport };