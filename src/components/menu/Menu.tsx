import { createRef, useState } from "react";
import { MenuContext, useMenuContext } from "./Context";
import { cn } from "@/lib";
import {
    Picker,
    Input,
    Label,
    Button,
    Links,
    ColorSwatch,
    Trigger,
    Scroll,
    Footer,
} from "@/components";
import { useGraphContext, usePaletteContext } from "@/context";
import { ChevronDown, MenuIcon, X } from "lucide-react";
import { AddButton } from "../colors/AddButton";

export function MenuItems() {
    const { items, setExpanded, bfsAll, removeItem } = useMenuContext();

    const { colorSpace, updateColorName, updateColorData } =
        usePaletteContext();

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

export function Menu() {
    const menuId = "menu";
    const ref = createRef<HTMLDivElement>();
    const [open, setOpen] = useState(true);

    const { graph, getNode, updateVertex, bfsAll, removeVertex } =
        useGraphContext();

    const setExpanded = (expandedId: string) => {
        const node = getNode(expandedId);
        if (node) {
            updateVertex({
                ...node,
                expanded: !node.expanded,
                val: node.expanded ? 1 : 1.5,
            });
        }
    };

    const removeItem = (id: string) => removeVertex(id);

    const { onColorAdd } = usePaletteContext();

    // const handleKeyDown = useCallback(
    //     (e: React.KeyboardEvent<HTMLDivElement>) => {
    //         console.log({ e });
    //         if (e.key === "Escape") {
    //             setOpen(false);
    //         }
    //     },
    //     [setOpen]
    // );

    return (
        <MenuContext
            value={{
                open,
                setOpen,
                items: graph.nodes,
                setExpanded,
                bfsAll,
                removeItem,
            }}
        >
            <div
                className={cn(
                    "z-10",
                    "flex",
                    "items-start",
                    "justify-start",
                    "bg-transparent"
                )}
            >
                <aside
                    ref={ref}
                    id={menuId}
                    className={cn(
                        "h-screen",
                        "text-black",
                        "*:mx-2",
                        "pt-2",
                        "pb-16",
                        "flex",
                        "flex-col",
                        "bg-white",
                        "gap-2",
                        "duration-300",
                        open ? ["w-96"] : ["w-0"]
                    )}
                    aria-expanded={open}
                    aria-roledescription="menu"
                    // onKeyDown={handleKeyDown}
                >
                    <AddButton
                        className={cn(!open && "hidden")}
                        onPress={onColorAdd}
                    />
                    <Scroll className={cn("accordion", !open && "hidden")}>
                        <MenuItems />
                    </Scroll>
                </aside>
                <Trigger
                    value={open}
                    onClick={setOpen}
                    controlledId={menuId}
                    aria-label={"Toggle menu"}
                    className={cn(
                        "ml-4",
                        "mt-4",
                        "hover:ml-3",
                        "hover:mt-3",
                        open ? "left-96" : "left-0"
                    )}
                    ValueTrue={X}
                    ValueFalse={MenuIcon}
                />
            </div>
            <Footer expanded={open} />
        </MenuContext>
    );
}
