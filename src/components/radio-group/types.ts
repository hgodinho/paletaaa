export type RadioGroupItemProps = React.HTMLAttributes<HTMLLIElement>;

export type RadioGroupProps<T = unknown> =
    React.HTMLAttributes<HTMLUListElement> & {
        items: (RadioGroupItemProps & { data: T })[];
        Item: (props: RadioGroupItemProps & { data: T }) => React.ReactElement;

        defaultChecked?: string;
        checked?: string;
        onCheck?: (id: string) => void;
    };
