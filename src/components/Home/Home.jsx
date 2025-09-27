import Banner from "../Banner/Banner.jsx";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Rental Car - Find your perfect rental car</title>
        <meta
          name="description"
          content={`Reliable and budget-friendly rentals for any journey`}
        />
      </Helmet>
      <Banner />
    </>
  );
}
