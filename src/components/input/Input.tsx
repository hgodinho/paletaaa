import { VariantProps } from "class-variance-authority";
import {
    Input as Primitive,
    type InputProps as PrimitiveProps,
} from "react-aria-components";
import { inputVariants } from "./variant";

export type InputProps = Omit<PrimitiveProps, "size"> &
    VariantProps<typeof inputVariants> & {
        ref?: React.RefObject<HTMLInputElement>;
    };

export function Input({
    className,
    size,
    inputType,
    type,
    ...props
}: InputProps) {
    return (
        <Primitive
            className={inputVariants({ size, inputType, type, className })}
            type={type}
            {...props}
        />
    );
}
