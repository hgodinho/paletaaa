import { PickerProps } from "./types";
import { cn } from "@/lib";
import {
    ColorArea,
    ColorSlider,
    ColorField,
    Label,
} from "@/components";
import { usePaletteContext } from "@/context";
import { PickerProvider } from "./Provider";

export function Picker({ color, title, onChange }: PickerProps) {
    let { colorSpace } = usePaletteContext();

    return (
        <PickerProvider
            color={color}
            onChange={onChange}
            colorSpace={colorSpace}
        >
            <Label title={title} className={cn("w-full")}>
                <div className={cn("w-full", "flex", "flex-col", "gap-2", "p")}>
                    <div className={cn("flex", "flex-col", "w-full")}>
                        <div className={cn("flex", "flex-row", "w-full", "gap-2")}>
                            <ColorSlider />
                            <ColorArea />
                        </div>
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
