import { cn } from "@/lib";
import { ZoomProps } from "./types";
import { useAppContext, usePaletteContext } from "@/context";

import { ButtonGroup, NumberInput } from "@/components";
import { useEffect, useState } from "react";
import { ZoomIn } from "./ZoomIn";
import { ZoomToFit } from "./ZoomToFit";
import { ZoomOut } from "./ZoomOut";
import { ZoomContext } from "./Context";
import { Group } from "react-aria-components";

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

    const { sidebar } = useAppContext();

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
        <ZoomContext
            value={{
                visible,
                min,
                max,
                referenceScale,
                contrast,

                zoomToFit,
                zoom,
                zoomPlus,
                zoomMinus,
            }}
        >
            <Group
                className={cn(
                    "group",
                    "flex",
                    "flex-col",
                    "items-start",
                    "gap-2",
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
                        : [
                              sidebar
                                  ? ["opacity-0", "-z-10"]
                                  : ["opacity-100", "lg:opacity-0", "z-10"],
                          ]
                )}
            >
                <ButtonGroup
                    dir="col"
                    // variant={"rounded"}
                    style={{
                        borderColor: contrastColor(bg, "#FFF"),
                        color: contrastColor(bg, "#FFF"),
                    }}
                >
                    <ZoomIn />
                    <ZoomToFit />
                    <ZoomOut />
                </ButtonGroup>

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
                        className={cn("w-9")}
                        step={5}
                        minValue={min * 100}
                        maxValue={max * 100}
                        value={currentZoom * 100}
                        onChange={(value) => {
                            if (isNaN(value)) return;
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
            </Group>
        </ZoomContext>
    );
}
