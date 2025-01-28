import {
    NumberField,
    type NumberFieldProps,
    Group,
} from "react-aria-components";

import { VariantProps } from "class-variance-authority";

import { Button, Input } from "@/components";

import { inputVariants } from "./variant";
import { cn } from "@/lib";
import { Minus, Plus } from "lucide-react";

export type NumberInputProps = VariantProps<typeof inputVariants> &
    NumberFieldProps & {
        displayControls?: boolean;
    };

export function NumberInput({
    className,
    inputType,
    size,
    style,
    displayControls,
    ...props
}: NumberInputProps) {
    return (
        <NumberField
            className={cn("h-full", "w-full", String(className))}
            {...props}
        >
            <Group
                className={cn(
                    "flex",
                    "items-center",
                    "justify-center",
                    "gap-1"
                )}
            >
                <Input
                    inputType={inputType}
                    size={size}
                    className={cn("duration-0", "text-xs", "px-1", "py-0")}
                    style={{ ...style }}
                />
                <div
                    className={cn(
                        "flex",
                        "flex-col",
                        "gap-1",
                        "h-fit",
                        !displayControls ? "hidden" : "block"
                    )}
                >
                    <Button
                        variant={"none"}
                        slot={"decrement"}
                        className={cn("h-2")}
                    >
                        <Minus size={8} />
                    </Button>
                    <Button
                        variant={"none"}
                        slot={"increment"}
                        className={cn("h-2")}
                    >
                        <Plus size={8} />
                    </Button>
                </div>
            </Group>
        </NumberField>
    );
}
