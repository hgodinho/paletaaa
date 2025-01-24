import { cn } from "@/lib";

import { LucideIcon } from "lucide-react";
import { usePaletteContext } from "@/context";
import { Button, ButtonProps } from "../button";

type TriggerProps = Omit<ButtonProps, "onClick" | "value"> & {
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
    value,
    onClick,
    ValueFalse,
    ValueTrue,
    ...props
}: TriggerProps) {
    const { contrastColor, getBackgroundHex } = usePaletteContext();

    return (
        <Button
            variant={"trigger"}
            className={cn(String(className))}
            onPress={() => onClick(!value)}
            aria-controls={controlledId}
            {...props}
            style={{
                backgroundColor: contrastColor(getBackgroundHex(), "#FFF"),
                color: getBackgroundHex(),
            }}
        >
            {value ? <ValueTrue size={16} /> : <ValueFalse size={16} />}
        </Button>
    );
}
