import { TSvgProps } from "../model";

const UserIcon = ({ svg_className, path_className }: TSvgProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={svg_className}>
			<path d="M12 9.60002C13.9882 9.60002 15.6 7.98825 15.6 6.00002C15.6 4.0118 13.9882 2.40002 12 2.40002C10.0118 2.40002 8.4 4.0118 8.4 6.00002C8.4 7.98825 10.0118 9.60002 12 9.60002Z" className={path_className} />
			<path d="M4.15821 17.3923C3.92434 18.0019 4.13322 18.6852 4.64904 19.0855C6.67987 20.6617 9.23042 21.6 12.0001 21.6C14.7727 21.6 17.3256 20.6598 19.3574 19.0807C19.873 18.68 20.0814 17.9966 19.8472 17.3871C18.6361 14.2363 15.581 12 12.0037 12C8.42438 12 5.36795 14.2387 4.15821 17.3923Z" className={path_className} />
		</svg>
	);
}

export { UserIcon };