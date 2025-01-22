import { createContext, useContext } from "react";
import { PickerContextType } from "./types";
import { parseColor } from "react-aria-components";

export const PickerContextDefault: PickerContextType = {
    colorSpace: "hsl",
    areaProps: {},
    thumbProps: {},
    sliderProps: {
        channel: "hue",
    },
    fieldProps: {},
    color: parseColor("hsl(50, 85%, 85%)"),

    setColor: () => { },
};

export const PickerContext =
    createContext<PickerContextType>(PickerContextDefault);

export function usePickerContext() {
    return useContext(PickerContext);
}
