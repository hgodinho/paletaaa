import { cva, VariantProps } from "class-variance-authority";
import {
    ColorSwatch as Primitive,
    ColorSwatchProps,
} from "react-aria-components";

const colorSwatchVariants = cva(["border", "border-gray-800"], {
    variants: {
        size: {
            small: ["w-4", "h-4"],
            medium: ["w-6", "h-6"],
            large: ["w-8", "h-8"],
        },
    },
    defaultVariants: {
        size: "small",
    },
});

export function ColorSwatch({
    className,
    size,
    style,
    ...props
}: ColorSwatchProps & VariantProps<typeof colorSwatchVariants>) {
    return (
        <Primitive
            className={colorSwatchVariants({ size, className })}
            {...props}
            style={({ color }) => ({
                backgroundColor: color.toString("hex") || "black",
                ...style,
            })}
        />
    );
}
