import {
    Color,
    ColorAreaProps,
    ColorSliderProps,
    ColorSpace,
    ColorThumbProps,
} from "react-aria-components";
import { ColorFieldProps } from "./ColorField";

export type ValidProperty = {
    valid: boolean;
    ratio: number;
};

export type WCAGCompliance = {
    "16pt": ValidProperty;
    "22pt": ValidProperty;
    large: ValidProperty;
};

export type Valid = {
    AAA: WCAGCompliance;
    AA: WCAGCompliance;
};

export type PickerColors = {
    color: Color;
};

export type PickerProps = PickerColors &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "color"> & {
        valid?: Valid;
        title?: string;
        colorSpace: ColorSpace;
        onChange?: (color: Color) => void;
    };

export type PickerContextProps = PickerProps;

export type PickerPartsProps = {
    areaProps: ColorAreaProps;
    thumbProps: ColorThumbProps;
    sliderProps: ColorSliderProps;
    fieldProps: ColorFieldProps;
};

export type PickerContextType = PickerProps &
    PickerPartsProps & {
        setColor: (color: Color) => void;
    };

export type ColorSwatchPickerProps<T, ColorType> = {
    colors?: ColorType[];
    color?: Color;
    onChange?: (color: Color) => void;
} & T;
