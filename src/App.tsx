import { Main } from "@/layout";
import { AppProvider, PaletteProvider, ToolsProvider } from "@/context";
import { BrowserRouter } from "react-router";

function App() {
    return (
        <BrowserRouter>
            <AppProvider>
                <PaletteProvider>
                    <ToolsProvider>
                        <Main />
                    </ToolsProvider>
                </PaletteProvider>
            </AppProvider>
        </BrowserRouter>
    );
}

export default App;
