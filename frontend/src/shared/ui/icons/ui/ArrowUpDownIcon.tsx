import { TSvgProps } from "../model";

const ArrowUpDownIcon = ({ svg_className, path_className }: TSvgProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 16" fill="none" className={svg_className}>
			<path d="M2.5 5L5.5 2M5.5 2L8.5 5M5.5 2V11M14.5 11L11.5 14M11.5 14L8.5 11M11.5 14L11.5 5" strokeLinecap="round" strokeLinejoin="round" className={path_className} />
		</svg>
	);
}

export { ArrowUpDownIcon };