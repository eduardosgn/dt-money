import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import Header from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
    PriceHighlight,
    TransactionsContainer,
    TransactionsTable,
} from "./styles";
import { dateFormatter, priceFormatter } from "../../utils/formatter";

function Transactions() {
    const { transactions } = useContext(TransactionsContext);

    return (
        <header>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />

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
                                                {priceFormatter.format(price)}
                                            </PriceHighlight>
                                        </td>
                                        <td>{category}</td>
                                        <td>
                                            {dateFormatter.format(
                                                new Date(createdAt)
                                            )}
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </header>
    );
}

export default Transactions;
