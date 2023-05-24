import { ErrorStyled } from "./style";

export function ErrorForm({text}) {


    return (
        <ErrorStyled>
            {text}
        </ErrorStyled>
    );
}