export type RadioGroupItemProps = React.HTMLAttributes<HTMLLIElement>;

export type RadioGroupProps<T = unknown> = Omit<
    React.HTMLAttributes<HTMLUListElement>,
    "onClick"
> & {
    items: (RadioGroupItemProps & { id: string; data: T })[];
    Item: (props: RadioGroupItemProps & { data: T }) => React.ReactElement;

    defaultChecked?: string;
    checked?: string;
    onCheck?: (id: string) => void;
    onClick?: (id: string) => void;
};
