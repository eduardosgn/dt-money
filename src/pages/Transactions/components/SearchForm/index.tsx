import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { memo } from "react";

/*
Porque um componente renderiza? visualizando no react dev tool - profiler
- Hooks changed (mudou estado, contexto, reducer...)
- Props changed (mudou propriedades)
- Parent rerendered (componente pai renderizou)

Qual é o fluxo de renderização?
1. O react recria o HTML da interface daquele componente
2. Compara a versão do HTML criada com a versão anterior
3. Se mudou alguma coisa, ele reescreve o HTML na tela

Fluxo com memo:
0. Mudou os hooks do componente, ou mudou alguma coisa nas props do componente? (deep comparison)
1. Comparar com a versão anterior dos hooks e props
2. Se mudou algo, ele vai permitir a nova renderização
*/

const searchFormSchema = z.object({
    query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

function SearchFormComponent() {
    const fetchTransactions = useContextSelector(
        TransactionsContext,
        (context) => {
            return context.fetchTransactions;
        }
    );

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema),
    });

    async function handleSearchTransactions(data: SearchFormInputs) {
        await fetchTransactions(data.query);
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input
                type="text"
                placeholder="Busque por transações"
                {...register("query")}
            />
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                {isSubmitting ? "Aguarde..." : "Buscar"}
            </button>
        </SearchFormContainer>
    );
}

export const SearchForm = memo(SearchFormComponent);