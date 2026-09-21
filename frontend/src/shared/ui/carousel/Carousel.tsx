import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import clsx from "clsx";
import { NoDataPlug } from "../NoDataPlug";
import { hasChildren } from "@/shared/lib";

const Carousel = ({ name, additionalBtn, isLoop, noDataText, children }: TCarouselProps) => {
    const [emblaRef] = useEmblaCarousel(
        { loop: isLoop, skipSnaps: true, align: "start" },
        [WheelGesturesPlugin({ forceWheelAxis: "x" })]
    );

    return (
        <section
        className={clsx(
        "flex flex-col gap-[2.7vw]",
        "bp700px:gap-[1.43vw]",
        "bp1200px:gap-[10px]"
        )}
        >
            <div
            className={clsx(
            "flex justify-between"
            )}
            >
                <h2
                className={clsx(
                "label_l2 text-texticon_base_header select-none"
                )}
                >{name}</h2>
                {additionalBtn}
            </div>

            {hasChildren(children)
            ? <div
            ref={emblaRef}
            className={clsx(
            "embla overflow-hidden"
            )}
            >
				<div
                className={clsx(
                "embla__container",
                "flex",
                "-ml-[2.7vw]",
                "bp700px:-ml-[4.57vw]",
                "bp1200px:-ml-[32px]"
                )}
                >{children}</div>
			</div>
            : <NoDataPlug text={noDataText} />}
		</section>
    );
};

export { Carousel };

type TCarouselProps = {
	name: string;
    additionalBtn?: React.ReactNode;
    isLoop: boolean;
    noDataText: string;
    children: React.ReactNode
};