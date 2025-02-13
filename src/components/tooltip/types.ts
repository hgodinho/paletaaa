import { TooltipProps as PrimitiveProps } from "react-aria-components";

export type TooltipProps = {
    trigger: React.ReactNode;
} & React.PropsWithChildren<Omit<PrimitiveProps, "children">>;
