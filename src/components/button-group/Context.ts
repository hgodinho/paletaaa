import { createContext, useContext } from "react";
import { ButtonGroupContextType } from "./types";

export const buttonGroupContextDefault: ButtonGroupContextType = {};

export const ButtonGroupContext = createContext(buttonGroupContextDefault);

export function useButtonGroupContext() {
    return useContext(ButtonGroupContext);
}
