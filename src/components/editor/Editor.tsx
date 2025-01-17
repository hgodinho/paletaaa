import { cn } from "@/lib";
import { usePaletteContext } from "@/context";
import { ColorGraph } from "@/components";

export function Editor() {
    const { contrastColor, getNode } = usePaletteContext();

    return (
        <div
            className={cn("editor", "w-full", "h-full", "border-r")}
            style={{
                backgroundColor:
                    getNode("background")?.color.data.toString("hex"),
                borderColor: contrastColor(
                    "#fff",
                    getNode("background")?.color.data.toString("hex")
                ),
            }}
        >
            <ColorGraph />
        </div>
    );
}
