import { AccountButton } from "./AccountButton";
import { LogoutModal } from "@/features/auth";
import { useModal } from "@/shared/ui";

const LogoutButton = () => {
    const { open, openModal, closeModal } = useModal();
    
    return (
        <>
            <AccountButton
            title="Выйти из аккаунта?"
            subText="Выйти"
            onClick={openModal}
            wide={true}
            />

            <LogoutModal
            open={open}
            onClose={closeModal}
            />
        </>
    )
}

export { LogoutButton };