import SEO from '../../components/SEO';
import styles from './CompanyPage.module.css';

export default function CompanyPage() {
    return (
        <div className={styles.companyBg}>
            <>
                <SEO title="A Empresa" description="Conheça a FDS Logística e Terceirização, nossa história, missão e valores." />
                <section className={styles.companySection}>
                    <h1 className={styles.title}>A Empresa</h1>
                    <p className={styles.text}>
                        A FDS Logística e Terceirização atua há anos no ramo de mudanças residenciais, comerciais, transporte de equipamentos sensíveis, obras de arte e terceirização de mão de obra. Nossa missão é garantir qualidade, segurança e agilidade em cada serviço prestado.
                    </p>
                    <p className={styles.text}>Iniciando suas operações em 2005 a FDS Logística nasceu tendo como principais atividades mudanças residenciais e comerciais. Empresa que tem como meta a QUALIDADE TOTAL, com enorme dedicação no atendimento, informações e negociações.</p>
                    <p className={styles.text}>FDS Logística é uma empresa especializada na prestação de serviços de logística e terceirização de mão de obra, tendo como principais atividades a administração e operacionalização da armazenagem, gerenciamento do transporte e/ou distribuição de qualquer tipo de bens ou produtos, terceirização de mão de obra especializada nas áreas de conservação e limpeza, portaria, jardinagem, entre outras que possam auxiliar a operacionalização de nossos clientes.</p>
                    <p className={styles.text}>Os serviços são dimensionados e adaptados às necessidades dos nossos clientes, considerando custos, prazos, recursos, qualidade e questões estratégicas. A empresa atua em todo território nacional.</p>
                    <p className={styles.text}>Para isso tem o conhecimento e a experiência necessária para a execução e implementação de projetos de logística integrada. Reúne pessoas com experiência para prestar o melhor serviço aos nossos clientes.</p>
                    <p className={styles.text}>A FDS Logística busca interpretar as necessidades e vontades de seus clientes, dando a forma de atendimento mais apropriada às suas exigências. Com a parceria dos profissionais da FDS nossos clientes terão acesso ao que há de mais moderno, eficiente e econômico na hora em que necessitar dos serviços de uma transportadora para mudanças residenciais ou mudanças comerciais.</p>
                </section>
            </>
        </div>
    );
}
