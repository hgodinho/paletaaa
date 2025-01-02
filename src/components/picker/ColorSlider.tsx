import {
    ColorSlider as PrimitiveColorSlider,
    ColorSliderProps as PrimitiveProps,
    SliderTrack,
} from "react-aria-components";
import { ColorThumb } from "./ColorThumb";
import { cva } from "class-variance-authority";
import { ClassNameValue } from "tailwind-merge";

const colorSliderVariant = cva([], {
    variants: {
        orientation: {
            horizontal: "h-48 w-48",
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
            vertical: "ml-3",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});

export type ColorSliderProps = PrimitiveProps & {
    thumbClassName?: ClassNameValue[];
};

export function ColorSlider({
    className,
    thumbClassName,
    ...props
}: ColorSliderProps) {
    return (
        <PrimitiveColorSlider {...props}>
            <SliderTrack
                className={colorSliderVariant({
                    orientation: props.orientation,
                    className,
                })}
            >
                <ColorThumb
                    className={colorThumbVariant({
                        orientation: props.orientation,
                        className: thumbClassName,
                    })}
                />
            </SliderTrack>
        </PrimitiveColorSlider>
    );
}
