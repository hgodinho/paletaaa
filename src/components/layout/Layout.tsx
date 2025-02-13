import { AppProvider, PaletteProvider, ToolsProvider } from "@/context";
import { cn } from "@/lib";
import { ColorGraph, Menu, Sidebar /*Preview*/ } from "@/components";
import { BrowserRouter } from "react-router";

export function Layout() {
    return (
        <BrowserRouter>
            <AppProvider>
                <PaletteProvider>
                    <ToolsProvider>
                        <main
                            className={cn(
                                "h-full",
                                "w-full",
                                "flex",
                                "flex-row"
                            )}
                        >
                            <Sidebar>
                                <Menu />
                            </Sidebar>
                            <ColorGraph />
                            {/* <Preview />
                                // to be further implemented
                            */}
                        </main>
                    </ToolsProvider>
                </PaletteProvider>
            </AppProvider>
        </BrowserRouter>
    );
}
