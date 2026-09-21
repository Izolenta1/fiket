import {
    PollLine,
    PollButton
} from "@/features/post-poll";
import { TPoll } from "../model/types";
import {
    AnimatePresence,
    motion
} from "framer-motion";
import {
    useState,
    useEffect
} from "react";
import clsx from "clsx";

const PollBlock = ({ poll, username, page_number, post_id }: TPollBlockProps) => {
    const [choiceCount, setChoiceCount] = useState(poll?.choices.reduce((sum, choice) => sum + choice.choice_count, 0))
    const [isChosen, setIsChosen] = useState(poll?.choices.reduce((sum, choice) => sum + (+ choice.chosen), 0))

    useEffect(() => {
        setChoiceCount(poll?.choices.reduce((sum, choice) => sum + choice.choice_count, 0))
        setIsChosen(poll?.choices.reduce((sum, choice) => sum + (+ choice.chosen), 0))
    }, [poll])
    
    return (
        <AnimatePresence
        initial={false}
        mode="wait">
            <motion.div
            key={isChosen.toString()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={clsx(
            "select-none",
            "flex flex-col gap-[3.3vw]",
            "bp700px:gap-[1.71vw]",
            "bp1200px:gap-[12px]"
            )}
            >
                {isChosen 
                ? poll?.choices.map(item =>
                <PollLine
                key={item.id}
                title={item.text}
                sumVotes={choiceCount}
                votes={item.choice_count}
                isSelected={item.chosen}
                />)
                : poll?.choices.map(item =>
                <PollButton
                key={item.id}
                variant_id={item.id}
                title={item.text}
                username={username}
                page_number={page_number}
                post_id={post_id}
                />)}
            </motion.div>
        </AnimatePresence>
    )
}

export { PollBlock };

type TPollBlockProps = {
    poll: TPoll,
    username: string,
    page_number: number,
    post_id: string
}