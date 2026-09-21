import { TSvgProps } from "../model";

const NoImageIcon = ({ svg_className }: TSvgProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none" className={svg_className}>
			<rect x="1" y="1.00018" width="78" height="78" stroke="white" strokeOpacity="0.8" strokeWidth="2" />
			<path d="M65 55.0002H15V40.479L17.5 36.4001C17.5 36.4001 20.7968 30.4001 23.5 30.4001C27.8478 30.4001 32.4512 41.107 37.8261 40.479C42.7286 39.9061 45.665 36.403 48 32.2001C50 28.6002 51.9638 25.0006 54.5 25.0002C57.0362 24.9998 58.8261 28.0648 61 32.2001L65 40.479V55.0002Z" fill="white" fillOpacity="0.8" />
			<path d="M33.5 31.5002C32.8787 30.8789 32.8787 29.8715 33.5 29.2502C34.1213 28.6289 35.1287 28.6289 35.75 29.2502C36.3713 29.8715 36.3713 30.8789 35.75 31.5002C35.1287 32.1215 34.1213 32.1215 33.5 31.5002Z" fill="white" fillOpacity="0.8" />
		</svg>
	);
}

export { NoImageIcon };