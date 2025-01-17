import { usePaletteContext } from "@/context";
import { cn } from "@/lib";
import * as Primitive from "@radix-ui/react-toolbar";
import { Bold } from "lucide-react";
import { ToolbarProps } from "./types";

export function Toolbar({ className, ...props }: ToolbarProps<Primitive.ToolbarProps>) {
    const { getNode, contrastColor } = usePaletteContext();
    return (
        <Primitive.Root
            className={cn(
                "p-2",
                "border",
                "border-gray-400",
                "w-fit",
                "bg-white",
                className
            )}
            style={{
                backgroundColor:
                    getNode("background")?.color?.data.toString("hex"),
                borderColor: contrastColor(
                    getNode("background")?.color?.data.toString("hex"),
                    "#FFF"
                ),
            }}
            {...props}
        >
            <Primitive.ToggleGroup type="multiple" aria-label="Text formatting">
                <Primitive.ToggleItem value="bold" aria-label="Bold">
                    <Bold size={16} />
                </Primitive.ToggleItem>
            </Primitive.ToggleGroup>
        </Primitive.Root>
    );
}
