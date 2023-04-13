import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: number;
    description: string;
    type: "income" | "outcome";
    price: number;
    category: string;
    createdAt: string;
}

interface CreateTransactionInput {
    description: string;
    category: string;
    price: number;
    type: "income" | "outcome";
}

interface TransactionsContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransactions: (data: CreateTransactionInput) => Promise<void>;
    deleteTransaction: (id: number) => Promise<void>;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function fetchTransactions(query?: string) {
        const response = await api.get("/transactions", {
            params: {
                _sort: "createdAt",
                _order: "desc",
                q: query,
            },
        });

        setTransactions(response.data);
    }

    async function createTransactions(data: CreateTransactionInput) {
        const { description, price, category, type } = data;

        const response = await api.post("/transactions", {
            description,
            category,
            price,
            type,
            createdAt: new Date(),
        });

        setTransactions((state) => [...state, response.data]);
    }

    async function deleteTransaction(id: number) {
        await api.delete(`/transactions/${id}`);
        fetchTransactions();
    }

    // executando a requisicao somente uma vez usando o hook useEffect
    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <TransactionsContext.Provider
            value={{
                transactions,
                fetchTransactions,
                createTransactions,
                deleteTransaction,
            }}
        >
            {children}
        </TransactionsContext.Provider>
    );
}
