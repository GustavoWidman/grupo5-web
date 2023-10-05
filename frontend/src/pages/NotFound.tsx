export const NotFoundPage = () => {
    return (
        <div className='relative flex flex-col h-screen overflow-hidden'>
            <div className="w-full p-6 m-auto rounded-md lg:max-w-xl">
                <h1 className="text-4xl font-bold text-center">404 Página não encontrada</h1>
                <p className="text-center">A página que você está procurando não existe.</p>
                <div className="flex justify-center mt-8">
                    <a href="/" className="btn">Voltar para a página inicial</a>
                </div>
            </div>
        </div>
    )
}
