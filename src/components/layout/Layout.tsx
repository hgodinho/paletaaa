import { GraphProvider, OptionsProvider, PaletteProvider } from "@/context";
import { cn } from "@/lib";
import { Editor, Menu /*Preview*/ } from "@/components";

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
                        <Editor />
                        {/* <Preview />
                    // to be further implemented
                */}
                    </main>
                </OptionsProvider>
            </PaletteProvider>
        </GraphProvider>
    );
}
