import clsx from "clsx";
import {
    AnimatePresence,
    motion
} from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

const ProfileCarouselInput = ({ title, subText, availability = true, error, children }: TProfileCarouselInputProp) => {
    const [emblaRef] = useEmblaCarousel({ loop: false, skipSnaps: true, align: "start" }, [WheelGesturesPlugin({ forceWheelAxis: "x" })]);
    
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
            "flex flex-col gap-[1.1vw] min-h-[33.3vw]",
            "p-[3.3vw]",
            "bg-surface_container border-[0.27vw] rounded-[3.3vw] overflow-hidden",
            "bp700px:gap-[0.57vw] bp700px:min-h-[25.71vw] bp700px:p-[2.29vw] bp700px:border-[0.14vw] bp700px:rounded-[1.71vw]",
            "bp1200px:gap-[4px] bp1200px:min-h-[180px] bp1200px:p-[16px] bp1200px:px-[24px] bp1200px:border-[1px] bp1200px:rounded-[12px]",
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
                "caption_regular text-texticon_base_default select-none"
                )}
                >{subText}</p>

                <div
                className={clsx(
                "embla overflow-hidden relative",
                "mt-auto pb-[0.27vw]",
                "bp700px:pb-[0.14vw]",
                "bp1200px:pb-[1px]"
                )}
                ref={emblaRef}
                >
                    <div
                    className={clsx(
                    "embla__container flex gap-[3.3vw]",
                    "bp700px:gap-[1.71vw]",
                    "bp1200px:gap-[12px]"
                    )}
                    >
                        {children}
                    </div>
                </div>

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

export { ProfileCarouselInput };

type TProfileCarouselInputProp = {
	title: string;
	subText: string;
    availability?: boolean;
    error?: string;
    children: React.ReactNode
};