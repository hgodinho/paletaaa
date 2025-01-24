import { cva, VariantProps } from "class-variance-authority";
import {
    Input as Primitive,
    type InputProps as PrimitiveProps,
} from "react-aria-components";

const inputVariants = cva([], {
    variants: {
        inputType: {
            default: [
                "border",
                "border-gray-400",
                "placeholder:text-gray-400",
                "rounded-sm",
                "font-sans",
                "w-full",

                "border",
                "bg-transparent",
                "shadow-sm",
                "transition-colors",
                "placeholder:text-muted-foreground",
                "focus-visible:outline-none",
                "ring-gray-400",
                "focus-visible:ring-2",
                "focus-visible:ring-ring",
                "disabled:cursor-not-allowed",
                "disabled:opacity-50",
            ],
            invisible: ["invisible", "absolute"],
        },
        size: {
            fit: ["text-sm"],
            small: ["p-2", "text-sm"],
            medium: ["p-3"],
            large: ["p-4"],
        },
    },
    defaultVariants: {
        inputType: "default",
        size: "medium",
    },
    compoundVariants: [
        {
            inputType: "invisible",
            size: "medium",
            className: ["!p-0"],
        },
    ],
});

export type InputProps = Omit<PrimitiveProps, "size"> &
    VariantProps<typeof inputVariants> & {
        ref?: React.RefObject<HTMLInputElement>;
    };

export function Input({ className, size, inputType, ...props }: InputProps) {
    return (
        <Primitive
            className={inputVariants({ size, inputType, className })}
            {...props}
        />
    );
}
