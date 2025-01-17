import { createContext, useContext } from "react";
import { PickerContextCallbacks, PickerContextType } from "./types";
import { parseColor } from "react-aria-components";

export const PickerContextDefault: PickerContextType & PickerContextCallbacks =
{
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

export const PickerContext = createContext<
    PickerContextType & PickerContextCallbacks
>(PickerContextDefault);

export function usePickerContext() {
    return useContext(PickerContext);
}
