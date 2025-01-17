import { cva, VariantProps } from "class-variance-authority";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const buttonVariants = cva(
    ["disabled:opacity-50", "disabled:cursor-not-allowed"],
    {
        variants: {
            variant: {
                default: ["bg-black", "text-white", "p-4"],
                menu: ["p-2", "w-full", "h-full"],
                icon: [
                    "p-2",
                    "rounded-full",
                    "hover:bg-gray-200",
                    "aria-disabled:opacity-50",
                    "aria-disabled:cursor-not-allowed",
                ],
                square: [
                    "p-2",
                    "border",
                    "rounded-sm",
                    "border",
                    "border-gray-400",
                    "hover:bg-gray-200",
                ],
                trigger: [
                    "p-3",
                    "fixed",
                    "rounded-full",
                    "z-20",
                    "duration-300",
                    "hover:p-4"
                ],
                none: [],
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export function Button({
    variant,
    className,
    ...props
}: ButtonProps & VariantProps<typeof buttonVariants>) {
    return (
        <button className={buttonVariants({ variant, className })} {...props} />
    );
}
