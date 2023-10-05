import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as { statusText?: string; message?: string };
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Desculpe, mas ocorreu um erro.</p>
            <p>Por favor entre em contato com o desenvolvedor do aplicativo para verificar o que aconteceu.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}