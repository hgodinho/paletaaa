export type ColorProps = {
    onChange?: (value: ColorType) => void;
    onDelete?: () => void;
    color?: ColorType;
};

export type ColorType = {
    title: string;
    value: string;
};
