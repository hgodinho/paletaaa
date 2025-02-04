import { GraphProvider, OptionsProvider, PaletteProvider } from "@/context";
import { cn } from "@/lib";
import { ColorGraph, Menu /*Preview*/ } from "@/components";

export function Layout() {
    return (
        <GraphProvider>
            <PaletteProvider>
                <OptionsProvider>
                    <main
                        className={cn(
                            "h-screen",
                            "w-screen",
                            "flex",
                            "flex-row"
                        )}
                    >
                        <Menu />
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
