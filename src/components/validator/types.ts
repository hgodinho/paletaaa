import { ColorType } from "../colors";
import { Valid, WCAGCompliance } from "../picker/types";

export type ValidLineProps = {
    name: string;
    compliance: WCAGCompliance;
    color: ColorType;
    background: ColorType;
};

export type ValidatorProps = {
    valid: Valid;
    color: ColorType;
    background: ColorType;
};
