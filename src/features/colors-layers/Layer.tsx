import {
    Button,
    ButtonGroup,
    ButtonGroupItem,
    ColorSwatch,
    Input,
    Label,
    Links,
    Picker,
} from "@/components";
import { cn } from "@/lib";
import { ChevronDown, Copy, X } from "lucide-react";
import { useColorsLayersContext } from "./Context";
import { usePaletteContext } from "@/context";
import { LayerProps } from "./types";

export function Layer({ vertex }: LayerProps) {
    const { isExpanded, setExpanded, removeItem, duplicateItem } =
        useColorsLayersContext();

    const { colorSpace, updateColorName, updateColorData } =
        usePaletteContext();

    const isLayerExpanded = isExpanded(vertex.id);

    const title = vertex.color.title || vertex.color.data.toString("hex");

    return (
        <div
            className={cn(
                "group",
                "border",
                "flex",
                "flex-col",
                "justify-center",
                "border-gray-800",
                "border-t-0",
                "first:border-t",
                "first:rounded-t-sm",
                "last:rounded-b-sm",
                "snap-start"
            )}
        >
            <h3
                className={cn(
                    "text-lg",
                    "flex",
                    "items-center",
                    "gap-2",
                    "w-full",
                    "justify-between",
                    "p-2",
                    "border-gray-800",
                    "border-dashed",
                    isLayerExpanded && "border-b"
                )}
            >
                <div className={cn("flex", "gap-2", "items-center")}>
                    <ColorSwatch size="large" color={vertex.color.data} />
                    {title}
                </div>
                <ButtonGroup
                    className={cn(
                        "flex",
                        "border",
                        "items-center",
                        "border-gray-800",
                        "justify-end",
                        "opacity-0",
                        "group-hover:opacity-100",
                        "focus-within:opacity-100",
                        "duration-300",
                        "transition"
                    )}
                >
                    <ButtonGroupItem
                        trigger={
                            <Button
                                variant={"trigger"}
                                aria-label={`remove ${title}`}
                                onPress={() => removeItem(vertex.id)}
                                className={cn(
                                    "border-0",
                                    "group-hover:text-red-500",
                                    "hover:bg-red-200",
                                    "hover:text-red-900"
                                )}
                            >
                                <X size={16} />
                            </Button>
                        }
                    >{`remove ${title}`}</ButtonGroupItem>
                    <ButtonGroupItem
                        trigger={
                            <Button
                                variant={"trigger"}
                                aria-label={`duplicate ${title}`}
                                onPress={() => {
                                    duplicateItem(vertex.id);
                                }}
                                className={cn(
                                    "border-0",
                                    // "border-x",
                                    "hover:bg-gray-200"
                                )}
                            >
                                <Copy size={16} />
                            </Button>
                        }
                    >{`duplicate ${title}`}</ButtonGroupItem>
                    <ButtonGroupItem
                        trigger={
                            <Button
                                variant={"trigger"}
                                aria-expanded={isLayerExpanded}
                                aria-controls={vertex.id}
                                aria-label={
                                    !isLayerExpanded ? "expand" : "collapse"
                                }
                                id={`trigger-item-${vertex.id}`}
                                onPress={() => {
                                    setExpanded(vertex.id);
                                }}
                                className={cn("border-0", "hover:bg-gray-200")}
                            >
                                <ChevronDown
                                    className={cn(
                                        "transform",
                                        "duration-300",
                                        !isLayerExpanded && "-rotate-90"
                                    )}
                                    size={16}
                                />
                            </Button>
                        }
                    >
                        {!isLayerExpanded
                            ? `expand ${title}`
                            : `collapse ${title}`}
                    </ButtonGroupItem>
                </ButtonGroup>
            </h3>
            <div
                id={vertex.id}
                role="region"
                aria-labelledby={`trigger-item-${vertex.id}`}
                className={cn(
                    "accordion",
                    "overflow-auto",
                    "p-2",
                    "flex",
                    "flex-col",
                    "gap-4",
                    "w-full",
                    "justify-between",
                    "items-start",
                    !isLayerExpanded && "hidden"
                )}
            >
                <Label title={"color name"} className="w-full">
                    <Input
                        size="small"
                        placeholder="Name"
                        value={vertex.color.title || ""}
                        onChange={(e) => {
                            updateColorName(vertex.id, e.target.value);
                        }}
                    />
                </Label>
                <Picker
                    title="color"
                    colorSpace={colorSpace}
                    color={vertex.color.data}
                    onChange={(newColor) => {
                        updateColorData(vertex.id, {
                            id: vertex.id,
                            data: newColor,
                        });
                    }}
                />
                <Label title={"links"}></Label>
                <Links current={vertex.id} />
            </div>
        </div>
    );
}
