import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import Header from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
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
    const { transactions, deleteTransaction } = useContext(TransactionsContext);

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
                                                <DeleteButton
                                                    onClick={() =>
                                                        deleteTransaction(id)
                                                    }
                                                >
                                                    <Trash size={20} />
                                                </DeleteButton>
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
