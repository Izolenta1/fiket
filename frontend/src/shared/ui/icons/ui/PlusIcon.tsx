import { TSvgProps } from "../model";

const PlusIcon = ({ svg_className, path_className }: TSvgProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={svg_className}>
            <path d="M8.5 3V13M13.5 8L3.5 8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={path_className} />
        </svg>
    );
}

export { PlusIcon };