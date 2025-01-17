import { Color } from "@/context";

export type ColorProps = {
    onChange?: (value: Color) => void;
    onDelete?: () => void;
    color: Color;
};

export type ColorType = {
    title: string;
    value: string;
};

export type AddButtonProps = React.HTMLAttributes<HTMLButtonElement>;
