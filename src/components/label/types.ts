import { LabelProps as PrimitiveProps } from "react-aria-components";
export type LabelProps<Variant = unknown> = PrimitiveProps & {
    title?: React.ReactNode;
    ref?: React.Ref<HTMLLabelElement>;
} & Variant;
