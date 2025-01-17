import { cn } from "@/lib";

import { LucideIcon } from "lucide-react";
import { usePaletteContext } from "@/context";
import { Button } from "../button";

type TriggerProps = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "value"
> & {
    controlledId: string;
    value: boolean;
    onClick: (value: boolean) => void;
    ValueTrue: LucideIcon;
    ValueFalse: LucideIcon;
    label?: {
        open: string;
        close: string;
    };
};

export function Trigger({
    controlledId,
    className,
    label,
    value,
    onClick,
    ValueFalse,
    ValueTrue,
    ...props
}: TriggerProps) {
    const { contrastColor, getNode } = usePaletteContext();

    return (
        <Button
            variant={"trigger"}
            className={cn(
                className
            )}
            onClick={() => onClick(!value)}
            aria-controls={controlledId}
            {...props}
            style={{
                backgroundColor: contrastColor(
                    getNode("background")?.color?.data.toString("hex"),
                    "#FFF"
                ),
                color: getNode("background")?.color?.data.toString("hex"),
            }}
        >
            {value ? <ValueTrue size={16} /> : <ValueFalse size={16} />}
        </Button>
    );
}
