import { cn } from "@/lib";
import { Button } from "../button";
import {
    ArrowLeftRight,
    ArrowRight,
    Check,
    CheckCheck,
    Eye,
    EyeOff,
    Plus,
    X,
} from "lucide-react";
import { Select } from "../select";
import { usePaletteContext } from "@/context";
import { useState } from "react";
import { ColorSwatch } from "../picker";

export type LinksProps = {
    current: string;
};

export function AddLink({ current }: LinksProps) {
    const [open, setOpen] = useState(false);

    const [isDirected, setDirected] = useState(true);

    const [to, setTo] = useState<string>("");

    const {
        getNodes,
        haveEdges,
        addDirEdge,
        addEdge,
    } = usePaletteContext();

    const addLink = () => {
        if (!current || !to || current === to) return;

        if (isDirected) {
            addDirEdge({ source: current, target: to });
        } else {
            addEdge({ source: current, target: to });
        }
        setTo("");
    };

    return (
        haveEdges() && (
            <div className={cn("flex", "flex-col", "gap-2")}>
                <Button
                    aria-controls={`add-link-${current}`}
                    variant={"square"}
                    className={cn(
                        "p-0",
                        "text-sm",
                        "border",
                        "flex",
                        "flex-row",
                        "items-center",
                        "justify-center",
                        "gap-2"
                    )}
                    onClick={() => setOpen(!open)}
                >
                    {`${open ? "hide" : "show"} new link input`}
                    {open ? <Eye size={16} /> : <EyeOff size={16} />}
                </Button>
                <div
                    id={`add-link-${current}`}
                    className={cn(
                        "flex",
                        "flex-row",
                        "gap-4",
                        "w-full",
                        !open && "hidden"
                    )}
                >
                    <div className={cn("flex", "flex-row", "w-full", "gap-2")}>
                        <Button
                            variant="square"
                            title={"link direction"}
                            onClick={() => setDirected(!isDirected)}
                        >
                            {isDirected ? (
                                <ArrowRight size={16} />
                            ) : (
                                <ArrowLeftRight size={16} />
                            )}
                        </Button>
                        <Select
                            options={getNodes()
                                .map((node) => ({
                                    value: node.id,
                                    label: node.color.title,
                                    color: node.color.data.toString("hex"),
                                }))
                                .filter((node) => node.value !== current)}
                            placeholder="Select color"
                            className={cn("w-full")}
                            onChange={setTo}
                            value={to}
                        />
                        <Button
                            title="add link"
                            variant={"square"}
                            disabled={!to}
                            onClick={addLink}
                        >
                            <Plus size={16} />
                        </Button>
                    </div>
                </div>
            </div>
        )
    );
}

export function Links({ current }: LinksProps) {
    const {
        getNode,
        getNodeEdges,
        removeEdge,
        removeDirEdge,
        isDirEdge,
        validator,
    } = usePaletteContext();

    const onRemove = (id: string) => {
        if (isDirEdge(current, id)) {
            removeEdge({ source: current, target: id });
        } else {
            removeDirEdge({ source: current, target: id });
        }
    };

    const icon = (
        first?: boolean | undefined,
        second?: boolean | undefined
    ) => {
        if (first && second) {
            return <CheckCheck size={16} />;
        } else if (first || second) {
            return <Check size={16} />;
        } else {
            return <X size={16} />;
        }
    };

    return (
        <div className={cn("flex", "flex-col", "gap-4")}>
            {getNodeEdges(current).map(({ source, target }) => {
                return (
                    <div
                        key={`${source}-${target}`}
                        className={cn(
                            "flex",
                            "flex-row",
                            "gap-2",
                            "items-center",
                            "justify-between",
                            "group"
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
                            <ColorSwatch
                                size={"small"}
                                color={getNode(source)?.color.data}
                            />
                            {isDirEdge(current, target) ? (
                                <ArrowLeftRight size={16} />
                            ) : (
                                <ArrowRight size={16} />
                            )}
                            <ColorSwatch
                                size={"small"}
                                color={getNode(target)?.color.data}
                            />
                            {getNode(target)?.color.title || target}
                        </div>
                        <div
                            className={cn(
                                "flex",
                                "flex-row",
                                "gap-2",
                                "items-center"
                            )}
                        >
                            <div
                                className={cn(
                                    "validator",
                                    "flex",
                                    "flex-row",
                                    "gap-2",
                                    "items-center",
                                    "border-r",
                                    "pr-2"
                                )}
                            >
                                <div
                                    className={cn(
                                        "aa",
                                        "flex",
                                        "flex-row",
                                        "gap-2",
                                        "items-center"
                                    )}
                                >
                                    <span>aa</span>
                                    {icon(
                                        validator?.isLevelAA(
                                            getNode(
                                                current
                                            )?.color.data.toString("hex"),
                                            getNode(
                                                target
                                            )?.color.data.toString("hex"),
                                            24
                                        ),
                                        validator?.isLevelAA(
                                            getNode(
                                                current
                                            )?.color.data.toString("hex"),
                                            getNode(
                                                target
                                            )?.color.data.toString("hex"),
                                            18
                                        )
                                    )}
                                </div>
                                <div
                                    className={cn(
                                        "aaa",
                                        "flex",
                                        "flex-row",
                                        "gap-2",
                                        "items-center"
                                    )}
                                >
                                    <span>aaa</span>
                                    {icon(
                                        validator?.isLevelAAA(
                                            getNode(
                                                current
                                            )?.color.data.toString("hex"),
                                            getNode(
                                                target
                                            )?.color.data.toString("hex"),
                                            24
                                        ),
                                        validator?.isLevelAAA(
                                            getNode(
                                                current
                                            )?.color.data.toString("hex"),
                                            getNode(
                                                target
                                            )?.color.data.toString("hex"),
                                            18
                                        )
                                    )}
                                </div>
                            </div>
                            <Button
                                variant={"none"}
                                className={cn(
                                    "invisible",
                                    "transition",
                                    "duration-300",
                                    "group-hover:visible",
                                    "border",
                                    "border-red-300",
                                    "text-red-300",
                                    "hover:text-red-500",
                                    "hover:border-red-500"
                                )}
                                onClick={() => onRemove(target)}
                            >
                                <X size={16} />
                            </Button>
                        </div>
                    </div>
                );
            })}
            <AddLink current={current} />
        </div>
    );
}
