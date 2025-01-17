import { cn } from "@/lib";
import {
    ColorArea as PrimitiveColorArea,
    ColorAreaProps,
} from "react-aria-components";
import { ColorThumb } from "./ColorThumb";
import { usePickerContext } from "./Context";
import { Label } from "../label";
import { ColorField } from "./ColorField";

export function ColorArea({ className, ...props }: ColorAreaProps) {
    const { areaProps, color } = usePickerContext();

    return (
        <div className={cn("flex", "flex-col", "gap-1", "w-full")}>
            <div
                className={cn(
                    "flex",
                    "justify-between",
                    "items-center",
                    "w-full"
                )}
            >
                <ColorField
                    size={"fit"}
                    channel={
                        areaProps.yChannel || props.yChannel || "lightness"
                    }
                    className={cn("w-12")}
                />
                <Label
                    title={color.getChannelName(
                        areaProps.yChannel || props.yChannel || "lightness",
                        "en"
                    )}
                    size={"fit"}
                />
            </div>
            <PrimitiveColorArea
                className={cn("w-full", "h-48", String(className))}
                {...areaProps}
                {...props}
            >
                <ColorThumb />
            </PrimitiveColorArea>
            <div
                className={cn("flex", "justify-between", "items-center", "h-6")}
            >
                <Label
                    title={color.getChannelName(
                        areaProps.xChannel || props.xChannel || "saturation",
                        "en"
                    )}
                    size={"fit"}
                />
                <ColorField
                    size={"fit"}
                    channel={
                        areaProps.xChannel || props.xChannel || "saturation"
                    }
                    className={cn("w-12")}
                />
            </div>
        </div>
    );
}
