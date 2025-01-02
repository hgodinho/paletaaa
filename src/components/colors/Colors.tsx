import { usePaletteContext } from "@/context";
import { cn } from "@/lib";
import { Color } from "./Color";

export function Colors() {
    const { colors, pushColor, editColor, deleteColor } = usePaletteContext();

    return (
        <div
            className={cn(
                "flex",
                "flex-col",
                "gap-4",
                "h-full",
                "justify-between",
                "overflow-auto"
            )}
        >
            <div
                className={cn(
                    "colors",
                    "m-5",
                    "grid",
                    "lg:grid-cols-3",
                    "gap-10",
                    "items-center",
                    "justify-items-center",
                    "group"
                )}
            >
                {colors?.map((color, i) => {
                    return (
                        <div key={i} className={cn("col-span-1")}>
                            <Color
                                color={color}
                                onChange={(color) => {
                                    editColor(color, i);
                                }}
                                onDelete={() => {
                                    deleteColor(i);
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <button
                className={cn(
                    "sticky",
                    "bottom-0",
                    "p-4",
                    "bg-black",
                    "hover:bg-gray-800",
                    "text-white",
                    "text-lg",
                    "font-mono",
                    "font-bold",
                    "z-10"
                )}
                onClick={() => {
                    pushColor({
                        value: "#000000",
                        title: "click to edit name",
                    });
                }}
            >
                Add color
            </button>
        </div>
    );
}
