import { cn } from "@/lib";
import {
    ColorArea as PrimitiveColorArea,
    ColorAreaProps,
} from "react-aria-components";
import { ColorThumb } from "./ColorThumb";

export function ColorArea({ className, ...props }: ColorAreaProps) {
    return (
        <PrimitiveColorArea
            className={cn("w-48", "h-48", String(className))}
            {...props}
        >
            <ColorThumb />
        </PrimitiveColorArea>
    );
}
