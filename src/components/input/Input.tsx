import { cva, VariantProps } from "class-variance-authority";
import {
    Input as Primitive,
    InputProps as PrimitiveProps,
} from "react-aria-components";

const inputVariants = cva(["bg-gray-300/70", "placeholder:text-gray-800"], {
    variants: {
        size: {
            small: ["p-2", "text-sm"],
            medium: ["p-3"],
            large: ["p-4"],
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

export type InputProps<Variant = unknown> = Variant & PrimitiveProps;

export function Input({
    size,
    className,
    ...props
}: InputProps<VariantProps<typeof inputVariants>>) {
    return (
        <Primitive className={inputVariants({ size, className })} {...props} />
    );
}
