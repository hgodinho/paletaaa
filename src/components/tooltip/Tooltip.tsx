import {
    Tooltip as Primitive,
    TooltipTrigger,
    OverlayArrow,
} from "react-aria-components";
import { TooltipProps } from "./types";
import { cn } from "@/lib";

export function Tooltip({
    trigger,
    children,
    className,
    ...props
}: TooltipProps) {
    return (
        <TooltipTrigger delay={500} closeDelay={0}>
            {trigger()}
            <Primitive
                className={(values) =>
                    cn(
                        typeof className === "string"
                            ? className
                            : className?.(values)
                    )
                }
                {...props}
            >
                <OverlayArrow>
                    <svg width={8} height={8} viewBox="0 0 8 8">
                        <path d="M0 0 L4 4 L8 0" />
                    </svg>
                </OverlayArrow>
                {children}
            </Primitive>
        </TooltipTrigger>
    );
}
