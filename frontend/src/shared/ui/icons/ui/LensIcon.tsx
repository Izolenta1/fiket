import { TSvgProps } from "../model";

const LensIcon = ({ svg_className, path_className }: TSvgProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={svg_className}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M10.8 4.20002C7.15492 4.20002 4.2 7.15495 4.2 10.8C4.2 14.4451 7.15492 17.4 10.8 17.4C12.6228 17.4 14.2716 16.6623 15.4669 15.4669C16.6623 14.2716 17.4 12.6228 17.4 10.8C17.4 7.15495 14.4451 4.20002 10.8 4.20002ZM2.4 10.8C2.4 6.16083 6.16081 2.40002 10.8 2.40002C15.4392 2.40002 19.2 6.16083 19.2 10.8C19.2 12.7951 18.5036 14.6287 17.3421 16.0693L21.3364 20.0636C21.6879 20.4151 21.6879 20.9849 21.3364 21.3364C20.9849 21.6879 20.4151 21.6879 20.0636 21.3364L16.0693 17.3421C14.6287 18.5037 12.795 19.2 10.8 19.2C6.16081 19.2 2.4 15.4392 2.4 10.8Z"
                className={path_className}
            />
		</svg>
	);
}

export { LensIcon };