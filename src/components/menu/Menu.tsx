import { createRef, useState } from "react";
import { MenuContext } from "./Context";
import { Trigger } from "./Trigger";
import { cn } from "@/lib";
import { Picker, Input, Label, Button, Links } from "@/components";
import { Color, usePaletteContext } from "@/context";
import { ChevronDown, X } from "lucide-react";

export function MenuItems() {
    const [menu, setExpanded] = useState(new Map([["background", false]]));

    const { colorSpace, bfsAll, getNode, updateVertex, removeVertex } =
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
                    "last:rounded-b-sm"
                )}
            >
                <h3
                    className={cn(
                        "text-lg",
                        // "font-mono",
                        // "font-bold",
                        // "italic",
                        "flex",
                        "items-center",
                        "gap-2",
                        "w-full",
                        "justify-between",
                        "p-2"
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
                        <div
                            className={cn("w-8", "h-8", "rounded-full")}
                            style={{
                                backgroundColor: color.data.toString("hex"),
                            }}
                        ></div>
                        {color.title || id}
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
                            title="Delete"
                            aria-disabled={id === "background"}
                            disabled={id === "background"}
                            onClick={() => removeVertex(id)}
                            className={cn(
                                "hidden",
                                "group-hover:block",
                                // "border",
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
                            aria-expanded={menu.get(id)}
                            aria-controls={id}
                            id={`trigger-item-${id}`}
                            onClick={() => {
                                setExpanded((prev) => {
                                    return new Map([
                                        ...prev,
                                        [id, !menu.get(id)],
                                    ]);
                                });
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
                                    !menu.get(id) && "-rotate-90"
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
                        !menu.get(id) && "hidden"
                    )}
                >
                    <div className={cn("w-full", "flex", "flex-col", "gap-4")}>
                        <Label title={"color name"}>
                            <Input
                                size="small"
                                type="text"
                                placeholder="Name"
                                value={color.title || ""}
                                onChange={(e) => {
                                    updateVertex({
                                        ...vertex,
                                        color: {
                                            ...color,
                                            title: e.target.value,
                                        },
                                    });
                                }}
                                // disabled={menu.get(id)}
                            />
                        </Label>
                        <Picker
                            // disabled={menu.get(id)}
                            // title="Background"
                            variant="compact"
                            colorSpace={colorSpace}
                            color={color}
                            background={getNode("background")?.color as Color}
                            onChange={(newColor) => {
                                updateVertex({
                                    ...vertex,
                                    color: {
                                        ...color,
                                        ...newColor,
                                    },
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
    const { contrastColor, getNode } = usePaletteContext();

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
        <MenuContext.Provider value={{ open, setOpen }}>
            <div
                className={cn(
                    "z-10",
                    "flex",
                    "items-start",
                    "justify-start",
                    "bg-transparent"
                )}
                // style={{
                //     backgroundColor:
                //         getNode("background")?.color.data.toString("hex"),
                // }}
            >
                <aside
                    ref={ref}
                    id={menuId}
                    className={cn(
                        "h-screen",
                        "text-black",
                        "pt-4",
                        "pb-16",
                        "flex",
                        "flex-col",
                        "duration-300",
                        "bg-white",
                        "border-r",
                        open ? ["w-96"] : ["w-0"]
                    )}
                    aria-expanded={open}
                    aria-roledescription="menu"
                    // onKeyDown={handleKeyDown}
                    style={{
                        borderColor: contrastColor(
                            "#fff",
                            getNode("background")?.color.data.toString("hex")
                        ),
                    }}
                >
                    <div
                        className={cn(
                            "accordion",
                            "overflow-auto",
                            "px-4",
                            "h-screen",
                            "duration-300",
                            !open && "hidden"
                        )}
                    >
                        <MenuItems />
                    </div>
                </aside>
                <Trigger
                    menuId={menuId}
                    className={cn("duration-300", "ml-4", "mt-4")}
                />
            </div>
        </MenuContext.Provider>
    );
}
