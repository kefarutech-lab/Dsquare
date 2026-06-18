import { Helmet } from "react-helmet-async";

const SITE_NAME = "DSquare Designs";
const SITE_URL  = "https://dsquaredesigns.in";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = DEFAULT_IMAGE,
  schema,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Premium Interior Design Studio, Pune`;

  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description"        content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical"           href={url} />

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={url} />
      <meta property="og:image"       content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />

      {/* Structured data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

/* ── Shared schemas ─────────────────────────────────────────────── */
export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "InteriorDesigner",
  name: "DSquare Designs",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  image: DEFAULT_IMAGE,
  description:
    "DSquare Designs is a premium interior design studio in Pune specialising in residential, commercial, and hospitality interiors.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 18.5204,
    longitude: 73.8567,
  },
  telephone: "+91-XXXXXXXXXX",
  priceRange: "₹₹₹",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/dsquaredesigns",
    "https://www.facebook.com/dsquaredesigns",
    "https://www.linkedin.com/company/dsquaredesigns",
  ],
};
