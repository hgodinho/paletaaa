import { cn } from "@/lib";
import { SelectProps } from "./types";

import * as Primitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ColorSwatch } from "../picker";

export function Select({
    options,
    className,
    placeholder,
    onChange,
    style,
    ...props
}: SelectProps<Primitive.SelectProps>) {
    return (
        <Primitive.Root {...props} onValueChange={onChange}>
            <Primitive.Trigger
                className={cn(
                    "flex",
                    "items-center",
                    "justify-between",
                    "whitespace-nowrap",
                    "rounded-sm",
                    "border",
                    "border-gray-800",
                    "text-sm",
                    "p-2",
                    "placeholder:text-muted-gray-500",
                    "focus:outline-none",
                    "focus:ring-1",
                    "focus:ring-ring",
                    "disabled:cursor-not-allowed",
                    "disabled:opacity-50",
                    "[&>span]:line-clamp-1",
                    className
                )}
                style={style}
            >
                <Primitive.Value placeholder={placeholder} />
                <Primitive.Icon asChild>
                    <ChevronDown size={16} />
                </Primitive.Icon>
            </Primitive.Trigger>
            <Primitive.Portal>
                <Primitive.Content
                    position="popper"
                    className={cn(
                        "relative",
                        "z-50",
                        "max-h-64",
                        "min-w-[8rem]",

                        "overflow-hidden",
                        "rounded-sm",
                        "border",

                        "border-gray-800",
                        "bg-white",
                        "text-black",

                        "data-[state=open]:animate-in",
                        "data-[state=closed]:animate-out",
                        "data-[state=closed]:fade-out-0",
                        "data-[state=open]:fade-in-0",
                        "data-[state=closed]:zoom-out-95",
                        "data-[state=open]:zoom-in-95",
                        "data-[side=bottom]:slide-in-from-top-2",
                        "data-[side=left]:slide-in-from-right-2",
                        "data-[side=right]:slide-in-from-left-2",
                        "data-[side=top]:slide-in-from-bottom-2",
                        "data-[side=bottom]:translate-y-1",
                        "data-[side=left]:-translate-x-1",
                        "data-[side=right]:translate-x-1",
                        "data-[side=top]:-translate-y-1"
                    )}
                >
                    <Primitive.ScrollUpButton
                        className={cn("w-full", "flex", "items-center")}
                    >
                        <ChevronUp size={16} />
                    </Primitive.ScrollUpButton>
                    <Primitive.Viewport
                        className={cn(
                            "p-2",
                            "h-[var(--radix-select-trigger-height)]",
                            "min-w-[var(--radix-select-trigger-width)]"
                        )}
                    >
                        {options?.map(({ value, label, color }) => {
                            return (
                                <Primitive.Item
                                    key={value}
                                    value={value}
                                    className={cn(
                                        "flex",
                                        "gap-2",
                                        "w-full",
                                        "cursor-pointer",
                                        "select-none",
                                        "items-center",
                                        "rounded-sm",
                                        "p-1",
                                        "text-sm",
                                        "outline-none",
                                        "focus:border",
                                        "focus:border-gray-800",
                                        "data-[disabled]:pointer-events-none",
                                        "data-[disabled]:opacity-50"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "flex",
                                            "h-2",
                                            "w-2",
                                            "items-center",
                                            "justify-center",
                                            "ml-2"
                                        )}
                                    >
                                        <Primitive.ItemIndicator>
                                            <Check size={16} />
                                        </Primitive.ItemIndicator>
                                    </span>
                                    {color && <ColorSwatch color={color} />}
                                    <Primitive.ItemText>
                                        {label || value}
                                    </Primitive.ItemText>
                                </Primitive.Item>
                            );
                        })}
                    </Primitive.Viewport>
                    <Primitive.ScrollDownButton>
                        <ChevronDown size={16} />
                    </Primitive.ScrollDownButton>
                </Primitive.Content>
            </Primitive.Portal>
        </Primitive.Root>
    );
}
