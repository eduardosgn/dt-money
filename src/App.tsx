import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GLobalStyle } from "./styles/global";

import Transactions from "./pages/Transactions";
import { TransactionsProvider } from "./contexts/TransactionsContext";

export function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GLobalStyle />

            <TransactionsProvider>
                <Transactions />
            </TransactionsProvider>
        </ThemeProvider>
    );
};
