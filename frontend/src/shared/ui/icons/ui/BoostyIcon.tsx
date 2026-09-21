import { TSvgProps } from "../model";

const BoostyIcon = ({ svg_className, path_className }: TSvgProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={svg_className}>
			<path d="M0 11.52C0 6.08798 0 3.37601 1.67999 1.67999C3.38397 0 6.09604 0 11.52 0H12.48C17.912 0 20.6241 0 22.32 1.67999C24 3.38402 24 6.09599 24 11.52V12.48C24 17.912 24 20.624 22.32 22.32C20.616 24 17.904 24 12.48 24H11.52C6.08798 24 3.37601 24 1.67999 22.32C0 20.616 0 17.904 0 12.48V11.52Z" fill="#F8BF21" className={path_className} />
			<path fillRule="evenodd" clipRule="evenodd" d="M8.56366 3L5.52909 13.7524L5.41739 14.1238C4.37484 17.819 5.56633 20.9429 9.82961 20.9905C10.3695 19.5905 11.1235 17.6571 12.0916 15.1905H9.78307L12.2591 6.39048L12.2871 6.33333L13.2272 3H8.56366ZM15.4705 12.7238L9.84823 21H9.94131C14.0929 21 18.3562 17.8571 19.408 14.1333C20.3947 10.6667 18.7192 7.8 15.1634 7.41905L13.0876 12.7238H15.4705Z" fill="#0B1A21" className={path_className} />
		</svg>
	);
}

export { BoostyIcon };