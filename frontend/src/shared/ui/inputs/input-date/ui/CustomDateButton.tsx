import clsx from "clsx";
import { CalendarIcon } from "@/shared/ui/icons";
import { motion } from "framer-motion";

const CustomDateButton = ({ value, onClick, placeholder, error, additionalText }: CustomDateButtonProps) => {
	return (
		<div
		className={clsx(
		"w-full flex flex-col gap-[1.1vw]",
		"bp700px:gap-[0.57vw]",
		"bp1200px:gap-[4px]"
		)}
		>
			<button
			onClick={onClick}
			className={clsx(
			"hover:cursor-pointer",
			"flex w-full"
			)}
			type="button"
			>
				<div
				className={clsx(
				"flex items-center justify-start grow",
				"select-none transition-colors duration-400 w-full",
				"bg-surface_body rounded-l-[3.3vw] border-y-[0.27vw] border-l-[0.27vw]",
				"py-[3.3vw] pl-[3.3vw]",
				"input_regular",
				"bp700px:border-y-[0.14vw] bp700px:border-l-[0.14vw] bp700px:py-[1.71vw] bp700px:pl-[1.71vw] bp700px:rounded-l-[1.71vw]",
				"bp1200px:border-y-[1px] bp1200px:border-l-[1px] bp1200px:py-[12px] bp1200px:pl-[12px] bp1200px:rounded-l-[12px]",
				error ? "border-texticon_base_warning" : "border-transparent",
				value ? "text-texticon_base_header" : "text-texticon_base_default"
				)}
				>{value || placeholder}</div>
				
				<div
				className={clsx(
				"transition-colors duration-400",
				"p-[3.3vw]",
				"bg-surface_body rounded-r-[3.3vw] border-y-[0.27vw] border-r-[0.27vw]",
				"bp700px:p-[1.71vw] bp700px:rounded-r-[1.71vw] bp700px:border-y-[0.14vw] bp700px:border-r-[0.14vw]",
				"bp1200px:p-[12px] bp1200px:rounded-r-[12px] bp1200px:border-y-[1px] bp1200px:border-r-[1px]",
				error ? "border-texticon_base_warning" : "border-transparent"
				)}
				>
					<CalendarIcon
					svg_className={clsx(
					"w-[4.4vw] h-[4.4vw]",
					"bp700px:w-[2.86vw] bp700px:h-[2.86vw]",
					"bp1200px:w-[24px] bp1200px:h-[24px]"
					)}
					path_className={clsx(
					"fill-texticon_base_unactive"
					)}
					/>
				</div>
			</button>

			{additionalText &&
            <span
            className={clsx(
            "select-none",
            "px-[3.3vw]",
            "caption_regular text-texticon_base_default",
            "bp700px:px-[1.71vw]",
            "bp1200px:px-[12px]"
            )}>{additionalText}</span>
            }

            {error &&
            <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 500, damping: 30 }}
            className={clsx(
            "will-change-transform",
            "w-fit",
            "px-[3.3vw]",
            "caption_regular text-texticon_base_warning",
            "bp700px:px-[1.71vw]",
            "bp1200px:px-[12px]"
            )}>{error}</motion.span>
            }
		</div>
	);
};

export { CustomDateButton };

type CustomDateButtonProps = {
	value?: string;
	onClick?: () => void;
	placeholder?: string;
	error?: string,
	additionalText?: string;
};