import { TSvgProps } from "../model";

const YoutubeIcon = ({ svg_className, path_className }: TSvgProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={svg_className}>
			<path d="M0 11.52C0 6.08798 0 3.37601 1.67999 1.67999C3.38397 0 6.09604 0 11.52 0H12.48C17.912 0 20.6241 0 22.32 1.67999C24 3.38402 24 6.09599 24 11.52V12.48C24 17.912 24 20.624 22.32 22.32C20.616 24 17.904 24 12.48 24H11.52C6.08798 24 3.37601 24 1.67999 22.32C0 20.616 0 17.904 0 12.48V11.52Z" fill="#F8BF21" className={path_className} />
			<path d="M9.0718 8.44978C9.0718 7.77354 9.80385 7.35089 10.3895 7.68901L16.5387 11.2393C17.1244 11.5774 17.1244 12.4227 16.5387 12.7608L10.3895 16.3111C9.80385 16.6492 9.0718 16.2265 9.0718 15.5503L9.0718 8.44978Z" fill="#0B1A21" className={path_className} />
		</svg>
	);
}

export { YoutubeIcon };