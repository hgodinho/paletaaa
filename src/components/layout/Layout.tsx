import { PaletteProvider } from "@/context";
import { cn } from "@/lib";
import { Editor, Menu, Preview } from "@/components";

export function Layout() {
    return (
        <PaletteProvider>
            <div className={cn("h-screen", "flex", "flex-row")}>
                <Menu />
                <Editor />
                {/* <Preview />
                    // to be further implemented
                */}
            </div>
        </PaletteProvider>
    );
}
