import { usePaletteContext } from "@/context";
import { cn } from "@/lib";
import { Colors } from "../colors";

export function Preview() {
    const { background } = usePaletteContext();
    return (
        <div
            className={cn("h-screen")}
            style={{
                backgroundColor: background?.value,
            }}
        >
            <Colors />
        </div>
    );
}
