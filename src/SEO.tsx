import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogDescription?: string;
}

const SEO = ({ title, description, keywords, ogDescription }: SEOProps) => {
  return (
    <Helmet>
      {title && <title>{title} | リスクんの防災ブログ</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
    </Helmet>
  );
};

export default SEO;
