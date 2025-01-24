import { Magnet, PaintBucket, Tag } from "lucide-react";
import { Button } from "@/components";
import { cn } from "@/lib";
import { ToolbarProps } from "./types";
import { usePaletteContext } from "@/context";

export function Toolbar({ className, tools, setTools }: ToolbarProps) {
    const { contrastColor, getBackgroundHex } = usePaletteContext();

    const buttonClass = (key: keyof typeof tools) => {
        const bgHex = tools.background ? getBackgroundHex() : "#FFF";

        const fallbackColor = tools.background
            ? contrastColor("#FFF", bgHex) === "black" ? "#000" : "#FFF"
            : "#FFF";

        if (!tools[key]) {
            return [
                `${key}-${tools[key]}`,
                `bg-[bgHex]`,
                `text-${contrastColor(fallbackColor, bgHex)}`,
                `hover:bg-${contrastColor(bgHex, "#FFF")}`,
                `hover:text-${contrastColor(fallbackColor, bgHex)}`,
            ];
        }

        return [
            `${key}-${tools[key]}`,
            `bg-${contrastColor("#FFF", bgHex)}`,
            `text-${contrastColor("#000", bgHex)}`,
            `hover:bg-${contrastColor("#000", bgHex)}`,
            `hover:text-${contrastColor("#FFF", bgHex)}`,
        ];
    };

    return (
        <div
            className={cn(
                "sticky",
                "absolute",
                "w-full",
                "flex",
                "flex-row",
                "justify-center",
                "items-center",
                "mt-4"
            )}
        >
            <div
                className={cn(
                    "border",
                    "z-10",
                    "rounded-3xl",
                    "transform",
                    "duration-700",
                    "*:p-2",
                    "*:rounded-full",

                    className
                )}
                style={{
                    borderColor: contrastColor(
                        tools.background ? getBackgroundHex() : "#FFF",
                        "#FFF"
                    ),
                    color: contrastColor(
                        tools.background ? getBackgroundHex() : "#FFF",
                        "#FFF"
                    ),
                }}
            >
                <Button
                    variant={"none"}
                    onClick={() =>
                        setTools({ ...tools, background: !tools.background })
                    }
                    className={cn(buttonClass("background"))}
                >
                    <PaintBucket size={18} />
                </Button>
                <Button
                    variant={"none"}
                    onPress={() =>
                        setTools({ ...tools, labels: !tools.labels })
                    }
                    className={cn("p-2", buttonClass("labels"))}
                >
                    <Tag size={18} />
                </Button>
                <Button
                    variant={"none"}
                    onPress={() =>
                        setTools({ ...tools, magnet: !tools.magnet })
                    }
                    className={cn(
                        "p-2",
                        "rounded-r-full",
                        buttonClass("magnet")
                    )}
                >
                    <Magnet size={18} />
                </Button>
            </div>
        </div>
    );
}
