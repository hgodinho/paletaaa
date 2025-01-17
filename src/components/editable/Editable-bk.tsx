import { cn } from "@/lib";
import {
    ChangeEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import { Button } from "../button";
import { Check, Edit2 } from "lucide-react";
import { usePaletteContext } from "@/context";
import { EditableProvider } from "./Provider";
import { EditableContextProps } from "./Context";
import { EditButton } from "./EditButton";


export function Editable<
    ViewComponent extends HTMLElement,
    EditComponent extends HTMLInputElement | HTMLTextAreaElement
>({
    defaultValue,
    sharedClassName,
    viewComponent,
    editComponent,
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

    useEffect(() => {
        if (edit) {
            editRef.current?.focus();
        }
    }, [edit]);

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [editableRef]);

    return (
        <EditableProvider
            editComponent={editComponent}
            viewComponent={viewComponent}
        // editComponent={function (
        //     props: Omit<
        //         HTMLAttributes<HTMLElement>,
        //         "value" | "className" | "onChange" | "size"
        //     > & {
        //         className?: ClassNameValue;
        //         value?: any;
        //         "data-state"?: boolean;
        //         onClick?: () => void;
        //         onBlur?: () => void;
        //         onChange?:
        //         | ((e: ChangeEvent<HTMLElement>) => void)
        //         | undefined;
        //     } & { ref?: Ref<HTMLElement> | undefined }
        // ): ReactElement {
        //     throw new Error("Function not implemented.");
        // }}
        // viewComponent={function (
        //     props: RenderProps<HTMLElement>
        // ): ReactElement {
        //     throw new Error("Function not implemented.");
        // }}
        >
            <EditButton />
            {/* <Button
                variant={"square"}
                onClick={() => toggle()}
                className={cn(
                    "invisible",
                    "transition",
                    "group-hover:visible",
                    "duration-300",
                    "h-fit",
                    "data-[state=true]:visible"
                )}
                data-state={edit}
                style={{
                    borderColor: contrastColor(
                        getNode("background")?.color.data.toString("hex"),
                        "#FFF"
                    ),
                    ...sharedStyles,
                }}
            >
                {edit ? <Check size={16} /> : <Edit2 size={16} />}
            </Button> */}
            {edit
                ? editComponent({
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
                : viewComponent({
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
                })}
        </EditableProvider>
    );
}
