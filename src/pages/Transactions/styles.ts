import styled from "styled-components";

export const TransactionsContainer = styled.main`
    width: 100%;
    max-width: 1120px;
    margin: 4rem auto 0;
    padding: 0 1.5rem;
`;

export const TransactionsTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;

    td {
        padding: 1.25rem 2rem;
        background: ${(props) => props.theme["gray-700"]};
        color: ${props => props.theme.white};

        &:first-child {
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        &:last-child {
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }
    }
`;

interface PriceHighlightProps {
    variant: "income" | "outcome";
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
    color: ${(props) =>
        props.variant === "income"
            ? props.theme["green-300"]
            : props.theme["red-300"]};
`;

export const NoTransactionMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;

    p {
        font-weight: bold;
        color: ${(props) => props.theme.white};

        span {
            color: ${(props) => props.theme["green-300"]};
        }
    }
`;

export const DeleteButton = styled.button`
    display: flex;
    align-items: center;
    color: ${(props) => props.theme["red-300"]};
    border: 0;
    line-height: 0;
    background: transparent;
    cursor: pointer;
`;
