import { Magnet, Tag } from "lucide-react";
import { Button, ColorComboBox, ColorSwatch } from "@/components";
import { cn } from "@/lib";
import { ToolbarProps } from "./types";
import { useOptionsContext, usePaletteContext } from "@/context";
import { ComboBoxItem } from "../combo-box/ComboBoxItem";
import { useEffect, useRef, useState } from "react";

export function Toolbar({ className, visible, tools, setTools }: ToolbarProps) {
    const { contrastColor, getBackgroundHex, getColors, setBackground } =
        usePaletteContext();

    const comboRef = useRef<HTMLDivElement>(null);

    const [isBgComboOpen, setBgComboOpen] = useState(false);

    const buttonClass = (key: keyof typeof tools | "background") => {
        const bgHex = getBackgroundHex();
        const contrastBg = contrastColor("#FFF", bgHex);
        const contrast = contrastBg === "white" ? "black" : "white";

        if (key === "background") {
            return [
                `bg-${bgHex}`,
                `text-${contrastBg}`,
                contrast === "black"
                    ? `hover:bg-gray-700`
                    : "hover:bg-gray-300",
                `hover:text-${bgHex}`,
            ];
        }

        if (!tools[key]) {
            return [
                `bg-${bgHex}`,
                `text-${contrastBg}`,
                contrast === "black"
                    ? [`hover:bg-gray-700`, `hover:text-white`]
                    : ["hover:bg-gray-300", "hover:text-black"],
            ];
        }

        return [
            `bg-${contrastBg}`,
            `text-${contrast}`,
            contrast === "black"
                ? [`hover:bg-gray-700`, `hover:text-white`]
                : ["hover:bg-gray-300", "hover:text-black"],
        ];
    };

    const { sidebar } = useOptionsContext();

    useEffect(() => {
        if (!visible && isBgComboOpen) {
            setBgComboOpen(false);
        }
    }, [visible, isBgComboOpen]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                comboRef.current &&
                !comboRef.current.contains(event.target as Node)
            ) {
                setBgComboOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [comboRef]);

    return (
        <div
            className={cn(
                "sticky",
                "absolute",
                "w-full",
                "flex",
                "flex-row",
                "justify-center",
                "items-center",
                "mt-2",
                "lg:mt-3"
            )}
        >
            <div
                className={cn(
                    "border",
                    "z-10",
                    "rounded-3xl",
                    "transform",
                    "duration-300",
                    "flex",
                    "h-fit",
                    visible
                        ? "opacity-100"
                        : [
                              sidebar ? "opacity-0" : "opacity-100",
                              "lg:opacity-0",
                          ],
                    className
                )}
                style={{
                    borderColor: contrastColor(getBackgroundHex(), "#FFF"),
                    color: contrastColor(getBackgroundHex(), "#FFF"),
                }}
            >
                <ColorComboBox
                    ref={comboRef}
                    buttonProps={{
                        className: cn(buttonClass("background")),
                        onPress: () => setBgComboOpen(!isBgComboOpen),
                    }}
                    isOpen={isBgComboOpen}
                    onSelectionChange={(id) => {
                        if (id) {
                            setBackground(id as string);
                            setBgComboOpen(false);
                        }
                    }}
                    aria-label="Background Color"
                >
                    {Array.from(getColors()).map((data) => (
                        <ComboBoxItem
                            id={data.id}
                            key={data.id}
                            textValue={data.id}
                        >
                            <ColorSwatch color={data.color.data} />
                            {data.color.title}
                            <span>{`(${data.color.data.toString(
                                "hex"
                            )})`}</span>
                        </ComboBoxItem>
                    ))}
                </ColorComboBox>
                <Button
                    variant={"none"}
                    onPress={() =>
                        setTools({ ...tools, labels: !tools.labels })
                    }
                    className={cn("p-2", buttonClass("labels"))}
                >
                    <Tag size={18} />
                </Button>
                <Button
                    variant={"none"}
                    onPress={() =>
                        setTools({ ...tools, magnet: !tools.magnet })
                    }
                    className={cn(
                        "p-2",
                        "rounded-r-full",
                        buttonClass("magnet")
                    )}
                >
                    <Magnet size={18} />
                </Button>
            </div>
        </div>
    );
}
