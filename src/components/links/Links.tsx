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
import { useAppContext, usePaletteContext } from "@/context";
import { useState } from "react";
import { ColorSwatch } from "../picker";

export type LinksProps = {
    current: string;
};

export function AddLink({ current }: LinksProps) {
    const [open, setOpen] = useState(false);

    const [isDirected, setDirected] = useState(true);

    const [to, setTo] = useState<string>("");

    const { onLinkAdd } = usePaletteContext();

    const { getVertices, haveEdges } = useAppContext();

    const addLink = () => {
        if (!current || !to || current === to) return;
        onLinkAdd(current, to, isDirected);
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
                    onPress={() => setOpen(!open)}
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
                            variant="trigger"
                            onPress={() => setDirected(!isDirected)}
                        >
                            {isDirected ? (
                                <ArrowRight size={16} />
                            ) : (
                                <ArrowLeftRight size={16} />
                            )}
                        </Button>
                        <Select
                            options={getVertices()
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
                            variant={"trigger"}
                            isDisabled={!to}
                            onPress={addLink}
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
    const { getVertex, getNodeEdges, isDirEdge } = useAppContext();

    const { validator, onLinkRemove } = usePaletteContext();

    const onRemove = (id: string) => {
        onLinkRemove(current, id);
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

    const colorA = getVertex(current)?.color.data;

    return (
        <div className={cn("flex", "flex-col", "gap-4")}>
            {getNodeEdges(current)?.map(({ source, target }) => {
                const colorB = getVertex(target)?.color.data;

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
                                color={getVertex(source)?.color.data}
                            />
                            {isDirEdge(current, target) ? (
                                <ArrowRight size={16} />
                            ) : (
                                <ArrowLeftRight size={16} />
                            )}
                            <ColorSwatch
                                size={"small"}
                                color={getVertex(target)?.color.data}
                            />
                            {getVertex(target)?.color.title || target}
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
                                            colorA!.toString("hex"),
                                            colorB!.toString("hex"),
                                            24
                                        ),
                                        validator?.isLevelAA(
                                            colorA!.toString("hex"),
                                            colorB!.toString("hex"),
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
                                            colorA!.toString("hex"),
                                            colorB!.toString("hex"),
                                            24
                                        ),
                                        validator?.isLevelAAA(
                                            colorA!.toString("hex"),
                                            colorB!.toString("hex"),
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
                                onPress={() => onRemove(target)}
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
