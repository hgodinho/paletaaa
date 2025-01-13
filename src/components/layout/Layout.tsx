import { PaletteProvider } from "@/context";
import { cn } from "@/lib";
import { Editor, Logo, Menu, Preview } from "@/components";

export function Layout() {
    return (
        <PaletteProvider>
            <div className={cn("h-screen", "flex", "flex-row")}>
                <Menu />
                <Editor />
                <Preview />
                <Logo className={cn("fixed", "bottom-6", "left-6")} />
            </div>
        </PaletteProvider>
    );
}
