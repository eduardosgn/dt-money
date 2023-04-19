import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import Header from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
    DeleteButton,
    NoTransactionMessage,
    PriceHighlight,
    TransactionsContainer,
    TransactionsTable,
} from "./styles";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { Trash } from "phosphor-react";

function Transactions() {
    const transactions = useContextSelector(TransactionsContext, (context) => {
        return context.transactions;
    });

    const deleteTransaction = useContextSelector(
        TransactionsContext,
        (context) => {
            return context.deleteTransaction;
        }
    );

    return (
        <header>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />

                {transactions.length === 0 ? (
                    <NoTransactionMessage>
                        <p>
                            "Não há transações listadas, adicione uma nova
                            transação clicando no botão{" "}
                            <span>Nova Transação.</span>"
                        </p>
                    </NoTransactionMessage>
                ) : (
                    <TransactionsTable>
                        <tbody>
                            {transactions.map(
                                ({
                                    id,
                                    description,
                                    type,
                                    price,
                                    category,
                                    createdAt,
                                }) => {
                                    return (
                                        <tr key={id}>
                                            <td width="50%">{description}</td>
                                            <td>
                                                <PriceHighlight variant={type}>
                                                    {type === "outcome" && "-"}
                                                    {priceFormatter.format(
                                                        price
                                                    )}
                                                </PriceHighlight>
                                            </td>
                                            <td>{category}</td>
                                            <td>
                                                {dateFormatter.format(
                                                    new Date(createdAt)
                                                )}
                                            </td>
                                            <td>
                                                <Tooltip.Provider
                                                    delayDuration={200}
                                                >
                                                    <Tooltip.Root>
                                                        <Tooltip.Trigger
                                                            asChild
                                                        >
                                                            <DeleteButton
                                                                onClick={() =>
                                                                    deleteTransaction(
                                                                        id
                                                                    )
                                                                }
                                                            >
                                                                <Trash
                                                                    size={20}
                                                                />
                                                            </DeleteButton>
                                                        </Tooltip.Trigger>
                                                        <Tooltip.Portal>
                                                            <Tooltip.Content
                                                                sideOffset={5}
                                                            >
                                                                Deletar
                                                                transação
                                                                <Tooltip.Arrow />
                                                            </Tooltip.Content>
                                                        </Tooltip.Portal>
                                                    </Tooltip.Root>
                                                </Tooltip.Provider>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </TransactionsTable>
                )}
            </TransactionsContainer>
        </header>
    );
}

export default Transactions;
