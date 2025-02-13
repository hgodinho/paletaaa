import {
    Popover as Primitive,
    Dialog,
    DialogTrigger,
    OverlayArrow,
} from "react-aria-components";
import { PopoverBodyProps, PopoverProps } from "./types";
import { cn } from "@/lib";

export function PopoverBody({
    className,
    children,
    ...props
}: PopoverBodyProps) {
    return (
        <Primitive
            className={(values) => {
                return cn(
                    typeof className === "string"
                        ? className
                        : className?.(values)
                );
            }}
            offset={12}
            {...props}
        >
            <OverlayArrow>
                <svg width={12} height={12} viewBox="0 0 12 12">
                    <path d="M0 0 L6 6 L12 0" />
                </svg>
            </OverlayArrow>
            <Dialog className={cn("p-2")}>{children}</Dialog>
        </Primitive>
    );
}

export function Popover({ trigger, body, bodyProps, ...props }: PopoverProps) {
    return (
        <DialogTrigger {...props}>
            {trigger}
            <PopoverBody {...bodyProps}>{body}</PopoverBody>
        </DialogTrigger>
    );
}
