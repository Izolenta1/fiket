import { TSvgProps } from "../model";

const HalfArrowIcon = ({ svg_className, path_className }: TSvgProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className={svg_className}>
			<path d="M14.375 18.75L6.04167 10.4167L14.375 2.08333" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" className={path_className} />
		</svg>
	);
}

export { HalfArrowIcon };