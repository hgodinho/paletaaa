import {
    ComboBox as Primitive,
    ListBox,
    Popover,
    parseColor,
} from "react-aria-components";
import { PaintBucket } from "lucide-react";
import { Input, Button, ComboBoxItem, ColorSwatch, Scroll } from "@/components";
import { ComboBoxProps } from "./types";
import { cn } from "@/lib";
import { usePaletteContext } from "@/context";

export function ColorComboBox<T extends object>({
    ref,
    children,
    buttonProps: { className: buttonClassName, ...buttonProps },
    isOpen,
    onOpenChange,
    ...props
}: ComboBoxProps<T>) {
    const { contrastColor, getBackgroundHex } = usePaletteContext();

    return (
        <Primitive className={cn("w-fit")} {...props}>
            <Input inputType="invisible" />
            <Button
                variant={"none"}
                className={cn(
                    "w-full",
                    "h-full",
                    "p-2",
                    "rounded-l-full",
                    String(buttonClassName)
                )}
                {...buttonProps}
            >
                <PaintBucket size={18} />
            </Button>

            <Popover
                ref={ref}
                className={cn(
                    "w-fit",
                    "h-full",
                    "z-10",
                    "mt-4",
                    "z-10",
                    "border",
                    "p-2",
                    "bg-white"
                )}
                maxHeight={256}
                offset={0}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                style={{
                    borderColor: contrastColor(getBackgroundHex(), "#FFF"),
                }}
            >
                <Scroll>
                    <ListBox>
                        <ComboBoxItem textValue="default">
                            <ColorSwatch color={parseColor("#FFF")} />
                            {"default"}
                            <span>{`(#FFF)`}</span>
                        </ComboBoxItem>
                        {typeof children === "function"
                            ? children({} as T)
                            : children}
                    </ListBox>
                </Scroll>
            </Popover>
        </Primitive>
    );
}
