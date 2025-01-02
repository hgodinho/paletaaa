import { PickerProps } from "./types";
import { cn } from "@/lib";
import {
    ColorArea,
    ColorSlider,
    ColorField,
    Validator,
    Label,
} from "@/components";
import { parseColor } from "react-aria-components";
import { useEffect, useState } from "react";
import { usePaletteContext } from "@/context";

export function Picker({
    color: stateColor,
    title,
    background,
    valid,
    variant = "full",
    onChange,
}: PickerProps) {
    let { backgroundContrast } = usePaletteContext();

    let [color, setColor] = useState(parseColor("hsl(0, 100%, 50%)"));
    let hue = color.getChannelValue("hue");

    useEffect(() => {
        onChange?.(color.toString("hex"));
    }, [color]);

    return (
        <Label
            title={title}
            className={cn("w-full", "flex", "flex-col", "gap-2")}
        >
            <div
                className={cn(
                    "text-sm",
                    "flex",
                    "justify-between",
                    `text-${backgroundContrast}`
                )}
            >
                <span>matiz</span>
                <span>saturação/luminosidade</span>
            </div>
            <div className={cn("flex", "flex-row", "gap-2", "aspect-video")}>
                <ColorSlider
                    defaultValue="hsl(30, 100%, 50%)"
                    channel="hue"
                    orientation="vertical"
                    onChange={setColor}
                    value={color}
                />
                <ColorArea
                    value={color}
                    onChange={setColor}
                    xChannel="saturation"
                    yChannel="lightness"
                    className={cn("w-full")}
                />
            </div>
            <div
                className={cn(
                    "text-sm",
                    "flex",
                    "justify-between",
                    `text-${backgroundContrast}`
                )}
            >
                <span>{hue}°</span>
                <span>
                    {color.getChannelValue("saturation")}%/
                    {color.getChannelValue("lightness")}%
                </span>
            </div>
            <ColorField
                value={color}
                onChange={(color) =>
                    color && setColor(parseColor(color.toString("hex")))
                }
                bg={background}
            />

            {variant === "full" && (
                <>
                    <div
                        className={cn(
                            "flex",
                            // "flex-col",
                            "gap-2",
                            "w-32",
                            "p-2"
                        )}
                        style={{
                            backgroundColor: background?.value,
                        }}
                    >
                        {valid && stateColor && background && (
                            <Validator
                                valid={valid}
                                color={stateColor}
                                background={background}
                            />
                        )}
                    </div>
                    <div
                        className={cn("flex", "flex-col", "w-32")}
                        style={{
                            backgroundColor: stateColor?.value,
                        }}
                    ></div>
                </>
            )}
        </Label>
    );
}
