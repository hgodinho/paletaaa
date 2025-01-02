import { cn } from "@/lib";
import {
    Label,
    Input,
    Textarea,
    ColorType,
    Header,
    Picker,
} from "@/components";
import { PaletteContextType, usePaletteContext } from "@/context";
import { useCallback, useEffect, useState } from "react";
import { parseColor } from "react-aria-components";

export function Editor() {
    const { setPalette, ...palette } = usePaletteContext();

    const handlePaletteName = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPalette((prev: PaletteContextType) => ({
                ...prev,
                name: e.target.value,
            }));
        },
        [setPalette]
    );

    const handleBackgroundColor = useCallback(
        (color: ColorType) => {
            setPalette((prev: PaletteContextType) => ({
                ...prev,
                background: { value: color.value, title: color.title },
            }));
        },
        [setPalette]
    );

    return (
        <div
            className={cn(
                "bg-white",
                "h-full",
                "border-r-4",
                "border-black",
                "overflow-auto"
            )}
        >
            <Header />
            <div className={cn("p-3", "flex", "flex-col", "gap-4")}>
                <Label title={"Palette name"}>
                    <Input
                        type="text"
                        placeholder="Name"
                        value={palette.name}
                        onChange={handlePaletteName}
                    />
                </Label>
                <Picker
                    title="Background"
                    variant="compact"
                    color={palette.background}
                    background={palette.background || { value: "", title: "" }}
                    onChange={(color) =>
                        handleBackgroundColor({ value: color, title: "" })
                    }
                />
                <Label title={"Code"}>
                    <Textarea
                        value={JSON.stringify(palette, null, 4)}
                        language="json"
                    />
                </Label>
            </div>
        </div>
    );
}
