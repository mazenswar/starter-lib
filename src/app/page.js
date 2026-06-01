import Image from "next/image";
import styles from "./page.module.css";
import Hero from "./components/sections/hero/Hero";
import CardGrid from "./components/sections/cardGrid/CardGrid";
import TwoColumn from "./components/sections/twoColumn/TwoColumn";
import Steps from "./components/sections/steps/Steps";
import BookingCTA from "./components/sections/bookingCTA/BookingCTA";

export default function Home() {
	return (
		<main id="main-content" className="home__page">
			<Hero />
			<CardGrid />
			<TwoColumn />
			<Steps />
			<BookingCTA />
		</main>
	);
}
