import { PickerProps } from "./types";
import { cn } from "@/lib";
import { ColorArea, ColorSlider, ColorField, Label } from "@/components";
import { usePaletteContext } from "@/context";
import { PickerProvider } from "./Provider";

export function Picker({ color, title, onChange }: PickerProps) {
    const { colorSpace } = usePaletteContext();

    return (
        <PickerProvider
            color={color}
            onChange={onChange}
            colorSpace={colorSpace}
        >
            <Label title={title} className={cn("w-full")}>
                <div className={cn("w-full", "flex", "flex-col", "gap-2")}>
                    <div className={cn("flex", "gap-2")}>
                        <ColorSlider />
                        <ColorArea />
                    </div>

                    <ColorField
                        colorSpace={colorSpace}
                        label="hex"
                        size={"small"}
                    />
                </div>
            </Label>
        </PickerProvider>
    );
}
