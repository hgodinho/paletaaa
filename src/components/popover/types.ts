import {
    PopoverProps as PrimitiveProps,
    DialogTriggerProps,
} from "react-aria-components";
import { PropsWithChildren, ReactNode } from "react";

export type PopoverBodyProps = PropsWithChildren<
    Omit<PrimitiveProps, "children">
>;

export type PopoverProps = Omit<DialogTriggerProps, "children"> & {
    trigger: ReactNode;
    body: ReactNode;
    bodyProps?: PopoverBodyProps;
};
