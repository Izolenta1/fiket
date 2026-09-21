import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classes: ClassValue[]) {
	return twMerge(clsx(classes));
}

export function mergeObjectClassNames<T extends Record<string, string>>(defaultClasses: T, userClasses?: Partial<T>) {
	return (key: keyof T) => cn(defaultClasses[key], userClasses?.[key]);
}
