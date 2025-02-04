import { cn } from "@/lib";
import { ZoomProps } from "./types";
import { useOptionsContext, usePaletteContext } from "@/context";

import { Minus, Plus, Scan } from "lucide-react";
import { Button, NumberInput } from "@/components";
import { useEffect, useState } from "react";

export function Zoom({
    visible,
    zoomToFit,
    zoom,
    min,
    max,
    referenceScale,
}: ZoomProps) {
    const { contrastColor, getBackgroundHex } = usePaletteContext();

    const [currentZoom, setZoom] = useState(1);
    const [moveZoom, setMoveZoom] = useState(false);

    const bg = getBackgroundHex();
    const contrastBG = contrastColor("#FFF", bg);
    const contrast = contrastBG === "white" ? "black" : "white";

    const ratio = 0.2;

    const { sidebar } = useOptionsContext();

    const zoomPlus = () => {
        if (currentZoom >= max) return;
        setMoveZoom(true);
        setZoom((prev) => prev + ratio);
    };

    const zoomMinus = () => {
        if (currentZoom <= min) return;
        setMoveZoom(true);
        setZoom((prev) => prev - ratio);
    };

    useEffect(() => {
        if (referenceScale) {
            setZoom(referenceScale);
        }
    }, [referenceScale]);

    useEffect(() => {
        if (moveZoom) {
            zoom(currentZoom);
            setMoveZoom(false);
        }
    }, [currentZoom, moveZoom, zoom]);

    return (
        <div
            className={cn(
                "group",
                "flex",
                "flex-col",
                "items-start",
                "gap-2",
                "sticky",
                "absolute",
                "right-0",
                "bottom-0",
                "w-min",
                "mr-2",
                "mb-2",
                "lg:mr-3",
                "lg:mb-3",
                "duration-300",
                "transform",
                visible
                    ? ["opacity-100"]
                    : [sidebar ? "opacity-0" : "opacity-100", "lg:opacity-0"]
            )}
        >
            <div
                className={cn(
                    "flex",
                    "flex-col",
                    "rounded-3xl",
                    "z-10",
                    "border",

                    "items-center"
                )}
                style={{
                    borderColor: contrastColor(bg, "#FFF"),
                    color: contrastColor(bg, "#FFF"),
                }}
            >
                <Button
                    variant="none"
                    className={cn(
                        "px-2",
                        "pt-2",
                        "pb-1",
                        "rounded-t-full",

                        `bg-${bg}`,
                        `text-${contrastBG}`,
                        `hover:text-${bg}`,
                        contrast === "black"
                            ? ["hover:bg-gray-500"]
                            : ["hover:bg-gray-300"]
                    )}
                    onPress={() => zoomPlus()}
                >
                    <Plus size={18} />
                </Button>
                <Button
                    variant="none"
                    className={cn(
                        "py-1",
                        "px-2",
                        `bg-${bg}`,
                        `text-${contrastBG}`,
                        `hover:text-${bg}`,
                        contrast === "black"
                            ? ["hover:bg-gray-700"]
                            : ["hover:bg-gray-300"]
                    )}
                    onPress={() => zoomToFit()}
                >
                    <Scan size={18} />
                </Button>
                <Button
                    variant="none"
                    className={cn(
                        "pt-1",
                        "px-2",
                        "pb-2",
                        "rounded-b-full",
                        `bg-${bg}`,
                        `text-${contrastBG}`,
                        `hover:text-${bg}`,
                        contrast === "black"
                            ? ["hover:bg-gray-700"]
                            : ["hover:bg-gray-300"]
                    )}
                    onPress={() => zoomMinus()}
                >
                    <Minus size={18} />
                </Button>
            </div>
            <div
                className={cn(
                    "text-xs",
                    `bg-${bg}`,
                    `text-${contrastBG}`,
                    "inline-flex",
                    "gap-1"
                )}
            >
                <NumberInput
                    aria-label="Zoom"
                    size={"small"}
                    className={cn("w-10")}
                    step={10}
                    minValue={min * 100}
                    maxValue={max * 100}
                    value={currentZoom * 100}
                    onChange={(value) => {
                        if (isNaN(value)) return;
                        console.log({ value });
                        setMoveZoom(true);
                        setZoom(value / 100);
                    }}
                    style={{
                        backgroundColor: bg,
                        color: contrastBG,
                        borderColor: contrastColor(bg, "#FFF"),
                    }}
                />
                {"%"}
            </div>
        </div>
    );
}
