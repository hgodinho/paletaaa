import { createContext, useContext } from "react";
import { OptionsCallbacks, OptionsType } from "./types";

export const OptionsStateDefaults: OptionsType = {
    sidebar: true,
};

export const OptionsCallbacksDefaults: OptionsCallbacks = {
    setSidebar: () => {},
};

export const OptionsContext = createContext<OptionsType & OptionsCallbacks>({
    ...OptionsStateDefaults,
    ...OptionsCallbacksDefaults,
});

export function useOptionsContext() {
    return useContext(OptionsContext);
}
