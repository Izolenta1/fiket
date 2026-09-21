import { TSvgProps } from "../model";

const ArrowLeftRightIcon = ({ svg_className, path_className }: TSvgProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={svg_className}>
			<path d="M5 14L2 11M2 11L5 8M2 11H11M11 2L14 5M14 5L11 8M14 5L5 5" strokeLinecap="round" strokeLinejoin="round" className={path_className} />
		</svg>
	);
}

export { ArrowLeftRightIcon };