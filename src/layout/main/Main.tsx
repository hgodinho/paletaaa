import { cn } from "@/lib";

import { Sidebar } from "@/layout";

import { ColorGraph, ColorsLayers } from "@/features";

export function Main() {
    return (
        <main className={cn("h-full", "w-full", "flex", "flex-row")}>
            <Sidebar>
                <ColorsLayers />
            </Sidebar>
            <ColorGraph />
            {/* <Preview />
                // to be further implemented
            */}
        </main>
    );
}
