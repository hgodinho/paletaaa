import { ValidatorProps } from "./types";

import { ValidLine } from "./ValidLine";

export function Validator({ valid, color, background }: ValidatorProps) {
    return Object.entries(valid).map(([key, value]) => {
        return (
            <ValidLine
                key={key}
                name={key}
                compliance={value}
                color={color}
                background={background}
            />
        );
    });
}
