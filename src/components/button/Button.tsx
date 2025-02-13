import {
    Button as Primitive,
    ButtonProps as PrimitiveProps,
} from "react-aria-components";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./variant";

export type ButtonProps = PrimitiveProps &
    VariantProps<typeof buttonVariants> & {
        ref?: React.Ref<HTMLButtonElement>;
    };

export function Button({ ref, variant, className, ...props }: ButtonProps) {
    return (
        <Primitive
            ref={ref}
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
