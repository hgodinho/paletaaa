import { ChangeEvent, useState } from "react";
import { PickerContext, PickerContextDefault } from "./Context";
import { PickerContextProps, PickerPartsProps } from "./types";
import {
    Color as PrimitiveColor,
    ColorSpace,
    parseColor,
} from "react-aria-components";

export function PickerProvider({
    color,
    onChange,
    children
}: React.PropsWithChildren<PickerContextProps>) {
    const [colorSpace, setColorSpace] = useState<ColorSpace>("hsl");

    const componentsProps: PickerPartsProps = {
        areaProps: {
            xChannel: "saturation",
            yChannel: "lightness",

            colorSpace: colorSpace,
            value: color.toString("hex"),
            onChange,
        },
        thumbProps: {},
        sliderProps: {
            orientation: "vertical",
            channel: "hue",
            colorSpace: colorSpace,
            value: color.toString("hex"),
            onChange,
        },
        fieldProps: {
            colorSpace: colorSpace,
            value: color.toString("hex"),
            onChange: (c: PrimitiveColor | ChangeEvent<HTMLInputElement> | null) => {
                if (!c) return;
                if ("target" in c) {
                    c = parseColor(c.target.value);
                }
                onChange?.(c.toFormat(colorSpace));
            }
        },
    }

    const value = {
        ...PickerContextDefault,
        colorSpace,

        ...componentsProps,
    };

    return (
        <PickerContext.Provider value={value}>
            {children}
        </PickerContext.Provider>
    );
}
