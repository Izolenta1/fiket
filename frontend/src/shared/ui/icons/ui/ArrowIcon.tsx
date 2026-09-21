import { TSvgProps } from "../model";

const ArrowIcon = ({ svg_className, path_className }: TSvgProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className={svg_className}>
            <path d="M22.9998 10.9999L27.9998 15.9999M27.9998 15.9999L22.9998 20.9999M27.9998 15.9999H3.99976" strokeWidth="2.40458" strokeLinecap="round" strokeLinejoin="round" className={path_className}/>
        </svg>
    );
}

export { ArrowIcon };