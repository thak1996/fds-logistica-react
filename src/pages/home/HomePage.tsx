import SEO from '../../components/SEO';

export default function HomePage() {
    return (
        <>
            <SEO
                title="Início"
                description="FDS Logística: especialista em mudanças residenciais e comerciais, transporte de equipamentos sensíveis, armazenagem e terceirização de mão de obra."
            />

            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold">Bem-vindo à FDS Logística</h1>
                <p>Conteúdo da página inicial...</p>
            </div>
        </>
    );
}