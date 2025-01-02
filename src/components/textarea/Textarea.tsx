import { cn } from "@/lib";
import CodeEditor, {
    TextareaCodeEditorProps,
} from "@uiw/react-textarea-code-editor";

export function Textarea({ className, ...props }: TextareaCodeEditorProps) {
    return (
        <CodeEditor
            {...props}
            className={cn("bg-white", "border", "border-black", `${className}`)}
            data-color-mode="light"
            indentWidth={4}
        />
    );
}
