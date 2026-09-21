import { Z_INDEX } from "@/shared/config";
import clsx from "clsx";
import { useClickOutside } from "@/shared/lib";

const Modal = ({ children, open, onClose }: TModal) => {
    const modalRef = useClickOutside<HTMLDivElement>(() => {
        if (open) {
            onClose()
        }
    });

    return (
        <div
        className={clsx(
        "fixed left-0 right-0 top-0 bottom-0",
        "backdrop-blur-[6px] bg-surface_blure",
        "transition-opacity duration-400",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{
            zIndex: Z_INDEX.modal
        }}
        >
            <div
            ref={modalRef}
            className={clsx(
            "absolute top-[120px] left-0 right-0 mx-auto w-[88.8vw]",
            "bg-surface_secondary border-[0.27vw] border-border_default rounded-[3.3vw]",
            "p-[5.5vw]",
            "bp700px:w-[60vw] bp700px:border-[0.14vw] bp700px:px-[3.43vw] bp700px:py-[2.29vw] bp700px:rounded-[1.71vw]",
            "bp1200px:w-[540px] bp1200px:border-[1px] bp1200px:px-[24px] bp1200px:py-[16px] bp1200px:rounded-[12px]"
            )}
            >
                {children}
            </div>
        </div>
    )
}

export { Modal };

type TModal = {
    children: React.ReactNode,
    open: boolean,
    onClose: () => void;
}