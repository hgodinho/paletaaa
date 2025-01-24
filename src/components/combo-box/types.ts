import type {
    ListBoxItemProps,
    ComboBoxProps as PrimitiveType,
} from "react-aria-components";
import { ButtonProps } from "../button";

export type ComboBoxProps<T extends object> = Omit<
    PrimitiveType<T>,
    "children"
> & {
    ref?: React.RefObject<HTMLDivElement | null>;
    label?: string;
    description?: string;
    children: React.ReactNode | ((item: T) => React.ReactNode);
    buttonProps: ButtonProps;

    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
};

export type ComboBoxItemProps = ListBoxItemProps;
