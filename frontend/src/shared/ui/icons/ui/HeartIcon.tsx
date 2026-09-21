import { TSvgProps } from "../model";

const HeartIcon = ({ svg_className, path_className }: TSvgProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 14" fill="none" className={svg_className}>
			<path d="M11.375 4.96875C11.375 3.62256 10.2382 2.53125 8.83594 2.53125C7.78748 2.53125 6.88744 3.14132 6.5 4.01185C6.11256 3.14132 5.21252 2.53125 4.16406 2.53125C2.76178 2.53125 1.625 3.62256 1.625 4.96875C1.625 8.87989 6.5 11.4688 6.5 11.4688C6.5 11.4688 11.375 8.87989 11.375 4.96875Z" strokeLinecap="round" strokeLinejoin="round" className={path_className} />
		</svg>
	);
}

export { HeartIcon };