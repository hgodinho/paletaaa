import { Button, ButtonProps, ButtonGroupItem } from "@/components";
import { useButtonGroupContext } from "@/components/button-group/Context";
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
    const { variant } = useButtonGroupContext();

    return (
        <ButtonGroupItem
            trigger={
                <Button
                    aria-label={label}
                    className={(values) =>
                        cn(
                            "p-2",
                            variant === "rounded" && ["last:rounded-r-full"],
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
        </ButtonGroupItem>
    );
}
