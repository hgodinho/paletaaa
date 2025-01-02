import { ColorType } from "@/components";

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

export type PickerProps = {
    color?: ColorType;
    background?: ColorType;
    valid?: Valid;
    variant?: "compact" | "full";
    title?: string;
    onChange?: (color: string) => void;
};
