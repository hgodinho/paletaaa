import { cn } from "@/lib";
import { ColorProps, ColorType } from "./types";
import { Label } from "../label";
import { Picker } from "../picker";
import { useMemo, useState } from "react";
import { Input } from "../input";
import { usePaletteContext } from "@/context";
import { Edit, Eye, X } from "lucide-react";
import { Valid } from "../picker/types";

export function Color({ color, onChange, onDelete }: ColorProps) {
    const [view, setView] = useState(false);
    const [edit, setEdit] = useState(false);

    const { background, validator } = usePaletteContext();

    const valid = useMemo<Valid | false>(() => {
        if (
            typeof background !== "undefined" &&
            typeof color !== "undefined" &&
            typeof validator !== "undefined"
        ) {
            const colorLuminance = validator?.hexToLuminance(color.value);
            const backgroundLuminance = validator?.hexToLuminance(
                background.value
            );
            return {
                AAA: {
                    "16pt": {
                        valid: validator?.isLevelAAA(
                            background.value,
                            color.value,
                            16
                        ),
                        ratio: validator?.getContrastRatio(
                            backgroundLuminance,
                            colorLuminance
                        ),
                    },
                    "22pt": {
                        valid: validator?.isLevelAAA(
                            background.value,
                            color.value,
                            22
                        ),
                        ratio: validator?.getContrastRatio(
                            backgroundLuminance,
                            colorLuminance
                        ),
                    },
                    large: {
                        valid: validator?.isLevelAAA(
                            background.value,
                            color.value,
                            24
                        ),
                        ratio: validator?.getContrastRatio(
                            backgroundLuminance,
                            colorLuminance
                        ),
                    },
                },
                AA: {
                    "16pt": {
                        valid: validator?.isLevelAA(
                            background.value,
                            color.value,
                            16
                        ),
                        ratio: validator?.getContrastRatio(
                            backgroundLuminance,
                            colorLuminance
                        ),
                    },
                    "22pt": {
                        valid: validator?.isLevelAA(
                            background.value,
                            color.value,
                            22
                        ),
                        ratio: validator?.getContrastRatio(
                            backgroundLuminance,
                            colorLuminance
                        ),
                    },
                    large: {
                        valid: validator?.isLevelAA(
                            background.value,
                            color.value,
                            24
                        ),
                        ratio: validator?.getContrastRatio(
                            backgroundLuminance,
                            colorLuminance
                        ),
                    },
                },
            };
        }
        return false;
    }, [background, color, validator]);

    return (
        <div
            className={cn("bg-white", "w-full", "border")}
            style={{
                backgroundColor: background?.value,
                borderColor: color?.value,
            }}
        >
            <div
                className={cn(
                    "flex",
                    "flex-row",
                    "justify-between",
                    "items-center",
                    "border-b"
                )}
                style={{
                    borderColor: color?.value,
                }}
            >
                <Label
                    className={cn("p-2", "font-mono", "font-bold", "w-full")}
                    onClick={() => setEdit(true)}
                    style={{
                        color: color?.value,
                    }}
                >
                    {edit ? (
                        <Input
                            type="text"
                            value={color?.title}
                            onChange={(e) =>
                                onChange?.({
                                    ...(color as ColorType),
                                    title: e.target.value,
                                })
                            }
                            onBlur={() => setEdit(false)}
                            className={cn("bg-white", "p-0", "w-full")}
                        />
                    ) : typeof color?.title !== "undefined" ? (
                        `${color?.title}`
                    ) : (
                        "Click to edit name"
                    )}
                </Label>
                <div
                    className={cn("border-l", "p-2", "flex", "flex-row")}
                    style={{ color: color?.value, borderColor: color?.value }}
                >
                    <button
                        className={cn("p-1")}
                        onClick={() => setView(!view)}
                    >
                        {view ? <Edit size={16} /> : <Eye size={16} />}
                    </button>
                    <button className={cn("p-1")} onClick={() => onDelete?.()}>
                        {<X size={16} />}
                    </button>
                </div>
            </div>

            {view && valid ? (
                <div
                    className={cn(
                        "aspect-video",
                        "h-48",
                        "w-full",
                        "grid",
                        "grid-cols-3",
                        "gap-4",
                        "p-4",
                        "items-center",
                        "justify-center"
                    )}
                    style={{
                        backgroundColor: color?.value,
                        color: validator?.isLevelAA(
                            background?.value || "#ffffff",
                            color?.value || "#000000"
                        )
                            ? "white"
                            : "black",
                    }}
                >
                    <p className={cn("flex", "items-center", "justify-center")}>
                        {color?.value}
                    </p>
                    {/* <Validator
                        valid={valid}
                        color={color as ColorType}
                        background={background as ColorType}
                    /> */}
                </div>
            ) : (
                <Picker
                    color={color}
                    background={background}
                    onChange={(value) =>
                        onChange?.({ ...color, value } as ColorType)
                    }
                    valid={valid as Valid}
                />
            )}
        </div>
    );
}
