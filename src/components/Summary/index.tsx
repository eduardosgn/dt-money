import { SummaryContainer, SummaryCard } from "./styles";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";
import { priceFormatter } from "../../utils/formatter";
import { useSummary } from "../../hooks/useSummary";

export function Summary() {
    const summary = useSummary();

    return (
        <SummaryContainer>
            <SummaryCard>
                <div className="cabecalho">
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00b37e" />
                </div>

                <div>
                    <strong>{priceFormatter.format(summary.income)}</strong>
                </div>
            </SummaryCard>

            <SummaryCard>
                <div className="cabecalho">
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color="#f75a68" />
                </div>

                <div>
                    <strong>{priceFormatter.format(summary.outcome)}</strong>
                </div>
            </SummaryCard>

            <SummaryCard variant="green">
                <div className="cabecalho">
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#fff" />
                </div>

                <div>
                    <strong>{priceFormatter.format(summary.total)}</strong>
                </div>
            </SummaryCard>
        </SummaryContainer>
    );
}
