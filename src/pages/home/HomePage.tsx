import SEO from '../../components/SEO';
import styles from './HomePage.module.css';
import Button from '../../components/Button';

export default function HomePage() {
    return (
        <>
            <SEO
                title="Início"
                description="FDS Logística: especialista em mudanças residenciais e comerciais, transporte de equipamentos sensíveis, armazenagem e terceirização de mão de obra."
            />

            {/* Seção Hero */}
            <section className={styles.heroSection}>
                <div className={styles.heroGrid}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            A sua melhor opção em mudanças e transportes
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Mudanças residenciais, comerciais, transporte de equipamentos sensíveis e armazenagem com qualidade e segurança.
                        </p>
                        <Button to="/quote">Solicite um orçamento</Button>
                    </div>
                    <div className={styles.heroImageContainer}>
                        <img
                            src="https://i.imgur.com/Yeuto4V.jpeg" // Caminho para a imagem na pasta 'public'
                            alt="Caminhão de mudanças da FDS Logística"
                            className={styles.heroImage}
                        />
                    </div>
                </div>
            </section>

            {/* Seção Banner */}
            <section className={styles.bannerSection}>
                <p>A sua melhor opção em mudança residencial, comercial e transporte especializado.</p>
            </section>

            {/* Seção de Cards */}
            <section className={styles.cardsSection}>
                <div className={styles.cardsGrid}>

                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>EMPRESA</h2>
                        <p className={styles.cardText}>
                            A FDS trabalha no ramo de transportes especializados de mudanças comerciais, residenciais, transportes de sensíveis e de obras de artes, armazenagem e logística.
                        </p>
                        <Button to="/company" variant='primary' className={styles.cardButton}>
                            Conheça
                        </Button>
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>SERVIÇOS</h2>
                        <p className={styles.cardText}>
                            Mudanças comerciais e residenciais, transportes de sensíveis e obras de artes, desmontagem e montagem de mobiliários, remanejamentos internos, armazenagem, logística e distribuição.
                        </p>
                        <Button to="/service" className={styles.cardButton}>
                            Veja mais
                        </Button>
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>CONTATO</h2>
                        <p className={styles.cardText}>
                            Caso tenha alguma dúvida ou queira solicitar mais informações sobre nossos serviços, entre em contato conosco.
                        </p>
                        <Button to="/contact" className={styles.cardButton}>
                            Entre em contato
                        </Button>
                    </div>

                </div>
            </section>
        </>
    );
}