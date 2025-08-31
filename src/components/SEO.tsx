type SEOProps = {
    title: string;
    description: string;
    image?: string;
};

export default function SEO({ title, description, image }: SEOProps) {
    const siteName = "FDS Logística e Terceirização";
    const baseUrl = "https://www.fdslogistica.com.br";
    const defaultImage = `${baseUrl}/images/fds-logo-og.png`;
    const finalImage = image ? `${baseUrl}${image}` : defaultImage;
    const fullTitle = `${title} | ${siteName}`;
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';

    return (
        <>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={baseUrl + path} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:url" content={baseUrl + path} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={finalImage} />
        </>
    );
}