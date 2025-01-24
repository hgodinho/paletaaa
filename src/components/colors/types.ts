import { Color } from "@/context";
import { ButtonProps } from "../button";

export type ColorProps = {
    onChange?: (value: Color) => void;
    onDelete?: () => void;
    color: Color;
};

export type ColorType = {
    title: string;
    value: string;
};

export type AddButtonProps = ButtonProps;
