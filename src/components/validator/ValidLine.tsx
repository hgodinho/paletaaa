import { cn } from "@/lib";
import { ValidLineProps } from "./types";
import { Check, X } from "lucide-react";
import { usePaletteContext } from "@/context";

export function ValidLine({
    name,
    compliance,
    color,
    background,
}: ValidLineProps) {
    let { backgroundContrast } = usePaletteContext();

    return (
        <div
            className={cn(
                "flex",
                "flex-col",
                "items-center",
                "justify-center",
                `text-${backgroundContrast}`
            )}
        >
            <p
                className={cn(
                    "font-bold",
                    "font-mono",
                    "border-b",
                    `border-${backgroundContrast}`,
                    "w-full",
                    "mb-1"
                )}
            >
                {name}
            </p>
            {Object.entries(compliance).map(([item, prop]) => {
                return (
                    <div
                        key={item}
                        className={cn(
                            "flex",
                            "flex-row",
                            "items-center",
                            "justify-between",
                            "w-full"
                        )}
                    >
                        <p
                            className={cn("w-full", "pl-2")}
                            style={{
                                color: color?.value,
                                backgroundColor: background?.value,
                            }}
                        >
                            {item}
                        </p>
                        <div
                            className={cn(
                                "w-6",
                                "h-6",
                                "p-1",
                                prop.valid
                                    ? ["bg-green-500"].join(" ")
                                    : ["bg-red-700", "text-white"].join(" ")
                            )}
                        >
                            {prop.valid ? <Check size={16} /> : <X size={16} />}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
