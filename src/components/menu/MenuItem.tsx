import { ChevronDown, X } from "lucide-react";
import { useAppContext, usePaletteContext } from "@/context";
import { cn } from "@/lib";
import { Label, Input, Links, Picker, ColorSwatch, Button } from "@/components";
import { useMenuContext } from "./Context";

export function MenuItems() {
    const { items, setExpanded, removeItem } = useMenuContext();

    const { colorSpace, updateColorName, updateColorData } =
        usePaletteContext();

    const { bfsAll } = useAppContext();

    return bfsAll((vertex) => {
        const { id, color } = vertex;
        return (
            <div
                key={id}
                className={cn(
                    "group",
                    "border",
                    "flex",
                    "flex-col",
                    "justify-center",
                    "border-gray-400",
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
                        "border-gray-400",
                        items.get(id)?.expanded && "border-b"
                    )}
                >
                    <div
                        className={cn(
                            "flex",
                            "flex-row",
                            "gap-2",
                            "items-center"
                        )}
                    >
                        <ColorSwatch size="large" color={color.data} />
                        {color.title || color.data.toString("hex")}
                    </div>
                    <div
                        className={cn(
                            "flex",
                            "flex-row",
                            "gap-2",
                            "items-center",
                            "justify-end",
                            "h-fit"
                        )}
                    >
                        <Button
                            variant={"square"}
                            aria-disabled={id === "background"}
                            aria-label={`remove ${
                                color.title || color.data.toString("hex")
                            }`}
                            isDisabled={id === "background"}
                            onPress={() => removeItem(id)}
                            className={cn(
                                "hidden",
                                "group-hover:block",
                                "text-gray-400",
                                "hover:bg-white",
                                "hover:border-red-500",
                                "hover:text-red-500"
                            )}
                        >
                            <X size={16} />
                        </Button>
                        <Button
                            variant={"square"}
                            aria-expanded={items.get(id)?.expanded}
                            aria-controls={id}
                            aria-label={
                                !items.get(id)?.expanded
                                    ? `expand ${
                                          color.title ||
                                          color.data.toString("hex")
                                      }`
                                    : `collapse ${
                                          color.title ||
                                          color.data.toString("hex")
                                      }`
                            }
                            id={`trigger-item-${id}`}
                            onPress={() => {
                                setExpanded(id);
                            }}
                            className={cn(
                                "flex",
                                "items-center",
                                "gap-2",
                                "w-full",
                                "justify-between"
                            )}
                        >
                            <ChevronDown
                                className={cn(
                                    "transform",
                                    "duration-300",
                                    !items.get(id)?.expanded && "-rotate-90"
                                )}
                                size={16}
                            />
                        </Button>
                    </div>
                </h3>
                <div
                    id={id}
                    role="region"
                    aria-labelledby={`trigger-item-${id}`}
                    className={cn(
                        "accordion",
                        "overflow-auto",
                        "p-2",
                        "flex",
                        "flex-row",
                        "gap-4",
                        "justify-between",
                        "items-start",
                        !items.get(id)?.expanded && "hidden"
                    )}
                >
                    <div className={cn("w-full", "flex", "flex-col", "gap-4")}>
                        <Label title={"color name"}>
                            <Input
                                size="small"
                                placeholder="Name"
                                value={color.title || ""}
                                onChange={(e) => {
                                    updateColorName(id, e.target.value);
                                }}
                            />
                        </Label>
                        <Picker
                            title="color"
                            colorSpace={colorSpace}
                            color={color.data}
                            onChange={(newColor) => {
                                updateColorData(id, {
                                    id,
                                    data: newColor,
                                });
                            }}
                        />
                        <Label title={"links"}></Label>
                        <Links current={vertex.id} />
                    </div>
                </div>
            </div>
        );
    });
}
