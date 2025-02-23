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
    children,
}: React.PropsWithChildren<PickerContextProps>) {
    const [colorSpace] = useState<ColorSpace>("hsl");

    const componentsProps: PickerPartsProps = {
        areaProps: {
            xChannel: "saturation",
            yChannel: "lightness",

            colorSpace,
            value: color,

            onChange,
        },
        thumbProps: {},
        sliderProps: {
            orientation: "vertical",
            channel: "hue",

            colorSpace,
            value: color,
            onChange,
        },
        fieldProps: {
            colorSpace,
            value: color,
            onChange: (
                c: PrimitiveColor | ChangeEvent<HTMLInputElement> | null
            ) => {
                if (!c) return;
                if ("target" in c) {
                    c = parseColor(c.target.value);
                }
                onChange?.(c);
            },
        },
    };

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
