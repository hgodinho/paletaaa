export type OptionsType = {
    sidebar: boolean;
    viewport: {
        width: number;
        height: number;
        isMobile: boolean;
        isTablet: boolean;
        isDesktop: boolean;
    };
};

export type OptionsCallbacks = {
    setSidebar: (sidebar: boolean) => void;
};
