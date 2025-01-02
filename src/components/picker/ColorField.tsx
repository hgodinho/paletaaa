import {
    ColorField as Primitive,
    ColorFieldProps as PrimitiveType,
} from "react-aria-components";

import { Label, Input, ColorType } from "@/components";
import { usePaletteContext } from "@/context";
import { cn } from "@/lib";

export type ColorFieldProps = PrimitiveType & {
    label?: PrimitiveType["channel"];
    bg?: ColorType;
};

export function ColorField({ label, bg, ...props }: ColorFieldProps) {
    const { backgroundContrast } = usePaletteContext();

    return (
        <Primitive channel={label} {...props}>
            <Label
                htmlFor="background"
                size={"small"}
                title={label || "hex"}
                className={cn(`text-${backgroundContrast}`)}
            >
                <Input
                    id="background"
                    size={"small"}
                    aria-label={label}
                    className={cn("w-full", "text-black")}
                />
            </Label>
        </Primitive>
    );
}
