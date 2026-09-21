import { TSvgProps } from "../model";

const CircleCrossIcon = ({ svg_className, path_className }: TSvgProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={svg_className}>
			<rect x="0.5" y="0.5" width="23" height="23" rx="11.5" className={path_className} />
			<path d="M7 16.9932L17 6.99316M7 6.99316L17 16.9932" strokeLinecap="round" strokeLinejoin="round" className={path_className} />
		</svg>
	);
}

export { CircleCrossIcon };