import clsx from "clsx";
import { twMerge, ClassNameValue } from "tailwind-merge";

export function cn(...classes: ClassNameValue[]) {
    return clsx(twMerge(...classes));
}

export function getRandomId() {
    return Math.random().toString(36).substring(2, 7);
}
