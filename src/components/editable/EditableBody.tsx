import { ChangeEvent } from "react";
import { EditableContextProps, useEditableContext } from "./Context";

export function EditableBody<
    ViewComponent extends HTMLElement,
    EditComponent extends HTMLInputElement | HTMLTextAreaElement
>({
    sharedClassName,
    viewComponent,
    editComponent,
}: EditableContextProps<ViewComponent, EditComponent>) {
    const {
        edit,
        editRef,
        value,
        setValue,
        sharedLocalClassName,
        sharedStyles,
        setEdit,
    } = useEditableContext();

    return edit
        ? editComponent?.({
            ref: editRef,
            value,
            onChange: (
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
                setValue(e.target.value);
            },
            onBlur: () => setEdit(false),
            className: [sharedLocalClassName, sharedClassName],
            "data-state": edit,
            style: sharedStyles,
        })
        : viewComponent?.({
            children: value,
            onClick: () => setEdit(true),
            className: [
                "border",
                "border-transparent",
                "group-hover:border-dashed",
                // "group-hover:border-gray-400",

                sharedLocalClassName,
                sharedClassName,
            ],
            "data-state": edit,
            style: sharedStyles,
        })
}