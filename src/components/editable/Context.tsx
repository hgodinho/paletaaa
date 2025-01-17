import {
    ChangeEvent,
    createContext,
    CSSProperties,
    HTMLAttributes,
    PropsWithChildren,
    ReactElement,
    Ref,
    useContext,
} from "react";
import { ClassNameValue } from "tailwind-merge";

export type RenderProps<Element extends HTMLElement> = Omit<
    HTMLAttributes<Element>,
    "onChange" | "value" | "className" | "size"
> & {
    className?: ClassNameValue;
    value?: any;
    "data-state"?: boolean;
    onClick?: () => void;
    onBlur?: () => void;
    onChange?: (e: ChangeEvent<Element>) => void;
};

export type EditableContextProps<
    ViewComponent extends HTMLElement,
    EditComponent extends HTMLInputElement | HTMLTextAreaElement
> = PropsWithChildren<{
    sharedClassName?: ClassNameValue;
    defaultValue?: string;
    editComponent?: (
        props: RenderProps<EditComponent> & {
            ref?: Ref<EditComponent>;
        }
    ) => ReactElement;
    viewComponent?: (props: RenderProps<ViewComponent>) => ReactElement;
}>;

export type EditableContextType<EditComponent extends HTMLInputElement | HTMLTextAreaElement = any> = {
    edit: boolean;
    editRef: Ref<EditComponent>;
    buttonProps: HTMLAttributes<HTMLButtonElement>;
    sharedStyles?: CSSProperties;
    sharedClassName?: ClassNameValue;
    sharedLocalClassName?: ClassNameValue;
    setValue: (value: string) => void;
    setEdit: (edit: boolean) => void;
} & RenderProps<HTMLElement>;

export const EditableContextDefault: EditableContextType = {
    editRef: null,
    edit: false,
    buttonProps: {},
    setValue: () => { },
    setEdit: () => { },
};

export const EditableContext = createContext(EditableContextDefault);

export function useEditableContext() {
    return useContext(EditableContext);
}
