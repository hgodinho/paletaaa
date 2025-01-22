import {
    ColorSwatchPickerProps as PrimitiveType,
    ColorSwatchPicker as Primitive,
    ColorSwatchPickerItem,
    Color,
} from "react-aria-components";
import { ColorSwatch } from "./ColorSwatch";
import { ColorSwatchPickerProps } from "./types";
import { cn } from "@/lib";
import { useState } from "react";
import { usePaletteContext } from "@/context";

export function ColorSwatchPicker({
    className,
    colors,
    onChange,
    ...props
}: ColorSwatchPickerProps<PrimitiveType, string>) {
    const { contrastColor } = usePaletteContext();

    const [color, setColor] = useState(props.color);

    const onColorChange = (color: Color) => {
        setColor(color);
        onChange?.(color);
    };

    return (
        <Primitive
            className={cn(
                "grid",
                "gap-2",
                "grid-cols-6",
                "grid-rows-auto",
                "w-fit",
                String(className)
            )}
            {...props}
            value={color}
            onChange={onColorChange}
        >
            {colors?.map((c) => (
                <ColorSwatchPickerItem
                    key={c}
                    className={cn("cursor-pointer")}
                    color={c}
                >
                    <ColorSwatch
                        size={"medium"}
                        style={{
                            borderColor: contrastColor(
                                color?.toString("hex") || "¨#000",
                                "#fff"
                            ),
                        }}
                    />
                </ColorSwatchPickerItem>
            ))}
        </Primitive>
    );
}
