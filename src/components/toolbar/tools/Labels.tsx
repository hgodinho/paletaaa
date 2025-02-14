import { Tooltip, Button, ButtonProps } from "@/components";
import { useToolsContext } from "@/context";
import { cn } from "@/lib";
import { Tag } from "lucide-react";

type LabelProps = ButtonProps;

export function Labels({ className, ...props }: LabelProps) {
    const {
        state: { labels },
        toggleLabels,
    } = useToolsContext();

    const label = labels.active ? "hide labels" : "show labels";

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
                    onPress={toggleLabels}
                    variant={"none"}
                    {...props}
                >
                    <Tag size={18} />
                </Button>
            }
        >
            {label}
        </Tooltip>
    );
}
