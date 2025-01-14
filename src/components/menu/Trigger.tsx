import { cn } from "@/lib";

import { Menu, X } from "lucide-react";
import { useMenuContext } from "./Context";
import { usePaletteContext } from "@/context";

type TriggerProps = React.HTMLAttributes<HTMLButtonElement> & {
    menuId: string;
    label?: {
        open: string;
        close: string;
    };
};

export function Trigger({ menuId, className, label, ...props }: TriggerProps) {
    let { open, setOpen } = useMenuContext();
    const { contrastColor, background } = usePaletteContext();

    return (
        <button
            className={cn(
                "p-4",
                "fixed",
                // "top-4",
                // "left-4",
                "rounded-full",
                "z-20",
                "duration-300",
                open ? "left-96" : "left-0",
                className
            )}
            onClick={() => setOpen(!open)}
            aria-controls={menuId}
            aria-label={"Toggle menu"}
            {...props}
            style={{
                backgroundColor: !open
                    ? contrastColor("#fff", background.data.toString("hex"))
                    : "black",
                color: !open ? background.data.toString("hex") : "white",
            }}
        >
            {open ? <X /> : <Menu />}
        </button>
    );
}
