import { usePaletteContext } from "@/context";
import { EditableContext, EditableContextProps } from "./Context";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib";
import { EditableBody } from "./EditableBody";
import { EditButton } from "./EditButton";
import { EditToolbar } from "./EditToolbar";

export function Editable<
    ViewComponent extends HTMLElement,
    EditComponent extends HTMLInputElement | HTMLTextAreaElement
>({
    defaultValue,
    sharedClassName,
    editComponent,
    viewComponent,
}: EditableContextProps<ViewComponent, EditComponent>) {
    const { getNode, contrastColor } = usePaletteContext();

    const editableRef = useRef<HTMLDivElement>(null);
    const editRef = useRef<EditComponent>(null);

    const [value, setValue] = useState<any>(defaultValue);
    const [edit, setEdit] = useState(false);

    const toggle = () => {
        setEdit(!edit);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (
            editableRef.current &&
            !editableRef.current.contains(event?.target as Node)
        ) {
            setEdit(false);
        }
    };

    const sharedStyles = {
        // borderColor: contrastColor(
        //     getNode("background")?.color.data.toString("hex"),
        //     "#FFF"
        // ),
        color: contrastColor(
            getNode("background")?.color.data.toString("hex"),
            "#FFF"
        ),
    };

    const sharedLocalClassName = cn(
        "p-2",
        "w-full",
        "font-bold",
        "bg-transparent",
        "rounded-sm",
        contrastColor(
            getNode("background")?.color.data.toString("hex"),
            "#FFF"
        ) === "black"
            ? "!ring-black"
            : "!ring-white",
        contrastColor(
            getNode("background")?.color.data.toString("hex"),
            "#FFF"
        ) === "black"
            ? "hover:border-black"
            : "hover:border-white"
    );

    const buttonProps = {
        variant: "square",
        onClick: () => toggle(),
        className: cn(
            "invisible",
            "transition",
            "group-hover:visible",
            "duration-300",
            "h-fit",
            "data-[state=true]:visible"
        ),
        "data-state": edit,
        style: {
            borderColor: contrastColor(
                getNode("background")?.color.data.toString("hex"),
                "#FFF"
            ),
            ...sharedStyles,
        },
    };

    useEffect(() => {
        if (edit) {
            editRef.current?.focus();
        }
    }, [edit]);

    // useEffect(() => {
    //     document.addEventListener("mousedown", handleOutsideClick);
    //     return () => {
    //         document.removeEventListener("mousedown", handleOutsideClick);
    //     };
    // }, [editableRef]);

    return (
        <EditableContext
            value={{
                editRef,
                value,
                setValue,
                edit,
                setEdit,
                buttonProps,
                sharedLocalClassName,
                sharedStyles,
            }}
        >
            <div
                ref={editableRef}
                className={cn("flex", "flex-row", "gap-2", "group")}
            >
                <EditButton />
                <div
                    className={cn("flex", "flex-col", "gap-2", "w-full")}
                >
                    <EditableBody
                        {...{
                            viewComponent,
                            editComponent,
                            sharedClassName,
                            defaultValue,
                        }}
                    />
                    <EditToolbar />
                </div>
            </div>
        </EditableContext>
    );
}
