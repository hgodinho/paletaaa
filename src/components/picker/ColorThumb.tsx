import { cn } from "@/lib";
import {
    ColorThumb as Primitive,
    ColorThumbProps,
} from "react-aria-components";
import { usePickerContext } from "./Context";

export function ColorThumb({ className, ...props }: ColorThumbProps) {
    const { thumbProps } = usePickerContext();
    return (
        <Primitive
            className={cn(
                "w-3",
                "h-3",
                "rounded-full",

                "border",
                "border-black",

                "ring-1",
                "ring-black",

                "ring-offset-2",
                "ring-offset-white",

                "focus-within:ring-2",
                "focus-within:ring-black",

                String(className)
            )}
            {...thumbProps}
            {...props}
        />
    );
}
