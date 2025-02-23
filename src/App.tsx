import { Main } from "@/layout";
import {
    AppProvider,
    PaletteProvider,
    ToolsProvider,
    NodeOptionsProvider,
} from "@/context";
import { BrowserRouter } from "react-router";

function App() {
    return (
        <BrowserRouter>
            <AppProvider>
                <PaletteProvider>
                    <ToolsProvider>
                        <NodeOptionsProvider>
                            <Main />
                        </NodeOptionsProvider>
                    </ToolsProvider>
                </PaletteProvider>
            </AppProvider>
        </BrowserRouter>
    );
}

export default App;
