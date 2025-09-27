import Banner from "../Banner/Banner.jsx";
const SEO_DATA = {
  title: "Rental Car - Find your perfect rental car",
  description: "Reliable and budget-friendly rentals for any journey",
};
export default function Home() {
  return (
    <>
      <title>{SEO_DATA.title}</title>
      <meta name="description" content={SEO_DATA.description} />
      <meta property="og:title" content={SEO_DATA.title} />
      <meta property="og:description" content={SEO_DATA.description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <Banner />
    </>
  );
}
