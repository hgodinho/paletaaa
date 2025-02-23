import {
    Button,
    ButtonGroup,
    ButtonGroupItem,
    ColorSwatch,
} from "@/components";
import { useNodeOptionsContext } from "@/context";
import { cn } from "@/lib";
import { ArrowDownToDot, ArrowUpFromDot, CircleX, Copy, X } from "lucide-react";

export function NodeOption() {
    const {
        connection,
        selected,
        floatingStyles,
        node,
        floatingRef,
        floatingProps,
        removeNode,
        duplicateNode,
        setConnection,
        resetConnection,
    } = useNodeOptionsContext();

    return (
        selected && (
            <div
                ref={floatingRef}
                style={floatingStyles}
                {...floatingProps()}
                className={cn(
                    "flex",
                    "flex-col",
                    "bg-white",
                    "border-black",
                    "border",
                    "shadow-md"
                )}
            >
                <span
                    className={cn(
                        "flex",
                        "items-center",
                        "gap-2",
                        "p-1",
                        "text-sm",
                        "border-b",
                        "border-gray-800",
                        "text-ellipsis",
                        "overflow-hidden",
                        "max-w-xs"
                    )}
                >
                    <ColorSwatch color={node?.color.data} />
                    {node?.color.data.toString("hex")}
                </span>
                <ButtonGroup>
                    <ButtonGroupItem
                        trigger={
                            <Button
                                variant={"trigger"}
                                onPress={() => removeNode(selected)}
                                className={cn(
                                    "border-0",
                                    "group-hover:text-red-500",
                                    "hover:bg-red-200",
                                    "hover:text-red-900"
                                )}
                                aria-label="remove color"
                            >
                                <X size={16} />
                            </Button>
                        }
                    >
                        {"remove"}
                    </ButtonGroupItem>
                    <ButtonGroupItem
                        trigger={
                            <Button
                                variant={"trigger"}
                                onPress={() => duplicateNode(selected)}
                                className={cn("border-0")}
                                aria-label="duplicate color"
                            >
                                <Copy size={16} />
                            </Button>
                        }
                    >
                        {"duplicate"}
                    </ButtonGroupItem>
                    <ButtonGroupItem
                        trigger={
                            connection?.source === selected ? (
                                <Button
                                    variant={"trigger"}
                                    onPress={resetConnection}
                                    className={cn("border-0")}
                                    aria-label="cancel source"
                                >
                                    <CircleX size={16} />
                                </Button>
                            ) : typeof connection?.source === "string" ? (
                                <Button
                                    variant={"trigger"}
                                    onPress={() => setConnection(selected)}
                                    className={cn("border-0")}
                                    aria-label="set target"
                                >
                                    <ArrowDownToDot size={16} />
                                </Button>
                            ) : (
                                <Button
                                    variant={"trigger"}
                                    onPress={() => setConnection(selected)}
                                    className={cn("border-0")}
                                    aria-label="set source"
                                >
                                    <ArrowUpFromDot size={16} />
                                </Button>
                            )
                        }
                    >
                        {connection?.source === selected
                            ? "cancel source"
                            : connection?.target === selected
                            ? "cancel target"
                            : typeof connection?.source === "string"
                            ? "set target"
                            : "set source"}
                    </ButtonGroupItem>
                </ButtonGroup>
            </div>
        )
    );
}
