import { TSvgProps } from "../model";

const XmarkIcon = ({ svg_className, path_className }: TSvgProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className={svg_className}>
			<path d="M6 18.5L18 6.5M6 6.5L18 18.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={path_className} />
		</svg>
	);
}

export { XmarkIcon };