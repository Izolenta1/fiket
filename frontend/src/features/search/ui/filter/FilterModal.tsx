import { Modal } from "@/shared/ui";
import {
    AnimatePresence,
    motion
} from 'framer-motion'
import {
    MainContent,
    GenresContent,
    TypeContent,
    DateContent,
    StatusContent,
    RatingContent,
    PublisherContent
} from "./content";
import { useState } from "react";

const FilterModal = ({ open, onClose }: TSortModalProps) => {
	const [activeContent, setActiveContent] = useState("Фильтр")
    
    const renderBlock = () => {
		switch (activeContent) {
			case "Фильтр":
				return <MainContent onClose={onClose} setActiveContent={setActiveContent} />;
			case "Жанры":
				return <GenresContent onClose={onClose} setActiveContent={setActiveContent} />;
            case "Тип":
                return <TypeContent onClose={onClose} setActiveContent={setActiveContent} />;
            case "Дата":
                return <DateContent onClose={onClose} setActiveContent={setActiveContent} />;
            case "Статус":
                return <StatusContent onClose={onClose} setActiveContent={setActiveContent} />;
            case "Возрастной рейтинг":
                return <RatingContent onClose={onClose} setActiveContent={setActiveContent} />;
            case "Издатели":
                return <PublisherContent onClose={onClose} setActiveContent={setActiveContent} />;
			default:
                return <MainContent onClose={onClose} setActiveContent={setActiveContent} />;
		}
	};

    return (
        <Modal
        open={open}
        onClose={onClose}
        >
            <AnimatePresence
            initial={false}
            mode="wait"
            >
                <motion.div
                key={activeContent}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    {renderBlock()}
                </motion.div>
            </AnimatePresence>
        </Modal>
    )
}

export { FilterModal };

type TSortModalProps = {
    open: boolean,
    onClose: () => void,
}