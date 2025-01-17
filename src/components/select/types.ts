import { OptionHTMLAttributes, SelectHTMLAttributes } from "react";

export type OptionsProps = Omit<
    OptionHTMLAttributes<HTMLOptionElement>,
    "value" | "label"
> & {
    value: string;
    label?: string;
    color?: string;
};

export type SelectProps<T = unknown> = Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "onChange"
> & {
    options?: OptionsProps[];
    placeholder?: string;
    onChange?: (value: string) => void;
} & T;
