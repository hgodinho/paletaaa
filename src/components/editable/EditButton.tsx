import { Button } from "../button";
import { Check, Edit2 } from "lucide-react";
import { useEditableContext } from "./Context";

export function EditButton() {
    const { buttonProps, edit } = useEditableContext();
    return (
        <Button {...buttonProps}>
            {edit ? <Check size={16} /> : <Edit2 size={16} />}
        </Button>
    );
}
