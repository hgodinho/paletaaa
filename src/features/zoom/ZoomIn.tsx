import { Button, ButtonGroupItem } from "@/components";
import { cn } from "@/lib";
import { Plus } from "lucide-react";
import { useButtonGroupContext } from "@/components/button-group/Context";
import { useZoomContext } from "./Context";

export function ZoomIn() {
    const { dir, variant } = useButtonGroupContext();

    const { zoomPlus, contrast } = useZoomContext();

    return (
        <ButtonGroupItem
            placement={dir === "col" ? "right" : "bottom"}
            offset={dir === "col" ? 10 : 9}
            trigger={
                <Button
                    aria-label="Zoom In"
                    variant="none"
                    className={cn(
                        "p-2",
                        "bg-transparent",
                        variant === "rounded" && "rounded-t-full",
                        contrast === "black"
                            ? ["hover:bg-gray-500"]
                            : ["hover:bg-gray-300"]
                    )}
                    onPress={() => zoomPlus()}
                    style={{ color: contrast === "black" ? "#FFF" : "#000" }}
                >
                    <Plus size={18} />
                </Button>
            }
        >
            {"zoom-in"}
        </ButtonGroupItem>
    );
}
