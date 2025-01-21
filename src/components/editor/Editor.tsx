import { cn } from "@/lib";
import { usePaletteContext } from "@/context";
import { ColorGraph } from "@/components";

export function Editor() {
    const { contrastColor, getBackgroundHex } = usePaletteContext();

    return (
        <div
            className={cn("editor", "w-full", "h-full", "border-r", "relative")}
            style={{
                backgroundColor: getBackgroundHex() || "#fff",
                borderColor: contrastColor(
                    "#fff",
                    getBackgroundHex() || "#fff"
                ),
            }}
        >
            <ColorGraph />
        </div>
    );
}
