import { LucideIcon } from "lucide-react";
import { Button, ButtonProps } from "../button";

type TriggerProps = Omit<ButtonProps, "onClick" | "value"> & {
    ref?: React.Ref<HTMLButtonElement>;
    controlledId: string;
    value: boolean;
    ValueTrue: LucideIcon;
    ValueFalse: LucideIcon;
    label?: {
        open: string;
        close: string;
    };
};

export function Trigger({
    controlledId,
    value,
    ValueFalse,
    ValueTrue,
    ...props
}: TriggerProps) {
    return (
        <Button variant={"trigger"} aria-controls={controlledId} {...props}>
            {value ? <ValueTrue size={16} /> : <ValueFalse size={16} />}
        </Button>
    );
}
