import * as Primitive from "@radix-ui/react-scroll-area";
import { PropsWithChildren } from "react";
import { ScrollProps } from "./types";
import { cn } from "@/lib";

export function Scroll({
    className,
    children,
}: PropsWithChildren<ScrollProps>) {
    return (
        <Primitive.Root
            type="always"
            className={cn("overflow-hidden", "h-full", className)}
        >
            <Primitive.Viewport
                className={cn(
                    "w-full",
                    "h-full",
                    "snap-y",
                    "pr-5",
                    "snap-proximity",
                    "scroll-smooth"
                )}
            >
                {children}
            </Primitive.Viewport>
            <Primitive.Scrollbar
                className={cn("border", "border-gray-800", "w-3")}
                orientation="vertical"
            >
                <Primitive.Thumb className={cn("bg-gray-300")} />
            </Primitive.Scrollbar>
        </Primitive.Root>
    );
}
