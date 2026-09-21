import { TSvgProps } from "../model";

const CircleCheckIcon = ({ svg_className, path_className }: TSvgProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="none" className={svg_className}>
			<path d="M9 13.9954L12 16.9954L17 9.99536M25 12.9954C25 19.6228 19.6274 24.9954 13 24.9954C6.37258 24.9954 1 19.6228 1 12.9954C1 6.36794 6.37258 0.995361 13 0.995361C19.6274 0.995361 25 6.36794 25 12.9954Z" strokeLinecap="round" strokeLinejoin="round" className={path_className} />
		</svg>
	);
}

export { CircleCheckIcon };