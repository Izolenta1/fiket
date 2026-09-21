import { TSvgProps } from "../model";

const CheckIcon = ({ svg_className, path_className }: TSvgProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={svg_className}>
			<path d="M3 8.5L7 12.5L13 3.5" strokeLinecap="round" strokeLinejoin="round" className={path_className} />
		</svg>
	);
}

export { CheckIcon };