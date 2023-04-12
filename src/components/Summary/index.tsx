import { SummaryContainer ,SummaryCard } from "./styles";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react';

export function Summary() {
    return (
        <SummaryContainer>
            <SummaryCard>
                <div className="cabecalho">
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00b37e" />
                </div>

                <div>
                    <strong>R$ 17.400,00</strong>
                </div>
            </SummaryCard>

            <SummaryCard>
                <div className="cabecalho">
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color="#f75a68" />
                </div>

                <div>
                    <strong>R$ 17.400,00</strong>
                </div>
            </SummaryCard>

            <SummaryCard variant="green">
                <div className="cabecalho">
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#fff" />
                </div>

                <div>
                    <strong>R$ 17.400,00</strong>
                </div>
            </SummaryCard>
        </SummaryContainer>
    )
}