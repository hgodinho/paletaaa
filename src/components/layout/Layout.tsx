import { GraphProvider, OptionsProvider, PaletteProvider } from "@/context";
import { cn } from "@/lib";
import { ColorGraph, Menu, Sidebar /*Preview*/ } from "@/components";

export function Layout() {
    return (
        <GraphProvider>
            <PaletteProvider>
                <OptionsProvider>
                    <main
                        className={cn("h-full", "w-full", "flex", "flex-row")}
                    >
                        <Sidebar>
                            <Menu />
                        </Sidebar>
                        <ColorGraph />
                        {/* <Preview />
                            // to be further implemented
                        */}
                    </main>
                </OptionsProvider>
            </PaletteProvider>
        </GraphProvider>
    );
}
