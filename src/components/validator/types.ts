import { Color } from "react-aria-components";
import { Valid, WCAGCompliance } from "../picker/types";

export type ValidLineProps = {
    name: string;
    compliance: WCAGCompliance;
    color: Color;
    background: Color;
};

export type ValidatorProps = {
    valid: Valid;
    color: Color;
    background: Color;
};
