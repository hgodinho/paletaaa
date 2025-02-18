import { Button, ButtonGroupItem } from "@/components";
import { cn } from "@/lib";
import { Scan } from "lucide-react";
import { useButtonGroupContext } from "@/components/button-group/Context";
import { useZoomContext } from "./Context";

export function ZoomToFit() {
    const { dir } = useButtonGroupContext();

    const { zoomToFit, contrast } = useZoomContext();

    return (
        <ButtonGroupItem
            placement={dir === "col" ? "right" : "bottom"}
            offset={dir === "col" ? 10 : 9}
            trigger={
                <Button
                    aria-label="Zoom to Fit"
                    variant="none"
                    className={cn(
                        "p-2",
                        contrast === "black"
                            ? ["hover:bg-gray-500"]
                            : ["hover:bg-gray-300"]
                    )}
                    onPress={() => zoomToFit()}
                    style={{ color: contrast === "black" ? "#FFF" : "#000" }}
                >
                    <Scan size={18} />
                </Button>
            }
        >
            {"zoom to fit"}
        </ButtonGroupItem>
    );
}
