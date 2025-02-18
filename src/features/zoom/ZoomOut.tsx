import { Button, ButtonGroupItem } from "@/components";
import { cn } from "@/lib";
import { Minus } from "lucide-react";
import { useButtonGroupContext } from "@/components/button-group/Context";
import { useZoomContext } from "./Context";

export function ZoomOut() {
    const { dir, variant } = useButtonGroupContext();

    const { zoomMinus, contrast } = useZoomContext();

    return (
        <ButtonGroupItem
            placement={dir === "col" ? "right" : "bottom"}
            offset={dir === "col" ? 10 : 9}
            trigger={
                <Button
                    aria-label="Zoom Out"
                    variant="none"
                    className={cn(
                        "p-2",
                        variant === "rounded" && "rounded-b-full",
                        contrast === "black"
                            ? ["hover:bg-gray-500"]
                            : ["hover:bg-gray-300"]
                    )}
                    onPress={() => zoomMinus()}
                    style={{ color: contrast === "black" ? "#FFF" : "#000" }}
                >
                    <Minus size={18} />
                </Button>
            }
        >
            {"zoom-out"}
        </ButtonGroupItem>
    );
}
