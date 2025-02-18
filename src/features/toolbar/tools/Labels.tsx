import { Button, ButtonProps, ButtonGroupItem } from "@/components";
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
        <ButtonGroupItem
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
        </ButtonGroupItem>
    );
}
