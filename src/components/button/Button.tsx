import {
    Button as Primitive,
    ButtonProps as PrimitiveProps,
} from "react-aria-components";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./variant";

export type ButtonProps = PrimitiveProps & VariantProps<typeof buttonVariants>;

export function Button({ variant, className, ...props }: ButtonProps) {
    return (
        <Primitive
            className={(render) =>
                buttonVariants({
                    variant,
                    className:
                        typeof className === "string"
                            ? className
                            : className?.(render),
                })
            }
            {...props}
        />
    );
}
