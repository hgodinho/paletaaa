export type LabelProps<Variant = unknown> =
    React.LabelHTMLAttributes<HTMLLabelElement> & {
        title?: React.ReactNode;
        ref?: React.Ref<HTMLLabelElement>;
    } & Variant;
