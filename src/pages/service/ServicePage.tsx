import SEO from '../../components/SEO';
import styles from './ServicePage.module.css';

export default function ServicePage() {
    return (
        <div className={styles.pageWrapper}>
            <>
                <SEO title="Serviços" description="Serviços oferecidos pela FDS Logística e Terceirização." />
                <section className={styles.container}>
                    <div className={styles.card}>
                        <h1 className={styles.title}>Serviços</h1>

                        <div className={styles.list}>
                            <div className={styles.item}>
                                <h3 className={styles.itemTitle}>Mudanças Comerciais:</h3>
                                <p className={styles.text}>Todos os processos de mudanças corporativas são gerenciados em todas as suas fases por coordenadores especializados. Os processos de codificação e de identificação dos layouts e das embalagens para o transporte são totalmente inventariados e monitorados. Desta forma garantimos uma transição suave e sem transtornos às áreas e departamentos em movimento.</p>
                            </div>

                            <div className={styles.item}>
                                <h3 className={styles.itemTitle}>Mudanças Residenciais:</h3>
                                <p className={styles.text}>Realizamos mudanças locais, intermunicipais e interestaduais porta a porta para todo o território nacional. Utilizamos os melhores materiais descartáveis para acondicionar seus pertences (caixas de papelão triplex, papéis de seda, papel Kraft, papelão ondulado para as embalagens do mobiliário e mantas especiais para roupas de papelão entre outros). Desmontamos e montamos todo tipo de mobiliário. Inventariamos todos os itens da mudança dando mais segurança aos nossos clientes.</p>
                            </div>

                            <div className={styles.item}>
                                <h3 className={styles.itemTitle}>Transportes de sensíveis:</h3>
                                <p className={styles.text}>Utilizamos profissionais qualificados e treinados para o manuseio de equipamentos sensíveis embalando, removendo e transportando dentro das normativas dos nossos clientes assegurando a qualidade dos equipamentos.</p>
                            </div>

                            <div className={styles.item}>
                                <h3 className={styles.itemTitle}>Transportes de Obras de Artes:</h3>
                                <p className={styles.text}>Realizamos serviços de embalagens especiais seguindo as normas exigidas por nossos clientes e utilizamos laudos técnicos para assegurar a qualidade de nossas embalagens. Os transportes são realizados em veículos climatizados e equipados com suspensão à ar.</p>
                            </div>

                            <div className={styles.item}>
                                <h3 className={styles.itemTitle}>Desmontagem e Montagem de Mobiliários:</h3>
                                <p className={styles.text}>Mão de obra treinada e especializada que seguem as recomendações dos fabricantes.</p>
                            </div>

                            <div className={styles.item}>
                                <h3 className={styles.itemTitle}>Remanejamentos Internos:</h3>
                                <p className={styles.text}>Equipe especializada em emplastação de layout coordenadas por profissional especializado, atendendo as exigências e expectativas dos arquitetos e gerenciadores envolvidos no processo agilizando com segurança, pontualidade e organização na implantação.</p>
                            </div>

                            <div className={styles.item}>
                                <h3 className={styles.itemTitle}>Armazenagem:</h3>
                                <p className={styles.text}>Oferecemos uma nova filosofia de armazenagem, agregada às mudanças físicas ou estruturais de uma empresa. Fazemos uma análise comparativa do mobiliário existente, armazenando seu excedente em nossos depósitos, com total classificação e controle on-line pelo cliente. Possuímos sistema WMS (Warehouse Management System), para o gerenciamento de todo e qualquer item a ser armazenado emitindo relatórios gerenciais de fácil acesso ao cliente.</p>
                            </div>

                            <div className={styles.item}>
                                <h3 className={styles.itemTitle}>Logística e Distribuição:</h3>
                                <p className={styles.text}>Colocamos a disposição frotas de veículos de pequeno, médio e grande porte dotados de rastreadores via satélite, gerenciadores de risco e aplices de seguro ACF (Art. Seguro), em grandes centros e pontos de apoio para operação de aplicação e preservação.</p>
                            </div>

                            <div className={styles.item}>
                                <h3 className={styles.itemTitle}>Terceirização de Mão de Obra:</h3>
                                <p className={styles.text}>Somos uma empresa especializada no fornecimento de mão de obra em diversos segmentos, tais como limpeza, portaria, jardinagem, copa, recepção, entre outros. Nossos funcionários são especializados, sendo treinados com frequência para melhor atender nossos clientes. Uma das principais vantagens na terceirização de mão de obra é que nossos clientes conseguem focar seus esforços nas atividades fim da empresa, deixando a nosso cargo, toda mão de obra necessária para dar suporte.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </div>
    );
}
