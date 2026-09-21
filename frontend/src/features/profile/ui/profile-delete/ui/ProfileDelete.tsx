import clsx from "clsx";
import {
    Button,
    useModal
} from "@/shared/ui";
import { ProfileDeleteModal } from "./ProfileDeleteModal";

const ProfileDelete = ({ title, subText, confirmText, onDelete, deleteLoading }: TProfileDeleteProps) => {
    const { open, openModal, closeModal } = useModal();
    
    return (
        <>
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
                "flex flex-col gap-[1.1vw] min-h-[33.3vw]",
                "p-[3.3vw]",
                "bg-surface_container border-[0.27vw] rounded-[3.3vw] overflow-hidden",
                "bp700px:gap-[0.57vw] bp700px:min-h-[25.71vw] bp700px:p-[2.29vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
                "bp1200px:gap-[4px] bp1200px:min-h-[180px] bp1200px:p-[16px] bp1200px:px-[24px] bp1200px:border-[1px] bp1200px:rounded-[12px]",
                )}
                >
                    <h2
                    className={clsx(
                    "label_l3 text-texticon_base_header select-none"
                    )}
                    >{title}</h2>

                    <p
                    className={clsx(
                    "caption_regular text-texticon_base_default select-none"
                    )}
                    >{subText}</p>

                    <Button
                    text="Удалить"
                    variant="warning"
                    onClick={openModal}
                    classNames={{
                    wrapper: "mt-auto"
                    }}
                    />
                </div>
            </section>
            <ProfileDeleteModal
            open={open}
            onClose={closeModal}
            title={title}
            confirmText={confirmText}
            onDelete={onDelete}
            deleteLoading={deleteLoading}
            />
        </>
    );
};

export { ProfileDelete };

type TProfileDeleteProps = {
    title: string,
    subText: string,
    confirmText: string;
    onDelete: () => void;
    deleteLoading: boolean
}