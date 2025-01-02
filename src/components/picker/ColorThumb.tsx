import { cn } from "@/lib";
import {
    ColorThumb as Primitive,
    ColorThumbProps,
} from "react-aria-components";

export function ColorThumb({ className, ...props }: ColorThumbProps) {
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

                String(className)
            )}
            {...props}
        />
    );
}
