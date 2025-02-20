import { cn } from "@/lib";
import { useEffect, useRef, useState } from "react";
import { RadioGroupItemProps, RadioGroupProps } from "./types";

export function RadioGroupItem({
    className,
    children,
    id,
    "aria-checked": ariaChecked,
    ...props
}: RadioGroupItemProps) {
    const ref = useRef<HTMLLIElement>(null);
    return (
        <li
            ref={ref}
            id={id}
            role="radio"
            className={cn(
                ariaChecked ? ["bg-gray-200", "font-bold"] : "",
                "first:border-t",
                "border-b",
                "border-x",
                "border-gray-800",
                "hover:bg-gray-300",
                "focus:outline-none",
                "focus:border-black",
                "focus:border-2",
                "hover:cursor-pointer",
                "p-2",
                "flex",
                "gap-2",
                "items-center",
                className
            )}
            tabIndex={ariaChecked ? 0 : -1}
            aria-checked={ariaChecked}
            {...props}
        >
            {children}
        </li>
    );
}

export function RadioGroup<T>({
    className,
    items,
    Item,
    defaultChecked,
    checked,
    onCheck,
    onClick,
    ...props
}: RadioGroupProps<T>) {
    const ref = useRef<HTMLUListElement>(null);

    const [selected, setSelected] = useState<string | undefined>(
        checked ?? defaultChecked
    );

    useEffect(() => {
        if (checked !== undefined) setSelected(checked);
    }, [checked]);

    const handleCheck = (id: string) => {
        setSelected(id);
        onCheck?.(id);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const children = Array.from(ref.current?.children ?? []);
        const index = children.findIndex(
            (node) => node === document.activeElement
        );
        let nextIndex = index;

        switch (e.key) {
            case "Up":
            case "ArrowUp":
            case "Left":
            case "ArrowLeft": {
                nextIndex = index > 0 ? index - 1 : children.length - 1;
                break;
            }

            case "Down":
            case "ArrowDown":
            case "Right":
            case "ArrowRight": {
                nextIndex = index < children.length - 1 ? index + 1 : 0;
                break;
            }

            case "Enter":
            case " ": {
                if (index !== -1) {
                    handleCheck(children[index].id);
                }
                return;
            }

            default:
                return;
        }

        const nextElement = children[nextIndex] as HTMLElement;
        if (nextElement) {
            nextElement.focus();
            handleCheck(nextElement.id);
            e.preventDefault();
        }
    };

    const handleClick = (id: string) => {
        onClick?.(id);
        handleCheck(id);
    };

    return (
        <ul
            ref={ref}
            role="radiogroup"
            className={cn("max-h-80", "h-full", "flex", "flex-col", className)}
            tabIndex={0}
            aria-activedescendant={selected}
            onKeyDown={handleKeyDown}
            {...props}
        >
            {items.map(({ data, id, ...props }) => {
                return (
                    <RadioGroupItem
                        id={id}
                        key={id}
                        aria-checked={selected === id}
                        onClick={() => handleClick(id)}
                        {...props}
                    >
                        <Item {...props} data={data} />
                    </RadioGroupItem>
                );
            })}
        </ul>
    );
}
