import { cn } from "@/lib";
import { ColorGraph } from "@/components";

export function Editor() {
    return (
        <div className={cn("editor", "w-full", "h-full", "relative")}>
            <ColorGraph />
        </div>
    );
}
