import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./variant";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
    variant,
    className,
    ...props
}: ButtonProps & VariantProps<typeof buttonVariants>) {
    return (
        <button className={buttonVariants({ variant, className })} {...props} />
    );
}
