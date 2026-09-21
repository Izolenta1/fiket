import { TSvgProps } from "../model";

const TikTokIcon = ({ svg_className }: TSvgProps) => {
	return (
		<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={svg_className}>
			<rect width="28" height="28" rx="6" fill="#F8BF21" />
			<path d="M18.6497 3H14.9421V17.9855C14.9421 19.771 13.5161 21.2377 11.7415 21.2377C9.96689 21.2377 8.54088 19.771 8.54088 17.9855C8.54088 16.2319 9.93521 14.7971 11.6464 14.7333V10.971C7.87541 11.0348 4.83325 14.1275 4.83325 17.9855C4.83325 21.8754 7.93879 25 11.7732 25C15.6075 25 18.7131 21.8435 18.7131 17.9855V10.3014C20.1074 11.3217 21.8186 11.9275 23.6249 11.9594V8.1971C20.8363 8.10145 18.6497 5.80579 18.6497 3Z" fill="#0B1A21" />
		</svg>
	);
}

export { TikTokIcon };