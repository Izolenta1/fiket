import clsx from "clsx";
import {
    AnimatePresence,
    motion
} from "framer-motion";
import {
    Button,
    Modal,
    useModal,
    XmarkIcon
} from "@/shared/ui";

const ProfileModalInput = ({ title, modalTitle, value, selectedLabels, availability = true, error, children }: TProfileModalInputProp) => {
    const { open, openModal, closeModal } = useModal();
    
    return (
        <section
        className={clsx(
        "flex flex-col gap-[3.3vw]",
        "bp700px:gap-[1.71vw]",
        "bp1200px:gap-[12px]"
        )}
        >
            <div
            className={clsx(
            "transition-color duration-[400ms]",
            "relative",
            "flex flex-col gap-[3.3vw] min-h-[33.3vw]",
            "p-[3.3vw]",
            "bg-surface_container border-[0.27vw] rounded-[3.3vw] overflow-hidden",
            "bp700px:gap-[1.71vw] bp700px:min-h-[25.71vw] bp700px:p-[2.29vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
            "bp1200px:gap-[12px] bp1200px:min-h-[180px] bp1200px:p-[16px] bp1200px:px-[24px] bp1200px:border-[1px] bp1200px:rounded-[12px]",
            error ? "border-texticon_base_warning" : "border-border_default"
            )}
            >
                <h2
                className={clsx(
                "label_l3 text-texticon_base_header select-none"
                )}
                >{title}</h2>

                <p
                className={clsx(
                "caption_regular text-texticon_base_default select-none",
                "-mt-[2.2vw]",
                "bp700px:-mt-[1.14vw]",
                "bp1200px:-mt-[8px]"
                )}
                >Выбрано: {value.length}</p>

                <div
                className={clsx(
                "flex gap-[1.1vw] flex-wrap",
                "bp700px:gap-[0.57vw]",
                "bp1200px:gap-[4px]"
                )}
                >
                    {selectedLabels.map(item => 
                    <div
                    key={item}
                    className={clsx(
                    "w-fit",
                    "px-[4.4vw] py-[2.2vw]",
                    "bg-surface_secondary rounded-[3.3vw]",
                    "text-texticon_base_header caption_regular select-none",
                    "bp700px:px-[2.29vw] bp700px:py-[1.14vw] bp700px:rounded-[1.71vw]",
                    "bp1200px:px-[16px] bp1200px:py-[8px] bp1200px:rounded-[12px]"
                    )}
                    >{item}</div>
                    )}
                </div>

                <Button
                text="Выбрать"
                type="button"
                variant={value.length > 0 ? "primary" : "secondaryAlt"}
                onClick={openModal}
                classNames={{
                wrapper: "mt-auto"
                }}
                />

                <Modal
                open={open}
                onClose={closeModal}
                >
                    <div
                    className={clsx(
                    "flex flex-col gap-[3.3vw]",
                    "bp700px:gap-[2.29vw]",
                    "bp1200px:gap-[20px]"
                    )}
                    >
                        
                        {/* Заголовок */}
                        <div
                        className={clsx(
                        "flex items-center justify-between"
                        )}
                        >
                            <p
                            className={clsx(
                            "label_l2 text-texticon_base_header select-none"
                            )}
                            >{modalTitle}</p>

                            <button
                            onClick={closeModal}
                            type="button"
                            className={clsx(
                            "cursor-pointer increase_hover_anim"
                            )}
                            >
                                <XmarkIcon
                                svg_className={clsx(
                                "w-[6.6vw] h-[6.6vw]",
                                "bp700px:w-[4.57vw] bp700px:h-[4.57vw]",
                                "bp1200px:w-[32px] bp1200px:h-[32px]"
                                )}
                                path_className={clsx(
                                "stroke-texticon_base_header"
                                )}
                                />
                            </button>
                        </div>

                        {children}
                    </div>
                </Modal>

                <AnimatePresence
                initial={false}
                mode="wait"
                >
                    {!availability &&
                    <motion.div
                    key={availability.toString()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 bg-surface_body"
                    />}
                </AnimatePresence>
            </div>

            {error &&
            <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 500, damping: 30 }}
            className={clsx(
            "will-change-transform",
            "w-fit",
            "px-[3.3vw]",
            "caption_regular text-texticon_base_warning",
            "bp700px:px-[1.71vw]",
            "bp1200px:px-[12px]"
            )}>{error}</motion.span>}
        </section>
    );
};

export { ProfileModalInput };

type TProfileModalInputProp = {
	title: string;
    modalTitle: string;
    value: string[];
    selectedLabels: string[];
    availability?: boolean;
    error?: string;
    children: React.ReactNode
};