import { TSvgProps } from "../model";

const ThreeDotIcon = ({ svg_className, path_className }: TSvgProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className={svg_className}>
            <path d="M5.625 10C5.625 10.3452 5.34518 10.625 5 10.625C4.65482 10.625 4.375 10.3452 4.375 10C4.375 9.65482 4.65482 9.375 5 9.375C5.34518 9.375 5.625 9.65482 5.625 10Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={path_className} />
            <path d="M10.625 10C10.625 10.3452 10.3452 10.625 10 10.625C9.65482 10.625 9.375 10.3452 9.375 10C9.375 9.65482 9.65482 9.375 10 9.375C10.3452 9.375 10.625 9.65482 10.625 10Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={path_className} />
            <path d="M15.625 10C15.625 10.3452 15.3452 10.625 15 10.625C14.6548 10.625 14.375 10.3452 14.375 10C14.375 9.65482 14.6548 9.375 15 9.375C15.3452 9.375 15.625 9.65482 15.625 10Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={path_className} />
        </svg>
    );
}

export { ThreeDotIcon };