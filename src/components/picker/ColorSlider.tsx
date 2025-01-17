import {
    ColorSlider as PrimitiveColorSlider,
    ColorSliderProps as PrimitiveProps,
    SliderTrack,
    Label,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import { ClassNameValue } from "tailwind-merge";

import { cn } from "@/lib";
import { labelVariants } from "@/components";

import { ColorThumb } from "./ColorThumb";
import { usePickerContext } from "./Context";
import { ColorField } from "./ColorField";

const wrapperVariant = cva(["flex", "gap-1"], {
    variants: {
        orientation: {
            horizontal: ["flex-row"],
            vertical: ["flex-col", "items-center"],
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});

const colorSliderVariant = cva([], {
    variants: {
        orientation: {
            horizontal: "h-6 w-48",
            vertical: "h-48 w-6",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});

const colorThumbVariant = cva([], {
    variants: {
        orientation: {
            horizontal: "mt-3",
            vertical: ["ml-3"],
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});

export type ColorSliderProps = Partial<PrimitiveProps> & {
    thumbClassName?: ClassNameValue[];
};

export function ColorSlider({
    className,
    thumbClassName,
    orientation,
    ...props
}: ColorSliderProps) {
    const { sliderProps, color } = usePickerContext();

    return (
        <PrimitiveColorSlider
            orientation={sliderProps.orientation || orientation}
            className={wrapperVariant({
                orientation: sliderProps.orientation || orientation,
            })}
            {...sliderProps}
            {...props}
        >
            <Label
                className={labelVariants({ size: "fit", className: ["h-6"] })}
            >
                {color.getChannelName("hue", "en")}
            </Label>
            <SliderTrack
                className={colorSliderVariant({
                    orientation: sliderProps.orientation || orientation,
                    className,
                })}
            >
                <ColorThumb
                    className={colorThumbVariant({
                        orientation: sliderProps.orientation || orientation,
                        className: thumbClassName,
                    })}
                />
            </SliderTrack>
            <ColorField size={"fit"} channel="hue" className={cn("w-12")} />
        </PrimitiveColorSlider>
    );
}
