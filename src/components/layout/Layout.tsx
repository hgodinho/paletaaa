import { PaletteProvider } from "@/context";
import { cn } from "@/lib";
import { LayoutProps } from "./types";

export function Layout({ editor, preview }: LayoutProps) {
    return (
        <PaletteProvider>
            <div className={cn("flex", "flex-col", "lg:flex-row", "h-screen")}>
                <div
                    className={cn(
                        "h-2/5",
                        "w-screen",

                        "lg:w-[22%]",
                        "lg:h-screen",

                        "bg-gray-300"
                    )}
                >
                    {editor}
                </div>
                <div
                    className={cn(
                        "h-3/5",
                        "w-screen",

                        "lg:w-[1fr]",
                        "lg:h-screen"
                    )}
                >
                    {preview}
                </div>
            </div>
        </PaletteProvider>
    );
}
