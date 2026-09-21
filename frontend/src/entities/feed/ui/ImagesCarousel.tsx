import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import {
    useState,
    useEffect
} from "react";
import { PlugImage } from "@/shared/ui";
import clsx from "clsx";
import { Z_INDEX } from "@/shared/config";

const ImagesCarousel = ({ images_urls }: TImagesCarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, skipSnaps: true, align: "start" }, [WheelGesturesPlugin({ forceWheelAxis: "x" })]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = () => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    const scrollTo = (index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    };

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        onSelect(); // Инициализация
    }, [emblaApi, onSelect]);
    
    if (images_urls.length > 0) {
        return (
            <div
            ref={emblaRef}
            className={clsx(
            "embla relative select-none",
            "overflow-hidden rounded-[1.6vw]",
            "bp700px:rounded-[0.86vw]",
            "bp1200px:rounded-[6px]"
            )}
            >
                <div
                className={clsx(
                "embla__container flex gap-[3.3vw]",
                "bp700px:gap-[1.71vw]",
                "bp1200px:gap-[12px]"
                )}
                >
                    {images_urls.map(image => 
                    <div
                    key={image}
                    className={clsx(
                    "embla__slide relative overflow-hidden",
                    "w-full h-[47.2vw]",
                    "flex justify-center items-cente shrink-0 grow-0",
                    "bp700px:h-[45.71vw]",
                    "bp1200px:h-[320px]"
                    )}
                    >
                        <div
                        style={{
                        zIndex: Z_INDEX.feedImage
                        }}
                        >
                            <PlugImage
                            src={image}
                            alt={""}
                            imageClassName={clsx(
                            "absolute object-contain",
                            "w-full h-full"
                            )}
                            />
                        </div>

                        <PlugImage
                        src={image}
                        alt={"post_bg"}
                        imageClassName={clsx(
                        "blur-[10px]",
                        "w-full h-full"
                        )}
                        />
                    </div>
                    )}
                </div>

                <div
                className={clsx(
                "flex gap-[1.1vw] mx-auto",
                "mx-auto",
                "absolute w-fit bottom-[1.1vw] left-0 right-0",
                "bp700px:gap-[0.57vw] bp700px:bottom-[0.57vw]",
                "bp1200px:gap-[4px] bp1200px:bottom-[4px]"
                )}
                style={{
                zIndex: Z_INDEX.feedSnaps
                }}
                >
                    {/* Пиксельный значения, т.к. не влияет на визуал, но жестко колбасит на различных расширениях */}
                    {scrollSnaps.map((_, index) => (
                    <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={clsx(
                    "transition-color duration-[400ms]",
                    "flex justify-center items-center",
                    "w-[6px] h-[6px]",
                    "rounded-[50%] bg-surface_container",
                    index === selectedIndex ? 'bg-surface_container' : 'bg-transparent'
                    )}
                    >
                        <div
                        className={clsx(
                        "w-[4px] h-[4px]",
                        "rounded-[50%] bg-surface_container",
                        )}
                        />
                    </button>
                    ))}
                </div>
            </div>
        )
    }
}

export { ImagesCarousel };

type TImagesCarouselProps = {
    images_urls: string[]
}