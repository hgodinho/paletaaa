import { LabelProps } from "./types";
import { VariantProps } from "class-variance-authority";
import { labelVariants } from "./variants";
import { Label as Primitive } from "react-aria-components";

export function Label({
    ref,
    className,
    title,
    children,
    size,
    ...props
}: LabelProps<VariantProps<typeof labelVariants>>) {
    return (
        <Primitive
            ref={ref}
            className={labelVariants({ className, size })}
            {...props}
        >
            {title && <span>{title}</span>}
            {children}
        </Primitive>
    );
}
