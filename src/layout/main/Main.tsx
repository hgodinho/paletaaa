import { cn } from "@/lib";

import { ColorGraph, Menu /*Preview*/ } from "@/components";

import { Sidebar } from "@/layout";

export function Main() {
    return (
        <main className={cn("h-full", "w-full", "flex", "flex-row")}>
            <Sidebar>
                <Menu />
            </Sidebar>
            <ColorGraph />
            {/* <Preview />
                                // to be further implemented
                            */}
        </main>
    );
}
