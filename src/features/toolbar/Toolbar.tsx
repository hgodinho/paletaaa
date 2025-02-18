import { ButtonGroup } from "@/components";
import { cn } from "@/lib";
import { ToolbarProps } from "./types";
import { useAppContext, usePaletteContext, useToolsContext } from "@/context";
import { Tools } from "./tools";

export function Toolbar({ className }: ToolbarProps) {
    const { contrastColor, getBackgroundHex } = usePaletteContext();

    const { state, visible } = useToolsContext();

    const buttonClass = (key: keyof typeof state | "background") => {
        const bgHex = getBackgroundHex();
        const contrastBg = contrastColor("#FFF", bgHex);
        const contrast = contrastBg === "white" ? "black" : "white";

        if (key === "background") {
            return [
                `bg-${bgHex}`,
                `text-${contrastBg}`,
                contrast === "black"
                    ? `hover:bg-gray-700`
                    : "hover:bg-gray-300",
                `hover:text-${bgHex}`,
            ];
        }

        if (!state[key].active) {
            return [
                `bg-${bgHex}`,
                `text-${contrastBg}`,
                contrast === "black"
                    ? [`hover:bg-gray-700`, `hover:text-white`]
                    : ["hover:bg-gray-300", "hover:text-black"],
            ];
        }

        return [
            `bg-${contrastBg}`,
            `text-${contrast}`,
            contrast === "black"
                ? [`hover:bg-gray-700`, `hover:text-white`]
                : ["hover:bg-gray-300", "hover:text-black"],
        ];
    };

    const { sidebar } = useAppContext();

    return (
        <ButtonGroup
            // variant={"rounded"}
            className={cn(
                "absolute",
                "z-10",
                "left-1/2",
                "-ml-12",

                visible
                    ? "opacity-100"
                    : [sidebar ? "opacity-0" : "opacity-100", "lg:opacity-0"],

                className
            )}
            style={{
                borderColor: contrastColor(getBackgroundHex(), "#FFF"),
                color: contrastColor(getBackgroundHex(), "#FFF"),
            }}
        >
            <Tools.Background className={cn(buttonClass("background"))} />
            <Tools.Labels className={cn(buttonClass("labels"))} />
            <Tools.Magnet className={cn(buttonClass("magnet"))} />
        </ButtonGroup>
    );
}
