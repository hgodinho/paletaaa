import {
    Button,
    ButtonGroupItem,
    ButtonProps,
    ColorSwatch,
    Popover,
    RadioGroup,
    Scroll,
} from "@/components";
import { useButtonGroupContext } from "@/components/button-group/Context";
import { usePaletteContext, useToolsContext } from "@/context";
import { cn } from "@/lib";
import { PaintBucket } from "lucide-react";
import { useEffect, useRef } from "react";

type BackgroundProps = ButtonProps;

export function Background({ className, ...props }: BackgroundProps) {
    const { variant } = useButtonGroupContext();

    const {
        state: {
            background: { active },
        },
        visible,
        toggleBackground,
    } = useToolsContext();

    const { getColors, setBackground, getBackground } = usePaletteContext();

    useEffect(() => {
        if (visible && active) {
            toggleBackground();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    const triggerRef = useRef<HTMLButtonElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case "Down":
            case "ArrowDown":
                toggleBackground();
                break;
        }
    };

    const onBGChange = (id: string) => {
        setBackground(id);
        if (id === getBackground()?.id) toggleBackground(false);
    };

    const onClick = () => {
        toggleBackground(false);
    };

    return (
        <ButtonGroupItem
            trigger={
                <Popover
                    isOpen={active}
                    onOpenChange={toggleBackground}
                    bodyProps={{
                        className: cn("bg-white", "border"),
                    }}
                    trigger={
                        <Button
                            ref={triggerRef}
                            variant={"none"}
                            className={(values) =>
                                cn(
                                    "w-full",
                                    "h-full",
                                    "p-2",
                                    variant === "rounded" && "rounded-l-full",
                                    typeof className === "string"
                                        ? className
                                        : className?.(values)
                                )
                            }
                            onKeyDown={handleKeyDown}
                            {...props}
                        >
                            <PaintBucket size={18} />
                        </Button>
                    }
                    body={
                        <Scroll>
                            <RadioGroup
                                onCheck={onBGChange}
                                aria-label="Select a background color"
                                checked={getBackground()?.id}
                                onClick={onClick}
                                items={getColors().map((node) => {
                                    return {
                                        id: node.id,
                                        checked:
                                            getBackground()?.id === node.id,
                                        data: node,
                                    };
                                })}
                                Item={({ data }) => {
                                    return (
                                        <>
                                            <ColorSwatch
                                                color={data.color.data}
                                            />
                                            {data.color.title}
                                            <span>{`(${data.color.data.toString(
                                                "hex"
                                            )})`}</span>
                                        </>
                                    );
                                }}
                            />
                        </Scroll>
                    }
                />
            }
        >
            {"background"}
        </ButtonGroupItem>
    );
}
