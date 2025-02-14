import { Tooltip, Button, ButtonProps } from "@/components";
import { useToolsContext } from "@/context";
import { cn } from "@/lib";
import { Magnet as MagnetIcon } from "lucide-react";

type MagnetProps = ButtonProps;

export function Magnet({ className, ...props }: MagnetProps) {
    const {
        state: { magnet },
        toggleMagnet,
    } = useToolsContext();

    const label = magnet.active ? "disable forces" : "apply forces";

    return (
        <Tooltip
            placement="bottom"
            offset={8}
            className={cn("fill-gray-700")}
            trigger={
                <Button
                    aria-label={label}
                    className={(values) =>
                        cn(
                            "p-2",
                            typeof className === "string"
                                ? className
                                : className?.(values)
                        )
                    }
                    onPress={toggleMagnet}
                    variant={"none"}
                    {...props}
                >
                    <MagnetIcon size={18} />
                </Button>
            }
        >
            {label}
        </Tooltip>
    );
}
